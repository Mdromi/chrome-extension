let tasksArray = [];

function saveTasks() {
  // Save tasks to storage
  // (You can reintegrate chrome.storage.sync.set if needed)
}

function addTask() {
  const taskId = tasksArray.length;
  tasksArray.push({ id: taskId, text: "" });
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
  } else {
    console.log(`Task ${id} saved: ${taskInput.value}`);
    saveTasks();
    // updateVisibility(true, taskInput, taskContent);
    return true;
  }
  return false;
}

function handleReminder(id, taskInput, taskContent) {
  console.log(`Editing task ${id}`);
  updateVisibility(false, taskInput, taskContent);
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
    () => handleReminder(taskId, taskInput, taskContent)
  );
  const deleteBtn = createButton("Delete", "delete-btn", "fas fa-trash", () => {
    handleDelete(taskId, taskContainer);
    // handleVisibility();
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

  function handleVisibility() {
    updateVisibility(
      true,
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
