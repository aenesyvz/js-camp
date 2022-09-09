const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const clearButton = document.querySelector("#clear-todos");
const filter = document.querySelector("#filter");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];

eventListeners();


function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
    if(confirm("Tümünü silmek istediğinize emin misiniz ?")){
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
} 

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group");
    
    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLocaleLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style","display : none  !important");
        }
        else{
            listItem.setAttribute("style","display : block");
        }
    });
} 

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1000);
}
function addTodo(e){
    const newTodo = todoInput.value.trim();

    if(newTodo === ""){
        showAlert("danger","Lütfen bir todo giriniz...");
    }
    else{
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success","Todo başarıyla eklendi...");
    }

    e.preventDefault();
}


function addTodoToUI(newTodo){
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className =  "list-group-item d-flex justify-content-between";
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);


    todoList.appendChild(listItem);
    todoInput.value = "";
}

function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage();
    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
}


function getTodosFromStorage(){
    let todos;

    if(localStorage.getItem("todos") === nulll){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo başarıyla silindi...");
    }
}

function deleteTodoFromStorage(deleteTodo){
    let todos = getTodosFromStorage();
    
    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1);
        }
    });

    localStorage.setItem("todos",JSON.stringify(todos));
}

