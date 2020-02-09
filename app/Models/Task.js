import { generateId } from "../utils.js"

export default class Task {
  constructor(data) {
    this.taskName = data.taskName
    this.id = data.id || generateId()
    this.isChecked = data.isChecked || false;
  }
  Template(taskID) {

    let codeVar = ""
    if (this.isChecked) {
      codeVar = `<input type="checkbox" name="taskChecked" class="ml-1" onclick="app.listController.taskChecked('${this.id}')" id="${this.id}" checked>`
    } else {
      codeVar = `<input type="checkbox" name="taskChecked" class="ml-1" onclick="app.listController.taskChecked('${this.id}')" id="${this.id}">`
    }
    return `
      <div class="row mb-1">
      <div class="col-12 d-flex align-items-center">
      <button onclick="app.listController.deleteTask('${taskID}', '${this.id}')" type="button" class="btn btn-danger btn-sm">X</button>`
      + codeVar +
      `<h6 class="m-0 pl-2">${this.taskName}</h6>
      </div>
    </div>
`
  }
}