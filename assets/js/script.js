let addTaskButton = document.getElementById("addTaskBtn")
let taskContainers = document.querySelectorAll('.list-group')
let cancelButton = document.getElementById("cancelButton")
let createTaskButton = document.getElementById("newTaskButton")
let updating = false;
let taskUpdate = "";

// cancelButton.addEventListener("click", onCancelClick)
addTaskButton.addEventListener("click", onAddTaskClick)

// createTaskButton.addEventListener('click', function(e){
//   onCreateTaskClick(e)
// })
taskContainers.forEach(function(el){
  el.addEventListener('click', function(e){
    onTaskContainerClick(e)
  });
})
document.addEventListener("DOMContentLoaded", load)
