import { generateId } from "../utils.js"

export default class Task {
  constructor(data) {
    this.taskName = data.taskName
    this.id = data.id || generateId()
  }
  Template(taskID) {
    return /*html*/`
      <div class="row mb-1">
      <div class="col-12 d-flex align-items-center">
      <button onclick="app.listController.deleteTask('${taskID}', '${this.id}')" type="button" class="btn btn-warning btn-sm">X</button>
      <h6 class="m-0 pl-2">${this.taskName}</h6>
      </div>
    </div>
`
  }
}