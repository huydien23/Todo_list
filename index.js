var input = document.querySelector('input');
var button = document.querySelector('button');
var form = document.querySelector('form');
var todo = document.querySelector('.todo');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    let val = input.value.trim();
    if (val) {
        addTodoElement({
            text: val,
        })
        saveTodoList();
    }
    input.value = '';
});

function addTodoElement(todo) {
    var li = document.createElement('li');
    li.innerHTML = `
        <span>${todo.text}</span>
        <i class="fas fa-trash-alt"></i>
    `;
    if (todo.status === 'completed') {
        li.setAttribute('class', 'completed');
    }
    var todoList = document.getElementById('todoList');
    li.addEventListener('click', function(){
        this.classList.toggle('completed');
        saveTodoList();
    })
    li.querySelector('i').addEventListener('click', function() {
        this.parentElement.remove();
        saveTodoList();
    });
    todoList.appendChild(li); 
}

function saveTodoList() {
    let todoList = document.querySelectorAll('li');
    let todoStorage = [];
    todoList.forEach(function(item){
        let text = item.querySelector('span').innerText;
        let status = item.getAttribute('class');

        todoStorage.push({
            text,
            status
        });
    })
    localStorage.setItem('todoList', JSON.stringify(todoStorage));
}

function init(){
    let data = localStorage.getItem('todoList');
    if (data) { // Kiểm tra xem dữ liệu có tồn tại trong localStorage không
        try {
            data = JSON.parse(data); 
            data.forEach(function(item){
                addTodoElement(item);
            });
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
            // Xử lý lỗi, có thể xóa localStorage hoặc hiển thị thông báo
        }
    }
}

init();