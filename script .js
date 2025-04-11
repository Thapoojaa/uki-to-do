document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector(".add-btn");
  const clearButton = document.querySelector(".clear-btn");

  addButton.addEventListener("click", addTask);
  clearButton.addEventListener("click", clearAllTasks);

  // Load saved tasks
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => renderTask(task.text, task.type));
  updateTaskCount();
});

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  const taskType = document.getElementById("taskType").value;

  if (taskText === "") return;

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push({ text: taskText, type: taskType });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTask(taskText, taskType);
  input.value = "";
  updateTaskCount();
}

function renderTask(text, type) {
  const li = document.createElement("li");
  li.className = `task ${type}`;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.onchange = () => {
    li.style.opacity = "0";
    li.style.transform = "translateY(-20px)";
    setTimeout(() => {
      li.remove();
      removeTaskFromStorage(text);
      updateTaskCount();
    }, 300);
  };

  const emoji = document.createElement("span");
  emoji.className = "task-emoji";
  emoji.textContent = type === "Urgent" ? "🔴" : type === "Work" ? "🟡" : "🟢";

  const span = document.createElement("span");
  span.textContent = text;

  const textDiv = document.createElement("div");
  textDiv.className = "task-text";
  textDiv.appendChild(emoji);
  textDiv.appendChild(span);

  li.appendChild(textDiv);
  li.appendChild(checkbox);
  document.getElementById("taskList").appendChild(li);

  // Animate appearance
  requestAnimationFrame(() => {
    li.style.opacity = "1";
    li.style.transform = "translateY(0)";
  });
}

function updateTaskCount() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  document.getElementById("taskCount").textContent = `Tasks to complete: ${tasks.length}`;
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
    taskList.removeChild(taskList.firstChild);
  }
  updateTaskCount();
}
