// Select DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');
const emptyState = document.getElementById('emptyState');

// Array to store task objects
let tasks = [];

// Function to update the UI
function renderTasks() {
  // Clear the task list container HTML
  taskList.innerHTML = '';

  // Show empty state if no tasks exist
  if (tasks.length === 0) {
    taskList.innerHTML = `
      <div id="emptyState" class="text-center py-4">
        <p class="text-muted small mb-0">No tasks yet. Add your first task!</p>
      </div>
    `;
    taskCounter.textContent = '0 remaining';
    return;
  }

  // Loop through tasks array and generate Bootstrap list items
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('div');
    taskItem.className = 'd-flex align-items-center justify-content-between p-2 border-bottom';
    
    taskItem.innerHTML = `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''} onclick="toggleTask(${index})">
        <label class="form-check-label ${task.completed ? 'text-decoration-line-through text-muted' : ''}" for="task-${index}">
          ${task.text}
        </label>
      </div>
      <button class="btn btn-outline-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
    `;
    
    taskList.appendChild(taskItem);
  });

  // Update remaining task counter
  const remainingCount = tasks.filter(task => !task.completed).length;
  taskCounter.textContent = `${remainingCount} remaining`;
}

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  // Validate that input is not empty
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  // Push new task object into array
  tasks.push({
    text: taskText,
    completed: false
  });

  // Clear the input field after successful addition[cite: 2]
  taskInput.value = '';

  // Re-render the task list UI
  renderTasks();
}

// Function to toggle task completion status
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

// Function to delete a specific task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Event listener for the "Add Task" button click
addTaskBtn.addEventListener('click', addTask);

// Event listener to allow pressing "Enter" key to add task
taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    addTask();
  }
});