var addButton = document.getElementById("add-button");
var clearCompletedButton = document.getElementById("clear-completed-button");
var emptyButton = document.getElementById("empty-button");
var saveButton = document.getElementById("save-button");
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");
var catImage = document.getElementById("cat-image");

function newCatImage(){
	var width = 200 + 10*Math.ceil(Math.random() * 30);
  var height = 200 + 10*Math.ceil(Math.random() * 30);
	var src = "http://placekitten.com/" + width + "/" + height;
	console.log(src);
	catImage.src = src;
}
catImage.addEventListener("click", newCatImage);

function removeToDoItem(){
	this.parentNode.remove();
}

function toBeCompleted(){
  if(this.parentNode.classList.contains("completed")){
    this.parentNode.classList.remove("completed");
  }else{
    this.parentNode.classList.add("completed");
  }
}

function newToDoItem(itemText, completed){
  var toDoItem = document.createElement("li");
  var checkBox = document.createElement("INPUT");
  var toDoText = document.createTextNode(itemText);
  var trash = document.createElement("BUTTON");

  checkBox.setAttribute("type", "checkbox");

  trash.innerHTML = "x";
  //trash.value = "x";
  trash.style.margin = "10px";

  toDoItem.appendChild(checkBox);
  toDoItem.appendChild(toDoText);
  toDoItem.appendChild(trash);
 
  if (completed) {
      toDoItem.classList.add("completed");
  }

  toDoList.appendChild(toDoItem);
  checkBox.addEventListener("click", toBeCompleted);
  trash.addEventListener("click", removeToDoItem);
}

function addToDoItem(){
  var itemText = toDoEntryBox.value;
  if(itemText !== ''){
    newToDoItem(itemText, false);
  } 
}
addButton.addEventListener("click", addToDoItem);



function clearCompletedToDoItems() {
    var completedItems = toDoList.getElementsByClassName("completed");
    for (var i = completedItems.length; i > 0 ; i--) {
        completedItems.item(0).remove();
    }
}
clearCompletedButton.addEventListener("click", clearCompletedToDoItems);


function emptyList(){
  var toDoItems = toDoList.children;
  for (var i = toDoItems .length; i > 0 ; i--) {
    toDoItems.item(0).remove();
  }
}
emptyButton.addEventListener("click", emptyList);



function saveList(){
   var toDos = [];
   var i =0;

  while (i < toDoList.children.length) {
      var toDo = toDoList.children.item(i);
      var toDoString = toDo.innerText;
      toDoString = toDoString.substring(0, toDoString.length-1); 

      var toDoInfo = {
          "task": toDoString,
          "completed": toDo.classList.contains("completed")
      };

      toDos.push(toDoInfo);
      i++;
  }

  localStorage.setItem("toDos", JSON.stringify(toDos));
}

saveButton.addEventListener("click", saveList);



function loadList() {
    if (localStorage.getItem("toDos") !== null) {
        var toDos = JSON.parse(localStorage.getItem("toDos"));

        for (var i = 0; i < toDos.length; i++) {
            var toDo = toDos[i];
            newToDoItem(toDo.task, toDo.completed);
        }
    }
}

loadList();