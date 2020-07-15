// UI vars
const form = document.querySelector('.task-form');
const textInput = document.querySelector('.task');
const taskList =document.querySelector('.collection');
const filter = document.querySelector('#filter');
const clearBtn =document.querySelector('.clear-tasks');

// load all event listeners
loadEventListeners();

function loadEventListeners(){
    // dom load event
    document.addEventListener('DOMContentLoaded',getTasks);
    // add task event
    form.addEventListener('submit',addTask);
    // remove task
    taskList.addEventListener('click',removeTask);
    // clear task
    clearBtn.addEventListener('click',clearTasks);
    // filter task event
    filter.addEventListener('keyup',filterTasks);
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
       //   create li element
  const li = document.createElement('li');

  //   add classname
   li.className = 'collection-item';
  
  //  create text node and  append to li
  li.appendChild(document.createTextNode(task));
  
  // create a new link
  const link =document.createElement('a');
  
  // add classname
  link.className ='delete-item secondary-content';
  
  // add icon to link
  link.innerHTML ='<i class="fa fa-remove"></i>';
  
  // append link  to li
  li.appendChild(link);

  taskList.appendChild(li);
    });
}
function addTask(e){
    if(textInput.value === ''){
     alert('Add a task');
    }
//   create li element
  const li = document.createElement('li');

//   add classname
 li.className = 'collection-item';

//  create text node and  append to li
li.appendChild(document.createTextNode(textInput.value));

// create a new link
const link =document.createElement('a');

// add classname
link.className ='delete-item secondary-content';

// add icon to link
link.innerHTML ='<i class="fa fa-remove"></i>';

// append link  to li
li.appendChild(link);

// store in localstorage
storeTaskInLocalStorage(textInput.value);

taskList.appendChild(li);
// clear input

textInput.value ='';

    e.preventDefault();
}

// store
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
    
}

function removeTask(e){
   if(e.target.parentElement.classList.contains('delete-item')){
       if(confirm('Are You Sure?')){
         e.target.parentElement.parentElement.remove();

         // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
       }
       
   }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    });
  
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  

function clearTasks(e){
taskList.innerHTML='';


 // Clear from LS
 clearTasksFromLocalStorage();
}
// Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
  }

function filterTasks(e){
    const text = e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach(function(task){
       const item =task.firstChild.textContent;
       if(item.toLowerCase().indexOf(text)!=-1){
           task.style.display ='block';
       }else{
           task.style.display ='none';
       }
   });
}