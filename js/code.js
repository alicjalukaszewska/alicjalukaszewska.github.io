
// (function (){

/* add logo item and background to menu */
const menu = document.querySelector('.fixed-menu');

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

function debounce(func, wait = 5, immediate = true) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const anchors = {
	start: document.querySelector('#start').offsetTop - 100,
	omnie: document.querySelector('#omnie').offsetTop - 100,
	technologie: document.querySelector('#technologie').offsetTop - 100,
	realizacje: document.querySelector('#realizacje').offsetTop - 100,
	kontakt: document.querySelector('#kontakt').offsetTop - 100,
}

function changeActive () {
	Object.entries( anchors ).forEach(([name, topValue]) => {
		if(window.scrollY >= topValue) {
			const menuList = menu.querySelectorAll('li');
			menuList.forEach(li => li.classList.remove('active'));
			let currentSection = menu.querySelector(`a[href='#${name}']`).parentNode;
			console.log(currentSection);
			currentSection.classList.add('active');
		} 
	})
}


window.addEventListener('scroll', debounce(changeActive));

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

function hideZoom () {
	backBtn.style.display = "none";
	zoomedContent.classList.remove('visuallyhidden');
	zoomedImage.addEventListener('click', zoomImage);
}

function zoomImage () {
	backBtn.style.display = "block";
	zoomedContent.classList.add('visuallyhidden');
	zoomedImage.removeEventListener('click', zoomImage);
	zoomedImage.addEventListener('click', hideZoom);
}

function changeContent () {
	//reset content
	zoomedContent.innerHTML = "";
	hideZoom();
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
backBtn.addEventListener('click', hideZoom);
closeBtn.addEventListener('click', () => zoom.style.display = "none");
nextBtn.addEventListener('click', () => changeProjectByArrow('right'));
prevBtn.addEventListener('click', () => changeProjectByArrow('left'));


/* Scroll to article */



// }());