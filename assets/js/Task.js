/***
 * Mustache.js is a template library. 
 * In <header>, #taskItem is a template. This program grabs #taskItem's
 * innerHTML and replaces {{data}} with an appropiate value from the given object. 
 */
class Task{
  constructor(data){
    /**
     * creates a template by cloning taskItem. 
     * in it's current form, it's a string. 
     * Mustache converts String into html in the display function.
     */
    this.$ = document.getElementById("taskItem").cloneNode(true).innerHTML
    this.arr = data
  }
}

Task.prototype.display = function(parent){
  /**
   * this.arr = {
   *  title: String
   *  desc: String
   *  assignedTo: String
   *  date: Date
   * }
   * Mustache will replace {{key}} with given value
   */
  let ad = Mustache.render(this.$, this.arr);
  parent.innerHTML += ad
}