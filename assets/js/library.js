//Grab all elements with an attribute of key
let userInput = document.querySelectorAll("[key]")
let taskList = [];
let idCounter = 0;
let siblings = n => [...n.parentElement.children].filter(c=>c!=n)
function addItem(arr = undefined){
  let data = {}
  let id = idCounter
  idCounter++;

  //Populate data with user's input if no arguments
  if(arr === undefined) userInput.forEach((i)=> data[i.getAttribute('key')] = i.value)
  else data = arr
  let curTask = new Task(data, id)
  curTask.display(document.getElementsByClassName("list-group")[0])
  taskList.push(curTask)
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
  return pass ? addItem() : false
}


function getClickedTaskItem(e){
  let id = parseInt(e.target.closest('.card').getAttribute("id").replace('task_',''));
  return taskList[id]
}

function fillForm(data){
  userInput.forEach(function(i){
    let key = i.getAttribute("key")
    i.value = data[key]
    console.log(i)
    console.log(key, i.value)
  })
}