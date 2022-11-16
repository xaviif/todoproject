//Grab all elements with an attribute of key
let userInput = document.querySelectorAll("[key]") 
let taskList = []; //Each represented by Task.
let idCounter = 0;
let siblings = n => [...n.parentElement.children].filter(c=>c!=n) //Returns all siblings of an element
const getObjFromForm = () => [...userInput].reduce((a, v) => ({ ...a, [v.getAttribute("key")]: v.value}), {}) //Returns form input as an object

function addItem(arr){
  //Populate data with user's input if no arguments
  let data = (arr === undefined) ? getObjFromForm() : arr
  let id = idCounter
  idCounter++;

  //Push to taskList
  taskList.push(new Task(data, id))
  taskList[id].display(document.getElementsByClassName("list-group")[0])
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
function onTaskContainerClick(e){
  if(e.target.classList.contains('btn-success')){
    let quote = getClickedTaskItem(e)
    let change = quote.info
    change.status = 'Completed'
    quote.updateInfo(change)
  }else{
    if(updating) showCards();

    let selectedTask = getClickedTaskItem(e)
    taskUpdate = selectedTask;

    let clickedTaskData = selectedTask.info
    fillForm(clickedTaskData)
    formUpdateTask()

    hideSiblings(selectedTask)
    document.documentElement.scrollTop = 0;
  }
}