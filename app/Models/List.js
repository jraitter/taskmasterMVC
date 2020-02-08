import { generateId } from "../utils.js";
import Task from "../Models/Task.js"

export default class List {
  /**
  * @param {{ listName: any; id: string; tasks: Task[]; }} data
  */
  constructor(data) {
    //TODO Your constructor takes in a data object that should have the properties you need to create your list here is a freebie, it will set the id its provided, or if that is undefined it will create a new one (this is an alternative to object destructuring)
    this.id = data.id || generateId();
    this.listName = data.listName
    this.tasks = data.tasks || []
  }
  //Be sure to add the methods needed to create the view template for this model
  //For starting out, your tasks may be strings alone, but later you may wish to turn them into full objects, that will be up to you


  get Tasks() {
    // TODO create template 
    let template = "";
    this.tasks.forEach(task => {
      template += task.Template(this.id)
    });
    return template;
  }
  get Template() {
    return /*html*/`
<div class="col-6">
<div class="row">
<div class="col-12 d-flex align-items-center">
<button onclick="app.listController.deleteList('${this.id}')" class="btn btn-sm btn-danger">X</button>
<h3 class="pl-1 mb-0">${this.listName}</h3>
</div>
</div>
<div class="row">
<div class="col-12">
 <h4 class="mt-3">Tasks: </h4><span>${this.Tasks}</span>
</div>
</div>
<form onsubmit="app.listController.addTask(event, '${this.id}')">
          <div class="form-group">
               <label for=""></label>
              <input type="text" name="taskName" class="form-control" placeholder="Add extra tasks">
               <button class="btn btn-primary" type="submit">
                   Add tasks
              </button>
           </div>
       </form>
</div>
`
  }
}
