(function(){
'use strict';
const projects = document.querySelectorAll('.project');


function loadProject () {
	let chosenProject = this;
	var requestXhr = new XMLHttpRequest();

	requestXhr.open('GET', 'https://alicjalukaszewska.github.io/js/projects.json', true);

	requestXhr.onload = function () {
		if (this.status == 200) {
			const projectsData = JSON.parse(this.responseText);
			for (let project in projectsData) {
				if (projectsData[project].id == chosenProject.id){
					showProject(chosenProject, projectsData[project]);
				}
			}
		}
	}
	requestXhr.send();
}

/* show/hide zoomed project */

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

function showProject (chosenProject, data) {
	hideZoomedImage();
	let startDateTime = data.dates.startDateTime;
	let endDateTime = data.dates.endDateTime;
	let start = data.dates.start;
	let end = data.dates.end;
	let technologies = data.technologies;
	document.querySelector('.zoomed-project img').src = `${data.image}`;

	zoomedContent.innerHTML = 
	`<div class="details container">
		<div class="description">
			<h3>${data.title}</h3>
			<dl class="date">
				<dt class="visuallyhidden">Data wykonania projektu:</dt>
				<dd>
					${startDateTime ? `<time datetime="${startDateTime}">` : ""}
					${start ? `${start} - ` : ""}</time>
					${endDateTime ? `<time datetime="${endDateTime}">` : ""}
					${end ? `${end}` : "W trakcie"}</time>
				</dd>
			</dl>
			<p>${data.description}</p>
		</div>
		<div class="technologies">
			<h4>Technologie:</h4>
			<ul>
				${technologies.join(0).split(0).map((item, i) => `
				<li> ${item}</li>
				`).join('')}
			</ul>	
		</div>	
	</div>
	<div class="view">
		<a class="live" href="${data.links.live}" target="_blank">Live</a>
		<a class="code" href="${data.links.code}" target="_blank">Kod</a>
	</div>`
	zoomWindow.style.display = "flex";
	currentId = chosenProject.id;
	currentContent = portfolio.querySelector(`#${currentId}`);
	focusInside();
}


function showNextProject (direction) {
	const firstProject = portfolio.querySelector(`.project`);
	console.log(firstProject);
	let nextItem;
	if (direction == 'right') {
		nextItem = currentContent.nextElementSibling;
		if (nextItem === null) {
			nextItem = firstProject;
		}
	} else {		
		if (currentContent === firstProject || nextItem === firstProject) {
			nextItem = portfolio.lastElementChild;
		} else {
			nextItem = currentContent.previousElementSibling;
		}
	}
	loadProject.call(nextItem);
}


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
    else if (e.keyCode == '27') {
		zoom.style.display = "none";
		currentContent.focus();
    }
})

projects.forEach(button => {
	button.addEventListener('click', loadProject);
})

})();