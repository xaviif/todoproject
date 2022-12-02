//Grab all elements with an attribute of key
let userInput = document.querySelectorAll("[key]") 
let taskList = []; //Each represented by Task.
let idCounter = 0;
let siblings = n => [...n.parentElement.children].filter(c=>c!=n) //Returns all siblings of an element
let dOptions = { dateStyle: "short", weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
const getObjFromForm = () => [...userInput].reduce((a, v) => ({ ...a, [v.getAttribute("key")]: ( v.getAttribute('key') === "date")? v.valueAsDate: v.value}), {}) //Returns form input as an object
const removeAllChildNodes = (parent) => {
  while (parent.lastElementChild) {
    parent.removeChild(parent.lastElementChild);
  }
} 
function dateIsValid(dateStr) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (dateStr.match(regex) === null) {
    return false;
  }

  const date = new Date(dateStr);

  const timestamp = date.getTime();

  if (typeof timestamp !== 'number' || Number.isNaN(timestamp)) {
    return false;
  }

  return date.toISOString().startsWith(dateStr);
}

function render(){
  console.log("a")
  let clonedButton = createTaskButton.cloneNode(true)
  taskContainers.forEach(el => {
    removeAllChildNodes(el)
  })
  taskContainers[0].append(clonedButton)
}
function load(){
  let i = 0;
  let localTask = JSON.parse(localStorage.getItem('task_'+i))
  while(localTask){
    addItem(localTask)
    i++;
    localTask = JSON.parse(localStorage.getItem('task_'+i))
  }
}
function addItem(arr){
  //Populate data with user's input if no arguments
  let data = (arr === undefined) ? getObjFromForm() : arr
  let id = idCounter
  idCounter++;
  //Push to taskList
  taskList[id] = new Task(data, id)
  taskList[id].display(document.getElementsByClassName("list-group")[idCounter%3])
}

function validateInput(){
  //Check for empty fields. Returns false if any input is missing. True is everything looks good.
  let pass = true
  
  //forEach loop. 
  //equivalent to for(let i in userInput)
  userInput.forEach((i)=>{
    let parent = i.parentElement;
    let val = i.value 
    if(val === ""){ 
      parent.querySelector(".alert-warning").classList.add("visible")
      parent.querySelector(".alert-warning").classList.remove("invisible")
      pass = false  
    }else{
      parent.querySelector(".alert-warning").classList.remove("visible")
      parent.querySelector(".alert-warning").classList.add("invisible")
    }
  })
  return pass
}

function formUpdateTask(){
  //Stage website for updating a task
  updating = true;
  document.querySelector('#taskTitle').textContent = "Update Task"
  addTaskButton.textContent = "Save"
}
function formNewTask(){
  //Stage website for creating a new task
  taskUpdate = "";
  updating = false;
  document.querySelector('#taskTitle').textContent = "New Task"
  addTaskButton.textContent = "Add Task"
}
function clearForms(){
  //Clear all inputs
  userInput.forEach((i)=>{ i.value = "" })
  showCards()
}
function fillForm(data){
  //data = {}
  //Populate all inputs with appropiate values from {data}
  userInput.forEach(function(i){
    let key = i.getAttribute("key")
    i.value = data[key]
  })
}
function hideSiblings(task){
  //Hides siblings and pops out the current task
  task.pop();
  //Loop through taskList and call .hide(), excluding the given task
  for(let i in taskList)
    if(taskList[i].info.id!==task.info.id) taskList[i].hide()
}
function showCards(){
  //Resets all cards with .resetStyle
  for(let i in taskList) taskList[i].resetStyle()
}
function getClickedTaskItem(e){
  //e = element
  //Returns a single task from taskList
  let id = parseInt(e.target.closest('.card').getAttribute("id").replace('task_',''));
  return taskList[id]
}

/**On Click Functions */
function onCancelClick(){
  clearForms()
  if(updating) formNewTask()
}
function onAddTaskClick(){
  //Invokes validateInput() inside an if function
  if(validateInput()){
    //If not updating, create a new card. otherwise, update the card. 
    if(!updating) addItem()
    else{
      taskUpdate.updateInfo(getObjFromForm())
      formNewTask()
    }
    clearForms()
  }
}
function updateTask(task){
  let key = task.index
  taskUpdate = task;
  fillForm(task.info)
  formUpdateTask()

  hideSiblings(task)
  document.documentElement.scrollTop = 0;
}
function onTaskContainerClick(e){
  if(e.target.closest('li').classList.contains('utilCard')) return onCreateTaskClick(e)

  let selectedTask = getClickedTaskItem(e)
  let taskInfo = selectedTask.info
  if(e.target.classList.contains('btn-danger')){
    //Delete a card
    taskList.splice(selectedTask.index, 1);
    localStorage.clear()
    e.target.closest('li').remove()
    for(let [k, v] of Object.entries(taskList)) v.reID(k)
    idCounter = taskList.length
    render()
    
  }
  else if(e.target.classList.contains('btn-success')){
    //Complete a card's status
    taskInfo.status = 'Completed'
    selectedTask.updateInfo(taskInfo)
  }else{
    //Switch to update view
    if(updating) showCards();
    updateTask()
    
  }
}
function onCreateTaskClick(e){
  if(e.target.classList.contains('btn-danger')){
    document.querySelector("#newTaskButton #button").classList.toggle('hiddenCont')
    document.querySelector("#newTaskButton #button").classList.toggle('d-flex')
    document.querySelector("#newTaskButton #form").classList.toggle('hiddenCont')
    document.querySelector("#newTaskButton #form").classList.toggle('animateHeight')
    document.querySelector("#newTaskButton #button").classList.toggle('animateHeight')
    return false;
  }
  let isClicked = document.querySelector("#newTaskButton #button").classList.contains('d-flex')
  
  if(isClicked){
    document.querySelector("#newTaskButton #button").classList.toggle('hiddenCont')
    document.querySelector("#newTaskButton #button").classList.toggle('d-flex')
    document.querySelector("#newTaskButton #form").classList.toggle('hiddenCont')
    document.querySelector("#newTaskButton #form").classList.toggle('animateHeight')
    document.querySelector("#newTaskButton #button").classList.toggle('animateHeight')

  }else{

  }
}