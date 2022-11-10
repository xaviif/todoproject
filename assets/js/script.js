let addTaskButton = document.getElementById("addTaskBtn")
let taskContainer = document.getElementsByClassName('list-group')[0]

for(let i = 0; i<=5; i++)
  addItem({
    title: "Title"+ Math.round(Math.random()*20) + Math.round(Math.random()*20),
    desc: "Desc",
    assignedTo: "Assigned To"+Math.round(Math.random()*120),
    status: "to-do",
    date: `${Math.round(Math.random()*20)}-${Math.round(Math.random()*20)}-${Math.round(Math.random()*20)}`
  })

addTaskButton.addEventListener("click", validateInput)
taskContainer.addEventListener('click', function(e){
  let selectedTask = getClickedTaskItem(e)
  let clickedTaskData = selectedTask.info
  fillForm(clickedTaskData)
  document.documentElement.scrollTop = 0;
});