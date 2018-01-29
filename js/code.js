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

dropdownBtn.addEventListener('click', () => {
	dropdown.classList.toggle('dropped');
	if (dropdown.classList.contains('dropped')){
		dropdownBtn.setAttribute('aria-expanded', 'true');
	} else {
		dropdownBtn.setAttribute('aria-expanded', 'false');
	}
});
dropdownBtn.addEventListener('click', () => dropdownBtn.classList.toggle('open'));
links.forEach(link => link.addEventListener('click', (e) => {
		dropdown.classList.remove('dropped');
		dropdownBtn.classList.remove('open');
	})
)

}());