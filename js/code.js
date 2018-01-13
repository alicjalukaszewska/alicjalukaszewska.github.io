// (function (){

/* change menu background on scroll */
function changeMenu() {
	const menu = document.querySelector('.fixed-menu');
	if (window.scrollY == 0){
		menu.classList.remove('scrolled');
	} else {
		menu.classList.add('scrolled');
	}
}

window.addEventListener('scroll', changeMenu);


/* show/hide zoomed project */

const images = document.querySelectorAll('.image-wrapper');
const closeBtn = document.querySelector('#close');
const zoom = document.querySelector('#zoom');
const zoomWrapper = document.querySelector('.zoomed-project');

function zoomed (e) {
	const zoomedImg = zoom.querySelector('img');
	zoomedImg.src = this.firstElementChild.src;
	zoom.style.display = "flex";
}

images.forEach(image => {
	image.addEventListener('click', zoomed);
})

closeBtn.addEventListener('click', () => zoom.style.display = "none");

// zoomWrapper.addEventListener('mouseleave', () => zoom.style.display = "none");



// }());