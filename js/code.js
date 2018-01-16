// (function (){

/* initiate smooth-scroll plugin */
const scroll = new SmoothScroll('a[href*="#"]');

/* add logo item and background to menu */
const menu = document.querySelector('.fixed-menu');
const links = menu.querySelectorAll('a');
const line = document.querySelector('.line');

function changeMenu () {
	const logo = document.querySelector('#logo');
	const welcomeTop = document.querySelector('.welcome').offsetTop;

	if (window.scrollY >= welcomeTop) {
		logo.classList.add('fixed');
		menu.classList.add('scrolled');
	} else  {
		logo.classList.remove('fixed');
		menu.classList.remove('scrolled');
	}
}

window.addEventListener('scroll', changeMenu);


function changeLine () {
	const linksCoords = this.getBoundingClientRect();
	line.style.width = `${linksCoords.width}px`;
	line.style.transform = `translate(${linksCoords.left}px, ${linksCoords.top}px)`;
	line.style.opacity = 1;
}

const anchors = {
	start: document.querySelector('#start').offsetTop - 300,
	omnie: document.querySelector('#omnie').offsetTop - 300,
	technologie: document.querySelector('#technologie').offsetTop - 300,
	realizacje: document.querySelector('#realizacje').offsetTop - 300,
	kontakt: document.querySelector('#kontakt').offsetTop + 200,
}

function changeActive () {
	Object.entries( anchors ).forEach(([name, topValue]) => {
		if(window.scrollY >= topValue) {
			let currentSection = menu.querySelector(`a[href='#${name}']`);
			changeLine.call(currentSection);
		} 
	})
}

links.forEach(link => link.addEventListener('click', changeLine));
window.addEventListener('scroll', changeActive);


/* show/hide zoomed project */

const projects = document.querySelectorAll('.project');

//zoomed elements
const zoomWindow = document.querySelector('#zoom');
const zoomedProject = document.querySelector('.zoomed-project');
const zoomedContent = document.querySelector('.zoomed-project .content');
const zoomedImage = zoomedProject.querySelector('img');

//buttons
const closeBtn = document.querySelector('#close');
const backBtn = document.querySelector('#back');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');

function hideZoomImage () {
	backBtn.style.display = "none";
	zoomedContent.classList.remove('visuallyhidden');
	zoomedImage.addEventListener('click', zoomImage);
}

function zoomImage () {
	backBtn.style.display = "block";
	zoomedContent.classList.add('visuallyhidden');
	zoomedImage.removeEventListener('click', zoomImage);
	zoomedImage.addEventListener('click', hideZoomImage);
}

function changeContent () {
	//reset content
	zoomedContent.innerHTML = "";
	hideZoomImage();
	//change image
	let image = this.querySelector('img').src;
	zoomedImage.src = image;
	let content = this.querySelector('.content').innerHTML;
	//set new content
	zoomedProject.id = this.id;
	zoomedContent.innerHTML = content;
	//show window
	zoomWindow.style.display = "flex";
}

function changeProjectByArrow (direction) {
	const portfolio = document.querySelector('.portfolio');
	const currentId = zoomedProject.id;
	const currentContent = portfolio.querySelector(`#${currentId}`);
	const firstProject = portfolio.querySelector(`#project1`);
	let nextItem;
	if (direction == 'right') {
		nextItem = currentContent.nextElementSibling;
		if (nextItem === null) {
			nextItem = firstProject;
		}
	} else {		
		if (currentContent === firstProject || nextItem === firstProject) {
			nextItem = document.querySelector(`#project${projects.length}`)
		} else {
			nextItem = currentContent.previousElementSibling;
		}
	}
	changeContent.call(nextItem);
}

projects.forEach(project => {
	project.addEventListener('click', changeContent);
})

zoomedImage.addEventListener('click', zoomImage);
backBtn.addEventListener('click', hideZoomImage);
closeBtn.addEventListener('click', () => zoom.style.display = "none");
zoomWindow.addEventListener('click', function(e) {
	if (e.target == this) {
 		zoom.style.display = "none";
	}
})
nextBtn.addEventListener('click', () => changeProjectByArrow('right'));
prevBtn.addEventListener('click', () => changeProjectByArrow('left'));

// }());