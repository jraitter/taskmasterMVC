import List from "../Models/List.js";
import Task from "../Models/Task.js"
import _store from "../store.js"

//Public
class ListService {

  constructor() {
    console.log("ListService constructor loaded");
  }
  //TODO  Here is where we handle all of our business logic,
  //given the information you need in the controller,
  //what methods will you need to do when this class is first 'constructed'?
  //NOTE You will need this code to persist your data into local storage, be sure to call the store method to save after each change
  addList(newListObj) {
    console.log("ListService received addList request w/ newListObj");

    // create new instance of type "Pizza" to match "store.js" type
    let newList = new List(newListObj)
    // push the newPizze to the array of type Pizza in store
    _store.State.lists.push(newList)
    // send state data to local storage
    _store.saveState()
  }
  addTask(newTaskObj, listID) {
    // create instance of Type task
    let newTask = new Task(newTaskObj);
    // push task to the correct list
    let list = _store.State.lists.find(list => list.id === listID)
    list.tasks.push(newTask);
    _store.saveState();
  }

  // here we are creating a new array with all the lists EXCEPT the one with passed in ID.  Then pushing the new array back to store.  this is dangerous, you sould never assign values back into store, you could blow away all data.
  deleteList(listID) {
    let lists = _store.State.lists.filter(list => list.id !== listID);
    _store.State.lists = lists;
    _store.saveState();
  }

  // here we are first finding the list with the list ID, then filtering out the task with taskId.  We are actually creating a new array of tasks except for the one with taskId and re-attaching it back to the  list with listID.  list here is point to the actual list in the store, again dangerous, you could blow away all the tasks for that list if not careful.
  deleteTask(listID, taskID) {
    let list = _store.State.lists.find(list => list.id === listID);
    let tasks = list.tasks.filter(task => task.id !== taskID);
    list.tasks = tasks;
    _store.saveState();
  }
  taskChecked(taskID, isChecked) {
    console.log("ListService taskChecked method");
    let lists = _store.State.lists;
    for (let i = 0; i < lists.length; i++) {
      let tasks = lists[i].tasks;
      for (let j = 0; j < tasks.length; j++) {
        if (tasks[j].id === taskID) {
          tasks[j].isChecked = isChecked;
        }
      }
      _store.saveState();
    }
  }
}

// singleton concept:
// only create one instance of the service and export that.  Other files that import the service, are all gettign the same instance so we don't have multiple instances
const SERVICE = new ListService();
export default SERVICE;
