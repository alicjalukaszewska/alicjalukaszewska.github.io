// (function (){
'use strict';


/* initiate smooth-scroll plugin */
const scroll = new SmoothScroll( 'a[href*="#"]', { 
	before: function() { 
		window.removeEventListener('scroll', getPosition);
	}, 
	after: function() { 
				window.addEventListener('scroll', getPosition);
	} 
});

/* add logo item and background to menu */
const menu = document.querySelector('.fixed-menu');
const links = document.querySelectorAll('.dropdown a');
const line = document.querySelector('.line');

function changeMenu () {
	const logo = document.querySelector('#logo');
	if (window.scrollY <= 50) {
		logo.classList.remove('fixed');
		menu.classList.remove('scrolled');		

	} else  {
		logo.classList.add('fixed');
		menu.classList.add('scrolled');
	}
}

window.addEventListener('scroll', changeMenu);
window.addEventListener('load', changeMenu);

/* move line above active link and change its width */
function addLine () {
	const linksCoords = this.getBoundingClientRect();
	line.style.width = `${linksCoords.width}px`;
	line.style.transform = `translate(${linksCoords.left}px, ${linksCoords.top}px)`;
	line.style.opacity = 1;
}


function changeActive () {
	links.forEach(link => link.classList.remove('active'));
	this.classList.add('active');
	if (window.innerWidth >= 920) {
		addLine.call(this);
	}	
}

const anchors = {
	start: document.querySelector('#start').offsetTop,
	omnie: document.querySelector('#omnie').offsetTop - 250,
	technologie: document.querySelector('#technologie').offsetTop - 250,
	realizacje: document.querySelector('#realizacje').offsetTop - 250,
	kontakt: document.querySelector('#kontakt').offsetTop - 250,
}

function getPosition () {
	Object.entries( anchors ).forEach(([name, topValue]) => {
		if(window.scrollY >= topValue) {
			let currentSection = menu.querySelector(`a[href='#${name}']`);
			changeActive.call(currentSection);
		} 
	})
}

links.forEach(link => link.addEventListener('click', changeActive));
window.addEventListener('load', getPosition);
window.addEventListener('scroll', getPosition);


/* dropdown menu */

const dropdownBtn = document.querySelector('#nav-icon');
const dropdown = document.querySelector('.dropdown');


dropdownBtn.addEventListener('click', () => dropdown.classList.toggle('dropped'));
dropdownBtn.addEventListener('click', () => dropdownBtn.classList.toggle('open'));
links.forEach(link => link.addEventListener('click', (e) => {
		dropdown.classList.remove('dropped');
		dropdownBtn.classList.remove('open');
	})
)


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
	zoomedImage.classList.remove('clicked');
	backBtn.style.display = "none";
	zoomedContent.classList.remove('visuallyhidden');
	zoomedImage.addEventListener('click', zoomImage);
}

function zoomImage () {
	zoomedImage.classList.add('clicked');
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