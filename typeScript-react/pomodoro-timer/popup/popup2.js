// Define an array to store task objects {id, text}
let tasksArray = [];

chrome.storage.sync.get(["tasks"], (res) => {
  tasksArray = res.tasks ? res.tasks : [];
  renderTasks();
});

// Function to add a new task
function addTask() {
  const taskId = tasksArray.length;
  tasksArray.push({ id: taskId, text: "" });

  // Render the new task
  renderTask(taskId);
}

function saveTasks() {
  chrome.storage.sync.set({
    tasks: tasksArray,
  });
}

// Function to delete a task
function deleteTask(taskId) {
  // Find the task index in the array based on its ID
  const taskIndex = tasksArray.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    // Remove the task object from the array
    tasksArray.splice(taskIndex, 1);

    // Render all tasks after deletion
    console.log("tasksArray after deletd", tasksArray);
    renderTasks();
  }
}

function renderTask(taskId) {
  const taskContainer = document.createElement("div");
  taskContainer.classList.add("task-container");

  const taskIndex = tasksArray.findIndex((task) => task.id === taskId);
  const taskText = tasksArray[taskIndex]?.text || "";

  const taskInput = createTaskInput(taskText);
  const taskContent = createTaskContent(taskText);

  const saveBtn = createButton("Save", "save-btn", "fas fa-save", () =>
    handleSave(taskId)
  );
  const reminderBtn = createButton(
    "Reminder",
    "reminder-btn",
    "fa-solid fa-bell",
    () => handleReminder(taskId)
  );
  const deleteBtn = createButton("Delete", "delete-btn", "fas fa-trash", () =>
    handleDelete(taskId)
  );

  updateVisibility();

  taskContent.addEventListener("click", () => {
    updateVisibility(false);
  });

  taskContainer.append(taskInput, saveBtn, reminderBtn, deleteBtn, taskContent);
  document.getElementById("taskList").appendChild(taskContainer);

  function createTaskInput(value) {
    const input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.classList.add("task-input");
    input.placeholder = "Enter task";
    input.addEventListener("input", () => {
      tasksArray[taskIndex].text = input.value;
      taskContent.textContent = input.value;
      saveTasks();
    });
    return input;
  }

  function createTaskContent(value) {
    const content = document.createElement("div");
    content.classList.add("task-content");
    content.textContent = value;
    content.style.display = "none";
    return content;
  }

  function handleSave(id) {
    if (taskInput.value.trim().length === 0) {
      alert("Task content cannot be empty. Please enter a task.");
    } else {
      console.log(`Task ${id} saved: ${taskInput.value}`);
      saveTasks();
      updateVisibility(true);
    }
  }

  function handleReminder(id) {
    console.log(`Editing task ${id}`);
    updateVisibility(false);
  }

  function handleDelete(id) {
    deleteTask(id);
    taskContainer.remove();
    saveTasks();
    console.log("Deleted task", id);
    updateVisibility(false);
  }

  function updateVisibility(showContent = taskText.length == 0 ? false : true) {
    taskInput.style.display = showContent ? "none" : "block";
    taskContent.style.display = showContent ? "block" : "none";
    saveBtn.style.display = showContent ? "none" : "block";
    reminderBtn.style.display = showContent ? "none" : "block";
    deleteBtn.style.display = showContent ? "none" : "block";
  }
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
