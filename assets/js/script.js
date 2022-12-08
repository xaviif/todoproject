let addTaskButton = document.getElementById("addTaskBtn")
let taskContainers = document.querySelectorAll('.list-group')
let cancelButton = document.getElementById("cancelButton")
let createTaskButton = document.getElementById("newTaskButton")
let updating = false;
let taskUpdate = "";

taskContainers.forEach(function(el){
  el.addEventListener('click', function(e){
    onTaskContainerClick(e)
  });
})
taskContainers[0].addEventListener('submit', function(e){
  onAddTaskClick()
  e.preventDefault()
});
document.addEventListener("DOMContentLoaded", load)

