const form = document.querySelector('.add-task');
const info = document.querySelector('.task-info');
const add = document.querySelector('.submit-task');
const clear = document.querySelector('.task-clear');
const deleteTask = document.querySelector('.delete-item');
const collectionContainer = document.querySelector('.task-container');
const filter = document.querySelector('.filter');
const checkbox = document.querySelector('#checkbox');

add.addEventListener('click', addTask);
clear.addEventListener('click', clearItems);
collectionContainer.addEventListener('click', deleteItems);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

// checkIfFinished();


function addTask(event){
	event.preventDefault();
	let li = document.createElement('li');
	li.className = 'task-item';

	let box = document.createElement('input');
	box.setAttribute('type', 'checkbox');

	let linkA = document.createElement('a');
	linkA.setAttribute('href', '#');
	linkA.className = 'delete-item';

	let linkB = document.createElement('i');
	linkB.className = 'bi';
	linkB.className = 'bi-trash-fill';

	linkA.appendChild(linkB);

	li.appendChild(box);
	li.appendChild(document.createTextNode(info.value));
	li.appendChild(linkA);

	collectionContainer.appendChild(li);

	storeTask(info.value);

	info.value = '';
}

function storeTask(value){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.push(value);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearItems(event){
	const liItems = document.querySelectorAll('li');
	liItems.forEach( function(element) {
		// statements
		element.remove();
	});
	clearTasks();
}

function clearTasks(){
	localStorage.clear();
}

function deleteItems(event){
	// event.preventDefault();
	// console.log(event.target);
	if(event.target.parentElement.classList.contains('delete-item')){
		event.target.parentElement.parentElement.remove();
		removeTask(event.target.parentElement.parentElement);
	}
}

function removeTask(task){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(object, index){
		if (task.textContent === object) {
			tasks.splice(index)
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filterTask(event){
	const text = event.target.value.toLowerCase();



	document.querySelectorAll('.task-item').forEach(function(obj){
		const item = obj.textContent;
		if(item.toLowerCase().indexOf(text) != -1){
			obj.style.display = 'flex';
		}else {
			obj.style.display = 'none';
		}
	});
}

function getTasks(event){
	let tasks;
	if(localStorage.getItem('tasks') === null){
		tasks = [];
	}else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(object){
		let li = document.createElement('li');
		li.className = 'task-item';

		let box = document.createElement('input');
		box.setAttribute('type', 'checkbox');

		let linkA = document.createElement('a');
		linkA.setAttribute('href', '#');
		linkA.className = 'delete-item';

		let linkB = document.createElement('i');
		linkB.className = 'bi';
		linkB.className = 'bi-trash-fill';

		linkA.appendChild(linkB);

		li.appendChild(box);
		li.appendChild(document.createTextNode(object));
		li.appendChild(linkA);

		collectionContainer.appendChild(li);
	});
}

// Figure Out How to Dynamically Update the Progress Bar

// function checkIfFinished(){
// 	let items = document.querySelectorAll('input');
// 	items.forEach(function(value){
// 		if(value.){
// 			console.log('update');
// 		}
// 	});
// }

// function animate(width){

// }