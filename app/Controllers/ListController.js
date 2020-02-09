import _listService from "../Services/ListService.js";
import _store from "../store.js"


export default class ListController {
  constructor() {
    console.log("ListController constructor loaded");
    //NOTE: After the store loads, we can automatically call to draw the lists.
    _drawLists();
  }

  //TODO: Your app will need the ability to create, and delete both lists and listItems

  addList(event) {
    // prevent website from going to next page when form is submitted
    event.preventDefault();
    console.log("ListController received addList event", event);

    // alias the event.target, this is where the form data is stored that we need
    let formData = event.target;
    // get the list name from the form (came in with the event data) create obj
    let newListObj = {
      listName: formData.listName.value
    }
    // send new list object to the pizza service
    _listService.addList(newListObj)
    _drawLists()
  }
  addTask(event, id) {
    event.preventDefault();
    let formData = event.target;
    let newTaskObj = {
      taskName: formData.taskName.value
    }
    _listService.addTask(newTaskObj, id)
    _drawLists();
  }

  taskChecked(taskID) {
    console.log("taskID = ", taskID);
    let currElem = document.getElementById(taskID)
    console.log("the element is ", currElem.checked)
    let isChecked = currElem.checked;
    _listService.taskChecked(taskID, isChecked);
  }



  deleteList(listID) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this list.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          // swal("Your list has been deleted!", {
          //   icon: "success",
          // });
          _listService.deleteList(listID);
          _drawLists();
        }
      });

  }
  deleteTask(listID, taskID) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          // swal("Your task has been deleted!", {
          //   icon: "success",
          // });
          _listService.deleteTask(listID, taskID);
          _drawLists();
        }
      });
  }
}
//Public
//TODO Don't forget to render to the screen after every data change.
function _drawLists() {
  // get access to the list data
  let lists = _store.State.lists;
  // get an html element to put the data.
  let listRowElem = document.getElementById("list-row");
  // create the data template
  let template = "";
  lists.forEach(list => {
    template += list.Template;
  })
  listRowElem.innerHTML = template;
}