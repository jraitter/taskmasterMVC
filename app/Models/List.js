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
<h1>${this.listName}</h1>
<button onclick="app.listController.deleteList('${this.id}')" class="btn btn-danger">Delete</button>
<h3>Tasks: ${this.Tasks}</h3>
<form onsubmit="app.listController.addTask(event, '${this.id}')">
                    <div class="form-group">
                        <label for=""></label>
                        <input type="text" name="taskName" class="form-control" placeholder="Add extra tasks"
                            aria-describedby="helpId">
                        <button class="btn btn-primary" type="submit">
                            Add tasks
                        </button>
                    </div>
                </form>
</div>
`
  }
}
