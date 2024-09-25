var tasks = [];
// Function to add a task
function addTask() {
    var taskNameInput = document.getElementById('taskName');
    var taskPrioritySelect = document.getElementById('taskPriority');
    var taskTypeSelect = document.getElementById('taskType');
    var taskName = taskNameInput.value;
    var taskPriority = taskPrioritySelect.value;
    var taskType = taskTypeSelect.value;
    if (taskName === "") {
        alert("Task name cannot be empty");
        return;
    }
    var newTask = {
        name: taskName,
        status: 'Pending',
        priority: taskPriority,
        type: taskType
    };
    tasks.push(newTask);
    renderTasks();
    clearForm();
}
// Function to delete a task by index
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}
// Function to toggle task status (Pending <-> Completed)
function changeStatus(index) {
    tasks[index].status = tasks[index].status === 'Pending' ? 'Completed' : 'Pending';
    renderTasks();
}
// Function to render the tasks in the table
function renderTasks() {
    var taskTable = document.getElementById('taskTable');
    taskTable.innerHTML = "";
    tasks.forEach(function (task, index) {
        var row = "\n            <tr>\n                <td>".concat(task.name, "</td>\n                <td><button onclick=\"changeStatus(").concat(index, ")\">").concat(task.status, "</button></td>\n                <td>").concat(task.priority, "</td>\n                <td>").concat(task.type, "</td>\n                <td><button onclick=\"deleteTask(").concat(index, ")\">Delete</button></td>\n            </tr>\n        ");
        taskTable.innerHTML += row;
    });
}
// Function to clear the input fields after adding a task
function clearForm() {
    var taskNameInput = document.getElementById('taskName');
    taskNameInput.value = '';
}
// Function to sort tasks based on the selected criteria
function sortTasks() {
    var sortTypeSelect = document.getElementById('sortType');
    var sortType = sortTypeSelect.value;
    if (sortType === 'type') {
        tasks.sort(function (a, b) { return a.type.localeCompare(b.type); });
    }
    else if (sortType === 'priority') {
        var priorityOrder_1 = { 'Low': 1, 'Medium': 2, 'High': 3 };
        tasks.sort(function (a, b) { return priorityOrder_1[a.priority] - priorityOrder_1[b.priority]; });
    }
    renderTasks();
}
// Attach event listeners for dynamically generated buttons
document.addEventListener('click', function (event) {
    var target = event.target;
    if (target.tagName === 'BUTTON') {
        if (target.textContent === 'Delete') {
            var index = parseInt(target.getAttribute('onclick').match(/\d+/)[0], 10);
            deleteTask(index);
        }
        else if (target.textContent === 'Pending' || target.textContent === 'Completed') {
            var index = parseInt(target.getAttribute('onclick').match(/\d+/)[0], 10);
            changeStatus(index);
        }
    }
});
