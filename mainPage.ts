interface Task {
    name: string;
    status: 'Pending' | 'Completed';
    priority: 'High' | 'Medium' | 'Low';
    type: 'Work' | 'Personal' | 'Others';
}

let tasks: Task[] = [];

// Function to add a task
function addTask(): void {
    const taskNameInput = document.getElementById('taskName') as HTMLInputElement;
    const taskPrioritySelect = document.getElementById('taskPriority') as HTMLSelectElement;
    const taskTypeSelect = document.getElementById('taskType') as HTMLSelectElement;

    const taskName = taskNameInput.value;
    const taskPriority = taskPrioritySelect.value as Task['priority'];
    const taskType = taskTypeSelect.value as Task['type'];

    if (taskName === "") {
        alert("Task name cannot be empty");
        return;
    }

    const newTask: Task = {
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
function deleteTask(index: number): void {
    tasks.splice(index, 1);
    renderTasks();
}

// Function to toggle task status (Pending <-> Completed)
function changeStatus(index: number): void {
    tasks[index].status = tasks[index].status === 'Pending' ? 'Completed' : 'Pending';
    renderTasks();
}

// Function to render the tasks in the table
function renderTasks(): void {
    const taskTable = document.getElementById('taskTable') as HTMLTableElement;
    taskTable.innerHTML = "";

    tasks.forEach((task, index) => {
        const row = `
            <tr>
                <td>${task.name}</td>
                <td><button onclick="changeStatus(${index})">${task.status}</button></td>
                <td>${task.priority}</td>
                <td>${task.type}</td>
                <td><button onclick="deleteTask(${index})">Delete</button></td>
            </tr>
        `;
        taskTable.innerHTML += row;
    });
}

// Function to clear the input fields after adding a task
function clearForm(): void {
    const taskNameInput = document.getElementById('taskName') as HTMLInputElement;
    taskNameInput.value = '';
}

// Function to sort tasks based on the selected criteria
function sortTasks(): void {
    const sortTypeSelect = document.getElementById('sortType') as HTMLSelectElement;
    const sortType = sortTypeSelect.value;

    if (sortType === 'type') {
        tasks.sort((a, b) => a.type.localeCompare(b.type));
    } else if (sortType === 'priority') {
        const priorityOrder: Record<Task['priority'], number> = { 'High': 1, 'Medium': 2, 'Low': 3 };
        tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    renderTasks();
}

// Attach event listeners for dynamically generated buttons
document.addEventListener('click', (event) => {
    const target = event.target as HTMLButtonElement;

    if (target.tagName === 'BUTTON') {
        if (target.textContent === 'Delete') {
            const index = parseInt(target.getAttribute('onclick')!.match(/\d+/)![0], 10);
            deleteTask(index);
        } else if (target.textContent === 'Pending' || target.textContent === 'Completed') {
            const index = parseInt(target.getAttribute('onclick')!.match(/\d+/)![0], 10);
            changeStatus(index);
        }
    }
});