let tasksArray = [];
let reminderPopup;
let overlay;

chrome.storage.sync.get(["tasks"], (res) => {
  tasksArray = res.tasks ? res.tasks : [];
  renderTasks();
});

function saveTasks() {
  // Save tasks to storage
  chrome.storage.sync.set({
    tasks: tasksArray,
  });
}

function addTask() {
  const taskId =
    Date.now() + Math.floor(Math.random() * 1000) * tasksArray.length;
  tasksArray.push({ id: taskId, text: "", reminder: false, reminderTime: 5 });
  console.log("tasksArray", tasksArray);
  renderTask(taskId);
}

function deleteTask(taskId) {
  tasksArray = tasksArray.filter((task) => task.id !== taskId);
  renderTasks();
}

function createTaskInput(value, taskIndex, taskContent) {
  const input = createInput("text", "task-input", "Enter task", value);
  input.addEventListener("input", () => {
    tasksArray[taskIndex].text = input.value;
    taskContent.textContent = input.value;
    saveTasks();
  });
  return input;
}

function createTaskContent(value) {
  const content = createElement("div", "task-content", value);
  content.style.display = "none";
  return content;
}

function handleSave(id, taskIndex, taskInput, taskContent) {
  if (taskInput.value.trim().length === 0) {
    alert("Task content cannot be empty. Please enter a task.");
    updateVisibility(false, taskInput, taskContent);
  } else {
    console.log(`Task ${id} saved: ${taskInput.value}`);
    saveTasks();
    return true;
  }
  return false;
}
function handleReminder(id, taskInput, taskContent) {
  // Toggle the visibility of the overlay and reminder popup
  const overlay = document.getElementById("overlay");
  const taskElement = document.getElementById("taskContent");
  const timeInput = document.getElementById("time-input");
  const saveBtnElement = document.getElementById("reminder-saveBtn");
  console.log(`Editing task ${id}`);
  // Find the task index in the array based on its ID
  const taskIndex = tasksArray.findIndex((task) => task.id === id);
  console.log("taskIndex", taskIndex);
  let reminderTime = 0;
  if (taskIndex !== -1) {
    reminderTime = tasksArray[taskIndex].reminderTime;
  }

  overlay.style.display = "block";
  console.log("taskContent", taskContent);
  taskElement.textContent = taskContent.textContent;
  timeInput.value = reminderTime;

  timeInput.addEventListener("change", (event) => {
    const value = event.target.value;
    if (value < 1 || value > 60) {
      // handleReminderSave(taskIndex, value);
      timeInput.value = reminderTime;
    }
  });

  saveBtnElement.addEventListener("click", () => {
    overlay.style.display = "none";
    const value = timeInput.value;
    handleReminderSave(taskIndex, value);
  });
}

function handleReminderSave(taskIndex, value) {
  // Update the reminderTime in the array
  console.log("tasksArray[taskIndex].reminderTime", taskIndex);
  tasksArray[taskIndex].reminderTime = parseInt(value);
  console.log("tasksArray after updating reminderTime", tasksArray);
  // You may want to save the tasksArray to storage here if needed
  saveTasks();
}

function handleDelete(id, taskContainer) {
  deleteTask(id);
  taskContainer.remove();
  saveTasks();
  console.log("Deleted task", id);
}

function updateVisibility(showContent, taskInput, taskContent, ...buttons) {
  taskInput.style.display = showContent ? "none" : "block";
  taskContent.style.display = showContent ? "block" : "none";

  buttons.forEach((button) => {
    if (button) {
      button.style.display = showContent ? "none" : "block";
    }
  });
}

function renderTask(taskId) {
  const taskContainer = createElement("div", "task-container");
  const taskIndex = tasksArray.findIndex((task) => task.id === taskId);
  const taskText = tasksArray[taskIndex]?.text || "";
  const taskContent = createTaskContent(taskText);
  const taskInput = createTaskInput(taskText, taskIndex, taskContent);
  const saveBtn = createButton("Save", "save-btn", "fas fa-save", () => {
    const savedSuccess = handleSave(taskId, taskIndex, taskInput, taskContent);
    handleVisibility(savedSuccess, taskInput, taskContent);
  });
  const reminderBtn = createButton(
    "Reminder",
    "reminder-btn",
    "fa-solid fa-bell",
    () => {
      handleReminder(taskId, taskInput, taskContent);
      // handleVisibility(true);
      // saveTasks();
    }
  );

  // reminderBtn.addEventListener("click", () => {
  //   handleReminder(taskId, taskInput, taskContent);
  // });

  const deleteBtn = createButton("Delete", "delete-btn", "fas fa-trash", () => {
    handleDelete(taskId, taskContainer);
  });

  taskContent.addEventListener("click", () => {
    updateVisibility(
      false,
      taskInput,
      taskContent,
      saveBtn,
      reminderBtn,
      deleteBtn
    );
  });

  function handleVisibility(visibility) {
    updateVisibility(
      visibility,
      taskInput,
      taskContent,
      saveBtn,
      reminderBtn,
      deleteBtn
    );
  }

  updateVisibility(
    taskText.length !== 0,
    taskInput,
    taskContent,
    saveBtn,
    reminderBtn,
    deleteBtn
  );

  taskContainer.append(taskInput, saveBtn, reminderBtn, deleteBtn, taskContent);
  document.getElementById("taskList").appendChild(taskContainer);
}

function createElement(tag, className, textContent) {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.textContent = textContent || "";
  return element;
}

function createInput(type, className, placeholder, value) {
  const input = createElement("input", className);
  input.type = type;
  input.placeholder = placeholder;
  input.value = value || "";
  return input;
}

function createButton(text, className, iconClass, onClickCallback) {
  const button = createElement("button", className, text);
  button.innerHTML = `<i class="${iconClass}"></i>`;
  button.addEventListener("click", onClickCallback);
  return button;
}

function renderTasks() {
  document.getElementById("taskList").innerHTML = "";
  tasksArray.forEach((task) => renderTask(task.id));
}

const addTaskBtn = document.getElementById("addTask");
addTaskBtn.addEventListener("click", addTask);

window.addEventListener("load", renderTasks);
