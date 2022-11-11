let addTaskButton = document.getElementById("addTaskBtn")
let taskContainer = document.getElementsByClassName('list-group')[0]
let cancelButton = document.getElementById("cancelButton")
let updating = false;
let taskUpdate = "";

cancelButton.addEventListener("click", onCancelClick)

addTaskButton.addEventListener("click", onAddTaskClick)

taskContainer.addEventListener('click', function(e){
  onTaskContainerClick(e)
});