const todoForm = document.querySelector(".js-toDoForm");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".js-toDoList");

let toDos = [];

function savetoDos() {
  localStorage.setItem("toDos", JSON.stringify(toDos));
}
function loadToDos() {
  const loadedToDos = localStorage.getItem("toDos");
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    toDos = parsedToDos;
  }
  paintToDoList();
}

function paintToDoList() {
  toDos.forEach(function(element, index, arr) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const delBtn = document.createElement("button");
    const id = element.id;

    span.innerText = element.text;
    delBtn.innerText = "X";
    span.classList.add("toDoSpan");

    li.appendChild(span);
    li.appendChild(delBtn);
    delBtn.classList.add("delBtn");
    li.id = id;

    li.classList.add("toDoBox");

    todoList.appendChild(li);

    delBtn.addEventListener("click", handleClick);
  });
}

function addToDoList(value) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const id = +new Date();

  span.innerText = value;
  delBtn.innerText = "X";
  span.classList.add("toDoSpan");

  li.appendChild(span);
  li.appendChild(delBtn);
  delBtn.classList.add("delBtn");

  li.id = id;
  li.classList.add("toDoBox");

  todoList.appendChild(li);

  delBtn.addEventListener("click", handleClick);

  const toDoObj = {
    text: value,
    id: id
  };

  toDos.push(toDoObj);
  savetoDos();
}

function handleClick(event) {
  const li = event.target.parentNode;

  toDos.forEach(element => {
    if (element.id === parseInt(li.id)) {
      li.parentNode.removeChild(li);
      return;
    }
  });

  toDos = toDos.filter(element => {
    return element.id !== parseInt(li.id);
  });

  savetoDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const inputValue = todoInput.value;
  if (inputValue !== "") {
    addToDoList(inputValue);
  }
  todoInput.value = "";
}

function init() {
  loadToDos();
  console.log(toDos);
  todoForm.addEventListener("submit", handleSubmit);
}

init();
