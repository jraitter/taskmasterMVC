import { generateId } from "../utils.js"

export default class Task {
  constructor(data) {
    this.taskName = data.taskName
    this.id = data.id || generateId()
  }
  Template(taskID) {
    return /*html*/`
<div class="col-6">
  <div class="row">
  <div class="col-10">
  <h4>${this.taskName}</h4>
  </div>
  <div class="col-2">
  <button onclick="app.listController.deleteTask('${taskID}', '${this.id}')" type="button" class="btn btn-warning btn-sm">X</button>
  </div>
  </div>
</div>
`
  }
}