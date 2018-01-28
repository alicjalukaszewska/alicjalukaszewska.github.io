(function (){
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


/* add logo and background to menu on scroll*/
const menu = document.querySelector('.fixed-menu');
const links = document.querySelectorAll('.dropdown a');
const line = document.querySelector('.line');

function changeMenu () {
	const logo = document.querySelector('#logo');
	if (window.scrollY <= 50) {
		logo.style.opacity = 0;
		logo.style.display = "none";
		menu.classList.remove('scrolled');		

	} else  {
		logo.style.display = "block";
		logo.style.opacity = 1;
		menu.classList.add('scrolled');
	}
}

window.addEventListener('scroll', changeMenu);
window.addEventListener('load', changeMenu);

/* Show active section link in menu */

const anchors = {
	start: document.querySelector('#start').offsetTop - 50,
	omnie: document.querySelector('#o-mnie').offsetTop - 250,
	technologie: document.querySelector('#technologie').offsetTop - 250,
	realizacje: document.querySelector('#realizacje').offsetTop - 250,
	kontakt: document.querySelector('#kontakt').offsetTop - 250,
}

// move line above active link and change line's width 
function addLine () {
	const linksCoords = this.getBoundingClientRect();
	line.style.width = `${linksCoords.width}px`;
	line.style.transform = `translate(${linksCoords.left}px, ${linksCoords.top}px)`;
	line.style.opacity = 1;
}

//add active class to current link
function changeActive () {
	links.forEach(link => link.classList.remove('active'));
	this.classList.add('active');
	this.setAttribute('aria-current', 'page');
	if (window.innerWidth >= 920) {
		addLine.call(this);
	}	
}

//find current section
function getPosition () {
	Object.entries( anchors ).forEach(([name, topValue]) => {
		if(window.scrollY >= topValue) {
			if (name === 'omnie') name = 'o-mnie';
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
const portfolio = document.querySelector('.portfolio');
let currentId;
let currentContent;

//buttons
const closeBtn = document.querySelector('#close');
const backBtn = document.querySelector('#back');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');


function hideZoomedImage () {
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
	zoomedImage.addEventListener('click', hideZoomedImage);
}


function focusInside () {
	if (document.activeElement === nextBtn || document.activeElement === prevBtn) {
		return;
	} else {
		zoomedContent.querySelector('a').focus();
	}
}

//show clicked or called project 
function changeContent () {
	console.log(this);
	//reset content
	zoomedContent.innerHTML = "";
	hideZoomedImage();
	//change image
	let image = this.querySelector('img').src;
	zoomedImage.src = image;
	//set new content
	let content = this.querySelector('.content').innerHTML;
	zoomedProject.id = this.id;
	zoomedProject.setAttribute('aria-label', this.querySelector('.content h3').innerText)
	zoomedContent.innerHTML = content;
	//show window
	zoomWindow.style.display = "flex";
	//define variables
	currentId = zoomedProject.id;
	currentContent = portfolio.querySelector(`#${currentId}`);
	focusInside();
}

function showNextProject (direction) {
	const firstProject = portfolio.querySelector(`.project`);
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
backBtn.addEventListener('click', hideZoomedImage);
closeBtn.addEventListener('click', () => {
	zoom.style.display = "none";
	currentContent.focus();
});

//hide zoomed project by clicking outside of it
zoomWindow.addEventListener('click', function(e) {
	if (e.target == this) {
 		zoom.style.display = "none";
	}
})
nextBtn.addEventListener('click', () => showNextProject('right'));
prevBtn.addEventListener('click', () => showNextProject('left'));
document.addEventListener('keydown', (e) => {
	if (e.keyCode == '37') {
       // left arrow
       showNextProject('left');
    }
    else if (e.keyCode == '39') {
       // right arrow
       showNextProject('right');
    }
})

}());