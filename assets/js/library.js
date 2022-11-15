//Grab all elements with an attribute of key
let userInput = document.querySelectorAll("[key]")
let taskList = [];
let idCounter = 0;
let siblings = n => [...n.parentElement.children].filter(c=>c!=n)
const getObjFromForm = n => [...userInput].reduce((a, v) => ({ ...a, [v.getAttribute("key")]: v.value}), {})

function addItem(arr){
  //Populate data with user's input if no arguments
  let data = (arr === undefined) ? getObjFromForm() : arr
  let id = idCounter
  idCounter++;

  taskList.push(new Task(data, id))
  taskList[id].display(document.getElementsByClassName("list-group")[0])
}

function validateInput(){
  //Check for empty fields. 
  let pass = true
  userInput.forEach((i, j)=>{
    let parent = i.parentElement;
    let val = "";
    val = i.value 
    if(val === ""){ 
      parent.querySelector(".alert-warning").classList.add("visible")
      parent.querySelector(".alert-warning").classList.remove("invisible")
      pass = false  
    }else{
      parent.querySelector(".alert-warning").classList.remove("visible")
      parent.querySelector(".alert-warning").classList.add("invisible")
    }
  })
  //addItem() if fields are filled in. return false if not.
  return pass
}

function formUpdateTask(){
  updating = true;
  document.querySelector('#taskTitle').textContent = "Update Task"
  addTaskButton.textContent = "Save"
}
function formNewTask(){
  taskUpdate = "";
  updating = false;
  document.querySelector('#taskTitle').textContent = "New Task"
  addTaskButton.textContent = "Add Task"
}
function clearForms(){
  userInput.forEach((i)=>{ i.value = "" })
  showCards()
}
function fillForm(data){
  userInput.forEach(function(i){
    let key = i.getAttribute("key")
    i.value = data[key]
  })
}
function hideSiblings(task){
  task.pop();
  for(let i in taskList)
    if(taskList[i].info.id!==task.info.id) taskList[i].hide()
}
function showCards(){
  for(let i in taskList) taskList[i].resetStyle()
}
function getClickedTaskItem(e){
  let id = parseInt(e.target.closest('.card').getAttribute("id").replace('task_',''));
  return taskList[id]
}
/**On Click Functions */
function onCancelClick(){
  clearForms()
  if(updating) formNewTask()
}
function onAddTaskClick(){
  //Calling validateInput() inside an if function
  if(validateInput()){
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