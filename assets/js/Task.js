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
    this.$ = document.getElementById("taskItem").cloneNode(true).innerHTML
    this.arr = data
    this.arr.id = 'task_'+id
  }
  get info(){
    return this.arr;
  }
}

Task.prototype.display = function(parent){
  let ad = Mustache.render(this.$, this.arr);
  parent.innerHTML += ad
  this.$ = document.getElementById(this.arr.id)
  
}