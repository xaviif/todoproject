/***
 * Mustache.js is a template library. 
 * In <header>, #taskItem is a template. This program grabs #taskItem's
 * innerHTML and replaces {{data}} with an appropiate value from the given object. 
 */
class Task{
  constructor(data, id){
    /**
     * {data} holds all the arguments
     * like so:
     * {
     *  title: String
     *  desc: String
     *  assignedTo: String
     *  date: Date
     *  status: String
     *  id: String
     * }
     */
    this.template = document.getElementById("taskItem").cloneNode(true).innerHTML
    this.$;
    this.arr = data
    this.arr.id = 'task_'+id
    this.parent;
  }
  //returns {}
  get info(){
    return this.arr;
  }
}

Task.prototype.display = function(parent){
  //parent = element to push to.
  //Uses a Mustache template to create a new element.
  this.parent = parent;
  let ad = Mustache.render(this.template, this.arr);
  //parse string as an html element
  parent.insertAdjacentHTML("beforeend", ad)
  this.$ = document.getElementById(this.arr.id)
  
}

Task.prototype.hide = function(){
  this.$.classList.add("card-hidden")
}

Task.prototype.pop = function(){
  this.$.classList.add("clickedOn")
}

Task.prototype.resetStyle = function(){
  if(this.$.classList.contains("card-hidden"))
    this.$.classList.remove("card-hidden")
  
  if(this.$.classList.contains("clickedOn"))
    this.$.classList.remove("clickedOn")
  console.log("style reset")
}


Task.prototype.updateInfo = function(x){
  //x = {}
  //Removes self, and creates a new element using x as data.
  this.$.remove()
  let id = this.arr.id;
  this.arr = x;
  this.arr.id = id;

  let ad = Mustache.render(this.template, this.arr);
  this.parent.insertAdjacentHTML("beforeend", ad)
  this.$ = document.getElementById(this.arr.id)
}