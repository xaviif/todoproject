//Grab all elements with an attribute of key
let userInput = document.querySelectorAll("[key]")
let taskList = [];
let idCounter = 0;

let introAnimation = true;
const dOptions = { dateStyle: "short", weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' }
const siblings = n => [...n.parentElement.children].filter(c=>c!=n) //Returns all siblings of an element
const clearForms = () => userInput.forEach((i)=>{ i.value = "" }) 
const getObjFromForm = () => [...userInput].reduce((a, v) => ({ ...a, [v.getAttribute("key")]: ( v.getAttribute('key') === "date")? v.valueAsDate: v.value}), {}) //Returns form input as an object
const showCards = () => { for(let i in taskList) taskList[i].resetStyle() }
const removeAllChildNodes = (parent) => {
  while (parent.lastElementChild) {
    parent.removeChild(parent.lastElementChild);
  }
} 
function redraw(){
  let fakeIdCounter = 1;
  let clonedButton = createTaskButton.cloneNode(true)
  taskContainers.forEach( el => removeAllChildNodes(el) )
  taskContainers[0].append(clonedButton)
  for(let i in taskList) {
    taskList[i].display(document.getElementsByClassName("list-group")[fakeIdCounter%3])
    fakeIdCounter++;
  }
}
function load(){
  let i = 0;
  let localTask = JSON.parse(localStorage.getItem('task_'+i))
  while(localTask){
    introAnim = true;
    addItem(localTask)
    i++;
    localTask = JSON.parse(localStorage.getItem('task_'+i))
  }
  introAnim = false;
}
function addItem(arr){
  //Populate data with user's input if no arguments
  let data = (arr === undefined) ? getObjFromForm() : arr
  let id = idCounter
  idCounter++;
  //Push to taskList
  taskList[id] = new Task(data, id)
  taskList[id].display(document.getElementsByClassName("list-group")[idCounter%3], introAnimation)

}
function formNewTask(){
 taskUpdate = "";
 updating = false;
 document.querySelector('#taskTitle').textContent = "New Task"
 addTaskButton.textContent = "Add Task"
}
function fillForm(data){
 userInput.forEach(function(i){
   let key = i.getAttribute("key")
   i.value = data[key]
 })
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
  introAnimation = false;
  //If not updating, create a new card. otherwise, update the card. 
  if(!updating) addItem()
  else{
    taskUpdate.updateInfo(getObjFromForm())
    formNewTask()
  }
  clearForms()
}
function deleteTask(index){
  taskList = taskList.filter(i => i.index !== index)
  localStorage.clear()
  idCounter -= 1;
  for(let [k, v] of Object.entries(taskList)) v.reID(k)
  redraw()

}
function onTaskContainerClick(e){
  if(e.target.closest('li').classList.contains('utilCard')) return onCreateTaskClick(e)

  let selectedTask = getClickedTaskItem(e)
  if(e.target.classList.contains('btn-danger')){
    deleteTask(selectedTask.index)
    e.target.closest('li').remove()
  }
  else if(e.target.classList.contains('btn-success')){ selectedTask.markAsComplete() }
}
function onCreateTaskClick(e){
  //if(e.target.getAttribute("id") === "addTaskBtn") onAddTaskClick()
  let button = document.querySelector("#newTaskButton #button");
  let form = document.querySelector("#newTaskButton #form");
  if(e.target.classList.contains('btn-danger')){
    button.classList.toggle('hiddenCont')
    button.classList.toggle('d-flex')
    button.classList.toggle('animateHeight')

    form.classList.toggle('hiddenCont')
    form.classList.toggle('animateHeight')
    return false;
  }
  let isClicked = button.classList.contains('d-flex')
  
  if(isClicked){
    button.classList.toggle('hiddenCont')
    button.classList.toggle('d-flex')
    button.classList.toggle('animateHeight')
    form.classList.toggle('hiddenCont')
    form.classList.toggle('animateHeight')

  }
}
