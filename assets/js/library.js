//Grab all elements with an attribute of key
let userInput = document.querySelectorAll("[key]")
let taskList = [];
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
   save()
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
