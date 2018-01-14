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

const projects = document.querySelectorAll('.project');
const closeBtn = document.querySelector('#close');
const zoomWindow = document.querySelector('#zoom');
const zoomedProject = document.querySelector('.zoomed-project');
const zoomedContent = document.querySelector('.zoomed-project .content');
const zoomedImage = zoomedProject.querySelector('img');

function zoomImage () {
	zoomedContent.classList.toggle('visuallyhidden');
}

function changeContent (e) {
	//reset content
	zoomedContent.innerHTML = "";
	zoomedContent.classList.remove('visuallyhidden');
	//change image
	let image = this.querySelector('img').src;

	zoomedImage.src = image;
	
	let content = this.querySelector('.content').innerHTML;
	//set new content
	zoomedContent.innerHTML = content;
	//show window
	zoomWindow.style.display = "flex";
}

zoomedImage.addEventListener('click', zoomImage);

projects.forEach(project => {
	project.addEventListener('click', changeContent);
})


closeBtn.addEventListener('click', () => zoom.style.display = "none");
// window.addEventListener('click', () => zoom.style.display = "none");

// }());