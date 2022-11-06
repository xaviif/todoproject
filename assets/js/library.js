//Grab all elements with an attribute of key
let userInput = document.querySelectorAll("[key]")
let tasks = []
function addItem(){
  let data = {}
  //Populate data with user's input 
  userInput.forEach((i)=> data[i.getAttribute('key')] = i.value )

  let curTask = new Task(data)
  curTask.display(document.getElementsByClassName("list-group")[0])
  tasks.push(curTask)
}

function validateInput(){
  //Check for empty fields. 
  let pass = true
  userInput.forEach((i)=>{
    if(i.value === ""){ 
      i.classList.add("error")
      pass = false  
    }else i.classList.remove("error")
  })
  //addItem() if fields are filled in. return false if not.
  return pass ? addItem() : false
}