var task = document.querySelector('#task');
var addtask = document.querySelector('#addbtn');
var i = 0;
window.onload = () => {
    loadTasksFromLocalStorage();
}
addtask.addEventListener('click', () => {
    if (task.value) {
        addingtask(task.value);
        saveTasksToLocalStorage();
    } else {
        alert("Field should Not be Empty");
    }
});
function addingtask(value) {
    let li = document.createElement('li');
    li.setAttribute('class', 'm-3 bg-slate-400 p-3 rounded text-zinc-900 font-bold shadow-2xl');
    
    let div = document.createElement('div');
    div.setAttribute('class', 'flex justify-between items-center');
    
    let h1 = document.createElement('h1');
    h1.innerHTML = value;
    h1.style.cursor = 'pointer';
    h1.addEventListener('click', () => {
        if (h1.style.textDecoration === 'line-through') {
            h1.style.textDecoration = 'none';
        } else {
            h1.style.textDecoration = 'line-through'; 
        }
        saveTasksToLocalStorage();
    });

    let button = document.createElement('button');
    button.innerHTML = "Remove";
    button.setAttribute('class', 'mx-5 bg-red-600 px-10 py-2 shadow-2xl rounded-full text-yellow-100');
    button.setAttribute('id', `${i}`);
    button.setAttribute('onclick', `removeitem(this.getAttribute('id'))`);

    let ul = document.getElementById('ul');
    ul.appendChild(li);
    li.setAttribute('id', `${i}`);
    i++;

    li.appendChild(div);
    div.appendChild(h1);
    div.appendChild(button);
    
    task.value = ''; 
}

function removeitem(id) {
    let getlist = document.getElementById(`${id}`);
    getlist.remove();
    saveTasksToLocalStorage();
}
function saveTasksToLocalStorage() {
    let tasks = [];
    let taskElements = document.querySelectorAll('#ul li h1');

    taskElements.forEach((task) => {
        tasks.push({
            name: task.innerHTML,
            completed: task.style.textDecoration === 'line-through'
        });
    });
    localStorage.setItem('movies', JSON.stringify(tasks));
}
function loadTasksFromLocalStorage() {
    let tasks = JSON.parse(localStorage.getItem('movies')) || [];
    
    tasks.forEach(task => {
        addingtask(task.name);
        if (task.completed) {
            let taskElements = document.querySelectorAll('#ul li h1');
            let lastTask = taskElements[taskElements.length - 1];
            lastTask.style.textDecoration = 'line-through';
        }
    });
}
