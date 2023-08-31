document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDateInput");
    const priorityInput = document.getElementById("priorityInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const clearBtn = document.getElementById("clearBtn");

    let tasks = [];

    function saveTasksToLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromLocalStorage() {
        const tasksData = localStorage.getItem("tasks");
        if (tasksData) {
            tasks = JSON.parse(tasksData);
            tasks.forEach(task => addTaskToDOM(task));
        }
    }

    function addTaskToDOM(task) {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <div class="task-content">
                <p>${task.text}</p>
                <p>Due: ${task.dueDate}</p>
                <p>Priority: ${task.priority}</p>
            </div>
            <button class="complete-btn">Complete</button>
        `;
        taskList.appendChild(taskItem);
    }

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const dueDate = dueDateInput.value;
            const priority = priorityInput.value;
            const task = { text: taskText, dueDate, priority, completed: false };
            tasks.push(task);
            addTaskToDOM(task);
            saveTasksToLocalStorage();
            taskInput.value = "";
            dueDateInput.value = "";
            priorityInput.value = "low";
        }
    });

    taskList.addEventListener("click", function(event) {
        if (event.target.classList.contains("complete-btn")) {
            const taskItem = event.target.closest("li");
            const taskIndex = Array.from(taskList.children).indexOf(taskItem);
            tasks[taskIndex].completed = true;
            taskItem.classList.add("completed");
            saveTasksToLocalStorage();
        }
    });

    clearBtn.addEventListener("click", function() {
        taskList.innerHTML = "";
        tasks = [];
        localStorage.removeItem("tasks");
    });

    loadTasksFromLocalStorage();
});
