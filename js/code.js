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
const backBtn = document.querySelector('#back');

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

function changeContent (e) {
	console.log(e.target);
	//reset content
	zoomedContent.innerHTML = "";
	hideZoom();
	//change image
	let image = this.querySelector('img').src;
	zoomedImage.src = image;
	let content = this.querySelector('.content').innerHTML;
	//set new content
	zoomedContent.innerHTML = content;
	//show window
	zoomWindow.style.display = "flex";
	nextBtn.addEventListener('click', () => findNextProject(this));
}

zoomedImage.addEventListener('click', zoomImage);
backBtn.addEventListener('click', hideZoom);

projects.forEach(project => {
	project.addEventListener('click', changeContent);
})

closeBtn.addEventListener('click', () => zoom.style.display = "none");
// window.addEventListener('click', () => zoom.style.display = "none");

function findNextProject (e) {
	changeContent(e.nextElementSibling);
}

const nextBtn = document.querySelector('#next');

// nextBtn.addEventListener('click', nextProject);

// }());