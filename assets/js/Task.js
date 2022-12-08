/***
* Mustache.js is a template library.
* In <header>, #taskItem is a template. This program grabs #taskItem's
* innerHTML and replaces {{data}} with an appropiate value from the given object.
*/
class Task{
  constructor(data, id){
    /**
     * this.arr = {
     *  title: String
     *  desc: String
     *  assignedTo: String
     *  date: Date
     *  id: String
     * }
     * Mustache will replace {{key}} with given value
     */
    this.template = document.getElementById("taskItem").cloneNode(true).innerHTML
    this.$;
    this.arr = data
    if(!this.arr.formattedDate){
      let month = new Intl.DateTimeFormat("en-US", {month: 'long'}).format(this.arr.date.getMonth() - 1)
      let day =  (this.arr.date.getUTCDate() < 10)? '0'+this.arr.date.getUTCDate(): this.arr.date.getUTCDate();
      let formattedDate = `${day} ${month} ${this.arr.date.getUTCFullYear()} `
      this.arr.formattedDate = formattedDate;
    }
    this.arr.id = 'task_'+id
    this._index = id;
    this.parent;
  }
  get info(){
    return this.arr;
  }
  get index(){
    return this._index;
  }
}
Task.prototype.display = function(parent){
  //parent = element to push to.
  //Uses a Mustache template to create a new element.

  this.parent = parent;
  let ad = Mustache.render(this.template, this.arr);
  parent.insertAdjacentHTML("beforeend", ad)
  this.$ = document.getElementById(this.arr.id)

  if(this.arr.status === "completed") this.$.querySelector('.btn-success').replaceWith("Completed!")
  
  if (introAnim) this.$.style.animationDelay =  (this._index * 100) + "ms";
  else{
    document.querySelectorAll('.card:not(#newTaskButton)').forEach(function(El){
      El.style.opacity = 1;
      El.style.animation = "none";
    })
  }

  localStorage.setItem(this.arr.id, JSON.stringify(this.arr))
}

Task.prototype.reID = function(arrayIndex){
  this.arr.id = 'task_'+arrayIndex
  this._index = arrayIndex;
  localStorage.setItem(this.arr.id, JSON.stringify(this.arr))
  
}

Task.prototype.hide = function(){ this.$.classList.add("card-hidden") }

Task.prototype.pop = function(){ this.$.classList.add("clickedOn") }

Task.prototype.resetStyle = function(){
  this.$.setAttribute("class", "m-2 card")
  console.log("reset")
}
Task.prototype.markAsComplete = function(){
  this.arr.status = "completed"
  this.$.classList.add("completed")
  this.$.querySelector('.btn-success').replaceWith("Completed!")
  localStorage.setItem(this.arr.id, JSON.stringify(this.arr))
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

  localStorage.setItem(this.arr.id, JSON.stringify(this.arr))
}

