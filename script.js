document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const hourSlider = document.getElementById('hourSlider');
    const taskText = taskInput.value.trim();
    const hours = parseInt(hourSlider.value, 10);

    if (taskText) {
        addTask(taskText, hours);
        taskInput.value = '';
        hourSlider.value = 0;
        document.getElementById('hourDisplay').textContent = 0;
    }
});

document.getElementById('hourSlider').addEventListener('input', function() {
    document.getElementById('hourDisplay').textContent = this.value;
});

function addTask(taskText, hours) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    const deadline = new Date();
    deadline.setHours(deadline.getHours() + hours);
    const countdown = document.createElement('span');
    countdown.className = 'countdown';
    updateCountdown(countdown, deadline);
    setInterval(() => updateCountdown(countdown, deadline), 1000);

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', function() {
        listItem.classList.toggle('completed');
        if (listItem.classList.contains('completed')) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(listItem);
    });

    listItem.appendChild(countdown);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);
}

function updateCountdown(countdown, deadline) {
    const now = new Date();
    const timeDifference = deadline - now;

    if (timeDifference <= 0) {
        countdown.textContent = 'Time is up!';
    } else {
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        countdown.textContent = `Time remaining: ${hours}h ${minutes}m ${seconds}s`;
    }
}