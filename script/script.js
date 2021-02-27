const Inp = document.querySelector('.addForm input');
const addBtn = document.querySelector('.addbtn');
const tabPane = document.querySelector('.tab-pane');
const todolist = document.querySelector('.uncompleted');
const compllist = document.querySelector('.completed');

addBtn.addEventListener('click', addTodo);
todolist.addEventListener('click', savecompletedStorage);
todolist.addEventListener('click', removeFromUncompleted);
compllist.addEventListener('click', editCompletedList);

function todoStyle(value) {
    var div = document.createElement('div');
        div.classList.add('todo', 'd-flex', 'px-3', 'justify-content-between', 'pt-3', 'pb-1', 'border-bottom');
    var todoTxt = document.createElement('p');
    var inpvalue = value;
        todoTxt.innerText = inpvalue;
    var divbox = document.createElement('div');
    var check = document.createElement('div');
        check.classList.add('check', 'px-2', 'mb-3');
        check.innerHTML = '<i class="fas fa-check"></i>';
    var trash = document.createElement('div');
        trash.classList.add('trash', 'px-2', 'mb-3');
        trash.innerHTML = '<i class="fas fa-trash"></i>';
        divbox.appendChild(trash);
        divbox.appendChild(check);

        div.appendChild(todoTxt);
        div.appendChild(divbox);
        todolist.prepend(div);

    Inp.value = '';
}

// UNCOMPLETED LOCAL STORATE 

function saveUncompletedStorage(item) {
    let tasks;

    if(localStorage.getItem('uncompleted') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('uncompleted'));
    }

    tasks.push(item);
    localStorage.setItem('uncompleted', JSON.stringify(tasks));
}

function addTodo(e) {
    e.preventDefault();

    if(Inp.value.length >= 1) {
        let value = Inp.value;
        // SAVE TO LOCAL STORAGE 
        saveUncompletedStorage(value);
        // 
        todoStyle(value);
    }
}
function getUncompletedTasks() {
    let tasks;

    if(localStorage.getItem('uncompleted') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('uncompleted'));
    }

    tasks.forEach(element => {
        let value = element;
        todoStyle(value);
    });
}
getUncompletedTasks();

function removeFromUncompleted(e) {
    let tasks;

    if(localStorage.getItem('uncompleted') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('uncompleted'));
    }

    let checkBtn = e.target.children[0].parentElement.classList[0];

    if(checkBtn == 'check') {
        let task = e.target.parentElement.parentElement.children[0].innerText;
        
        tasks.splice(tasks.indexOf(task), 1);
        localStorage.setItem('uncompleted', JSON.stringify(tasks));
    }

    if(checkBtn == 'trash') {
        let task = e.target.parentElement.parentElement.children[0].innerText;
        
        tasks.splice(tasks.indexOf(task), 1);
        localStorage.setItem('uncompleted', JSON.stringify(tasks));
        e.target.parentElement.parentElement.remove();
    }
}

// COMPLETED LOCAL STORAGE 

function completedStyle(value) {
    var div = document.createElement('div');
        div.classList.add('todo', 'd-flex', 'px-3', 'justify-content-between', 'pt-3', 'pb-1', 'border-bottom');
    var todoTxt = document.createElement('p');
        todoTxt.classList.add('text-success');
    var inpvalue = value;
        todoTxt.innerText = inpvalue;
    var divbox = document.createElement('div');
    var check = document.createElement('div');
        check.classList.add('check', 'px-2', 'mb-3');
        check.innerHTML = '<i class="fas fa-redo"></i>';
    var trash = document.createElement('div');
        trash.classList.add('trash', 'px-2', 'mb-3');
        trash.innerHTML = '<i class="fas fa-trash"></i>';
        divbox.appendChild(trash);
        divbox.appendChild(check);

        div.appendChild(todoTxt);
        div.appendChild(divbox);
        compllist.prepend(div);
}

function savecompletedStorage(e) {
    let todos;

    if(localStorage.getItem('completed') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('completed'));
    }
    let checkBtn = e.target.children[0].parentElement.classList[0];

    if(checkBtn == 'check') {
        let task = e.target.parentElement.parentElement.children[0].innerText;
        completedStyle(task);

        todos.push(task);
        localStorage.setItem('completed', JSON.stringify(todos));
        e.target.parentElement.parentElement.remove();
    }
}

function getcompletedList() {
    let todos;

    if(localStorage.getItem('completed') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('completed'));
    }
    todos.forEach(element => {
        completedStyle(element);
    });
}
getcompletedList();


function editCompletedList(e) {
    let todos;

    if(localStorage.getItem('completed') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('completed'));
    }


    var item = e.target.parentElement.parentElement.children[0].innerText;

    if(e.target.classList[0] == 'check') {
        todos.splice(todos.indexOf(item), 1);
        localStorage.setItem('completed', JSON.stringify(todos));
        e.target.parentElement.parentElement.remove();

        saveUncompletedStorage(item);
        todoStyle(item);
    }
    
    if(e.target.classList[0] == 'trash') {
        todos.splice(todos.indexOf(item), 1);
        localStorage.setItem('completed', JSON.stringify(todos));
        e.target.parentElement.parentElement.remove();
    }

}

// 