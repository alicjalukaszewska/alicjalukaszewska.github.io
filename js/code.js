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

// find current section
function getPosition () {
	const anchors = ['start', 'o-mnie', 'technologie', 'realizacje', 'kontakt'];
	anchors.forEach (anchor => {
		const marginValue = 200;
		let currentElementOffset = document.querySelector(`#${anchor}`).offsetTop;
		let nextElementOffset = document.querySelector(`#${anchor}`).nextElementSibling.offsetTop;
		currentElementOffset -= marginValue;
		nextElementOffset -= marginValue;
		if (window.scrollY >= currentElementOffset && (window.scrollY < nextElementOffset)) {
			let currentSection = menu.querySelector(`a[href='#${anchor}']`);
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

function validateEmail (email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validate () {
	const alert = document.querySelector('.alert');
	let emailValue = email.value;
	if (email.value === "" || validateEmail(emailValue)) {
		alert.style.display = "none";
	} else {
		alert.style.display = "inline-block";
	}
}

const email = document.querySelector('#email');
email.addEventListener('change', validate);

}());