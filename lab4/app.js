"use strict";
const input = document.getElementById("taskInput");
const addButton = document.getElementById("add");
const taskList = document.getElementById("tasks");
const count = document.getElementById("count");
let filter = "all";
function updateCount() {
    let remaining = 0;
    for (let i = 0; i < taskList.children.length; i++) {
        const task = taskList.children[i];
        if (!task.classList.contains("completed")) {
            remaining++;
        }
    }
    count.textContent = remaining + " items left";
}
function addTask() {
    const text = input.value.trim();
    if (text === "") {
        return;
    }
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    const span = document.createElement("span");
    const deleteButton = document.createElement("button");
    checkbox.type = "checkbox";
    span.textContent = text;
    deleteButton.textContent = "Delete";
    checkbox.addEventListener("change", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCount();
        showTasks();
    });
    span.addEventListener("dblclick", function () {
        const newText = prompt("Edit task:", span.textContent || "");
        if (newText !== null && newText.trim() !== "") {
            span.textContent = newText.trim();
        }
    });
    deleteButton.addEventListener("click", function () {
        li.remove();
        updateCount();
    });
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    input.value = "";
    updateCount();
    showTasks();
}
function showTasks() {
    for (let i = 0; i < taskList.children.length; i++) {
        const task = taskList.children[i];
        const isCompleted = task.classList.contains("completed");
        if (filter === "active" && isCompleted) {
            task.style.display = "none";
        }
        else if (filter === "completed" && !isCompleted) {
            task.style.display = "none";
        }
        else {
            task.style.display = "list-item";
        }
    }
}
addButton.addEventListener("click", addTask);
input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
document.getElementById("all").addEventListener("click", function () {
    filter = "all";
    showTasks();
});
document.getElementById("active").addEventListener("click", function () {
    filter = "active";
    showTasks();
});
document.getElementById("completed").addEventListener("click", function () {
    filter = "completed";
    showTasks();
});
document.getElementById("clearCompleted").addEventListener("click", function () {
    for (let i = taskList.children.length - 1; i >= 0; i--) {
        const task = taskList.children[i];
        if (task.classList.contains("completed")) {
            task.remove();
        }
    }
    updateCount();
});
document.getElementById("clearAll").addEventListener("click", function () {
    taskList.innerHTML = "";
    updateCount();
});
