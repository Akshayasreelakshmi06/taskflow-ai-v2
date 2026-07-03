let taskList = document.getElementById("taskList");

// Load tasks when page opens
window.onload = function () {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    savedTasks.forEach(task => {
        createTask(task);
    });
};
function addTask() {
    let input = document.getElementById("taskInput");
    let dateInput = document.getElementById("taskDate");

    let taskText = input.value;
    let taskDate = dateInput.value;

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    createTask(taskText, taskDate);

    input.value = "";
    dateInput.value = "";

    updateProgress();
}
document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
function createTask(taskText, taskDate) {
    let li = document.createElement("li");

    li.innerHTML = `
        <span onclick="toggleComplete(this)">
            ${taskText} ${taskDate ? " - 📅 " + taskDate : ""}
        </span>

        <div>
            <button onclick="editTask(this)">✏️</button>
            <button onclick="deleteTask(this)">❌</button>
        </div>
    `;

    taskList.appendChild(li);
}
function editTask(button) {
    let span = button.parentElement.previousElementSibling;

    let newTask = prompt("Edit your task:", span.innerText);

    if (newTask !== null && newTask.trim() !== "") {
        span.innerText = newTask;
    }
}

function deleteTask(button) {
    let li = button.parentElement;
    let taskText = li.querySelector("span").innerText;

    li.remove();
    removeTask(taskText);
     updateProgress();
}

function toggleComplete(span) {
    span.classList.toggle("completed");
     updateProgress();
}

// Save task
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task
function removeTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function showMessage() {
    alert("Welcome to TaskFlow AI!");
}
function updateProgress() {
    let totalTasks = document.querySelectorAll("#taskList li").length;
    let completedTasks = document.querySelectorAll(".completed").length;

    let percentage = 0;

    if (totalTasks > 0) {
        percentage = (completedTasks / totalTasks) * 100;
    }

    document.getElementById("progressBar").value = percentage;
    document.getElementById("progressText").innerText =
        Math.round(percentage) + "% Completed";
       document.getElementById("totalTasks").innerText = totalTasks;

document.getElementById("completedTasks").innerText = completedTasks;

document.getElementById("pendingTasks").innerText = totalTasks - completedTasks; 
}
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
function searchTask() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        let text = task.innerText.toLowerCase();

        if (text.includes(input)) {
            task.style.display = "";
        } else {
            task.style.display = "none";
        }
    });
}