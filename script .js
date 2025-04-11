// Load tasks from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

function addTask() {
  const taskName = document.getElementById('taskInput').value.trim();
  const priority = document.getElementById('priorityDropdown').value;
  const color = document.getElementById('colorDropdown').value; // Added from other branch

  if (!taskName || !priority) {
    alert('Please enter a task and select a priority.');
    return;
  }

  const task = {
    id: Date.now(),
    name: taskName,
    priority: priority,
    color: color || '#fff', // Default to white if no color, from other branch
    completed: false
  };

  // Create task element
  appendTaskToList(task);

  // Save to local storage
  saveTask(task);

  // Clear inputs
  document.getElementById('taskInput').value = '';
  document.getElementById('priorityDropdown').value = '';
  document.getElementById('colorDropdown').value = ''; // Clear color input

  updateTaskStats();
}

function appendTaskToList(task) {
  const list = document.getElementById('checkboxList');
  const taskItem = document.createElement('div');
  taskItem.classList.add('task-item', task.priority);
  if (task.completed) {
    taskItem.classList.add('completed');
  }

  const label = document.createElement('label');
  label.style.color = task.color; // Apply color from other branch
  label.style.fontSize = '20px'; // From other branch for better visibility
  label.style.marginBottom = '10px'; // From other branch for spacing
  label.innerHTML = `
    <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTaskCompletion(${task.id}, this.checked)">
    ${task.name}
  `;

  taskItem.appendChild(label);
  taskItem.innerHTML += `
    <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
  `;

  list.appendChild(taskItem);
}

function saveTask(task) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => appendTaskToList(task));
  updateTaskStats();
}

function toggleTaskCompletion(taskId, isChecked) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.map(task => {
    if (task.id === taskId) {
      task.completed = isChecked;
    }
    return task;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  refreshTaskList();
}

function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  refreshTaskList();
}

function clearAllTasks() {
  if (confirm('Are you sure you want to delete all tasks?')) {
    localStorage.removeItem('tasks');
    refreshTaskList();
  }
}

function refreshTaskList() {
  const list = document.getElementById('checkboxList');
  list.innerHTML = '';
  loadTasks();
}

function updateTaskStats() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;

  document.getElementById('totalTasks').textContent = `Total Tasks: ${totalTasks}`;
  document.getElementById('completedTasks').textContent = `Completed: ${completedTasks}`;
}