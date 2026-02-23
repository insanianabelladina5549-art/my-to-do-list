let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = task.text;

    const taskDate = document.createElement("span");
    taskDate.textContent = task.date;
    taskDate.classList.add("date");

    if (task.completed) {
      taskText.classList.add("completed");
    }

    taskText.onclick = () => toggleTask(index);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTask(index);
    };

    li.appendChild(taskText);
    li.appendChild(taskDate);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  if (input.value.trim() === "") return;

  const now = new Date();
  const formattedDate = now.toLocaleString();

  tasks.push({
    text: input.value,
    completed: false,
    date: formattedDate
  });

  input.value = "";
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function deleteAll() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

renderTasks();