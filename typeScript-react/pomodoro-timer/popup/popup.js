// Define an array to store task objects {id, text}
const tasksArray = [];

// Function to add a new task
function addTask() {
  const taskId = tasksArray.length;
  tasksArray.push({ id: taskId, text: "" });

  // Render the new task
  renderTask(taskId);
}

// Function to delete a task
function deleteTask(taskId) {
  // Find the task index in the array based on its ID
  const taskIndex = tasksArray.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    // Remove the task object from the array
    tasksArray.splice(taskIndex, 1);

    // Render all tasks after deletion
    renderTasks();
  }
}

function renderTask(taskId) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  const taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.value = tasksArray[taskId].text;
  taskInput.classList.add("task-input");
  taskInput.placeholder = "Enter task";

  // Create a div to hold the task content
  const taskContent = document.createElement("div");
  taskContent.classList.add("task-content");
  taskContent.textContent = tasksArray[taskId].text;

  // Initially hide the task content
  taskContent.style.display = "none";

  // Event listener for input changes in the task input field
  taskInput.addEventListener("input", () => {
    // Update the task text in the array based on its ID
    const taskIndex = tasksArray.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasksArray[taskIndex].text = taskInput.value;
      // Update the task content div
      taskContent.textContent = taskInput.value;
    }

    // Example: Log the tasks array when needed
    console.log(tasksArray);
  });

  const saveBtn = createButton("Save", "save-btn", "fas fa-save", () => {
    if (taskInput.value.trim().length === 0) {
      alert("Task content cannot be empty. Please enter a task.");
    } else {
      console.log(`Task ${taskId} saved: ${taskInput.value}`);
      // Hide buttons, show task content
      toggleButtonsAndContent(true);
    }
  });

  const reminderBtn = createButton(
    "Reminder",
    "reminder-btn",
    "fa-solid fa-bell",
    () => {
      console.log(`Editing task ${taskId}`);
      // Show buttons, hide task content
      toggleButtonsAndContent(false);
    }
  );

  const deleteBtn = createButton("Delete", "delete-btn", "fas fa-trash", () => {
    taskContainer.remove();
    deleteTask(taskId);
    toggleButtonsAndContent(true);
  });

  // Toggle visibility of buttons and task content
  function toggleButtonsAndContent(showContent) {
    if (showContent) {
      taskContent.style.display = "block";
      taskInput.style.display = "none";
      saveBtn.style.display = "none";
      reminderBtn.style.display = "none";
      deleteBtn.style.display = "none";
    } else {
      taskContent.style.display = "none";
      taskInput.style.display = "block";
      saveBtn.style.display = "block";
      reminderBtn.style.display = "block";
      deleteBtn.style.display = "block";
    }
  }

  // Event listener to toggle visibility when clicking the task content
  taskContent.addEventListener("click", () => {
    toggleButtonsAndContent(false);
  });

  taskContainer.appendChild(taskInput);
  taskContainer.appendChild(saveBtn);
  taskContainer.appendChild(reminderBtn);
  taskContainer.appendChild(deleteBtn);
  taskContainer.appendChild(taskContent);

  // Find the content area and append the new task container
  const contentArea = document.getElementById("taskList");
  contentArea.appendChild(taskContainer);
}

// Helper function to create buttons
function createButton(text, className, iconClass, onClickCallback) {
  const button = document.createElement("button");
  button.classList.add(className);
  button.innerHTML = `<i class="${iconClass}"></i> ${text}`;
  button.addEventListener("click", onClickCallback);
  return button;
}

// Function to render all tasks
function renderTasks() {
  // Clear the content area before rendering tasks
  const contentArea = document.getElementById("taskList");
  contentArea.innerHTML = "";

  // Render each task
  tasksArray.forEach((task) => {
    renderTask(task.id);
  });
}

// Add event listener for the "Add Task" button
const addTaskBtn = document.getElementById("addTask");
addTaskBtn.addEventListener("click", addTask);

// Render tasks on page load
window.addEventListener("load", renderTasks);
