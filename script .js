window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.type));
  updateTaskCount();
};

function addTask() {
  const input = document.getElementById("taskInput");
  const type = document.getElementById("taskType").value;
  const taskText = input.value.trim();

  if (taskText === "") return;

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Prevent duplicate tasks
  if (tasks.some(task => task.text === taskText)) {
    alert("Task already exists!");
    return;
  }

  tasks.push({ text: taskText, type: type });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTask(taskText, type);
  updateTaskCount();
  input.value = "";
}

function renderTask(text, type) {
  const li = document.createElement("li");
  li.className = `task ${type}`;
  li.style.opacity = "0";
  li.style.transform = "translateY(20px)";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = function () {
    if (checkbox.checked) {
      li.style.opacity = "0";
      li.style.transform = "translateY(-20px)";
      setTimeout(() => {
        li.remove();
        removeTaskFromStorage(text);
        updateTaskCount();
      }, 300);
    }
  };

  const span = document.createElement("span");
  span.textContent = text;

  const emoji = document.createElement("span");
  emoji.className = "task-emoji";
  emoji.textContent = type === "Urgent" ? "🔴" : type === "Work" ? "🟡" : "🟢";

  const taskTextDiv = document.createElement("div");
  taskTextDiv.className = "task-text";
  taskTextDiv.appendChild(emoji);
  taskTextDiv.appendChild(span);

  li.appendChild(taskTextDiv);
  li.appendChild(checkbox);
  document.getElementById("taskList").appendChild(li);

  // Animate appearance
  setTimeout(() => {
    li.style.opacity = "1";
    li.style.transform = "translateY(0)";
  }, 10);
}

function removeTaskFromStorage(text) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => task.text !== text);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearAllTasks() {
  localStorage.removeItem("tasks");
  const taskList = document.getElementById("taskList");
  while (taskList.firstChild) {
    taskList.firstChild.style.opacity = "0";
    taskList.firstChild.style.transform = "translateY(-20px)";
    setTimeout(() => taskList.removeChild(taskList.firstChild), 300);
  }
  updateTaskCount();
}

function updateTaskCount() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const counter = document.getElementById("taskCount");
  counter.textContent = `Tasks to complete: ${tasks.length}`;
}
