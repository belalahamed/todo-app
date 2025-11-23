// Selecting DOM Elements
const todoInput = document.querySelector(".todo-input");
const addBtn = document.querySelector(".add-btn");
const todoList = document.querySelector(".todo-list");

// Getting saved todos from Local storage
const savedTodos = localStorage.getItem("todos");
const todos = savedTodos ? JSON.parse(savedTodos) : [];

// Saving todos to local storage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Creating Todo list Item Node
function createToDoItemNode(todo, index) {
  const isTodoCompleted = todo.isCompleted;
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = isTodoCompleted;
  li.prepend(checkbox);

  const todoText = document.createElement("span");
  todoText.innerText = todo.content;
  li.appendChild(todoText);

  if (isTodoCompleted) {
    todoText.style.textDecoration = "line-through";
  }

  // Checking todo completed or not
  checkbox.addEventListener("change", () => {
    todo.isCompleted = checkbox.checked;
    if (isTodoCompleted) {
      todoText.style.textDecoration = "line-through";
    }
    saveTodos();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "X";
  li.append(deleteBtn);

  // Deleting todo item
  deleteBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    renderToDoList();
    saveTodos();
  });

  // Editing existing todo item content
  todoText.addEventListener("dblclick", () => {
    const editedtodoTextContent = prompt("Edit todo");
    if(!editedtodoTextContent) {
        return;
    }
    todo.content = editedtodoTextContent;
    renderToDoList();
    saveTodos();
  })

  return li;
}

//Rendering todos
function renderToDoList() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const todoItem = createToDoItemNode(todo, index);
    todoList.appendChild(todoItem);
  });
}

//Add Task
function addToDo() {
  const todoTextContent = todoInput.value;

  if (!todoTextContent) {
    alert("Write Something!!");
    return;
  }

  const todo = {
    content: todoTextContent,
    isCompleted: false,
  };

  todos.push(todo);
  todoInput.value = "";
  renderToDoList();
  saveTodos();
}

// Add task listener
addBtn.addEventListener("click", addToDo);

// Add task by entering listener
todoInput.addEventListener("keydown", (e) => {
    if(e.key == "Enter") {
        addToDo();
    }
})

renderToDoList();
