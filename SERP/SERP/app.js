document.getElementById('formTask').addEventListener('submit', saveTask);

function saveTask(e) {
  let id_product = document.getElementById('id_product').value;
  let name = document.getElementById('name').value;
  let price_retail = document.getElementById('price_retail').value;
  console.log(name)

  let task = {
    id_product,
    name,
    price_retail
  };

  if(localStorage.getItem('tasks') === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  getTasks();
  document.getElementById('formTask').reset();
  e.preventDefault();
}

function deleteTask(id_product) {
  console.log(id_product)
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].id_product == id_product) {
      tasks.splice(i, 1);
    }
  }
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
  getTasks();
}

function getTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  for(let i = 0; i < tasks.length; i++) {
    let id_product = tasks[i].id_product;
    let name = tasks[i].name;
    let price_retail = tasks[i].price_retail;

    tasksView.innerHTML += `<div class="card mb-3">
        <div class="card-body">
          <p>${id_product} - ${name} - $${price_retail}
          <a href="#" onclick="deleteTask('${id_product}')" class="btn btn-danger ml-5">Delete</a>
          </p>
        </div>
      </div>`;
  }
}

getTasks();
