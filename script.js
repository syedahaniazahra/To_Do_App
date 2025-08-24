const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const dateElement = document.getElementById("date");
const progressBar = document.getElementById("progressBar");
const quoteElement = document.getElementById("quote");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const quotes = [
  "Stay positive, work hard, make it happen.",
  "Do something today that your future self will thank you for.",
  "Every step counts, no matter how small.",
  "Focus on progress, not perfection.",
  "You are capable of amazing things!"
];

function updateDate() {
  const options = { weekday: "long", month: "long", day: "numeric" };
  dateElement.textContent = new Date().toLocaleDateString("en-US", options);
}
updateDate();

quoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];

function updateTasks() {
  taskList.innerHTML = "";
  let activeCount = 0;
  let completedCount = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task";
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-left">
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span>${task.text}</span>
      </div>
      <div>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    li.querySelector("input").addEventListener("change", (e) => {
      tasks[index].completed = e.target.checked;
      saveTasks();
    });

    li.querySelector(".edit").addEventListener("click", () => {
      const newTask = prompt("Edit task:", task.text);
      if (newTask) {
        tasks[index].text = newTask;
        saveTasks();
      }
    });

    li.querySelector(".delete").addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
    });

    taskList.appendChild(li);

    if (!task.completed) activeCount++;
    else completedCount++;
  });

  taskCount.textContent = `${activeCount} active tasks`;

  let total = tasks.length;
  let percent = total === 0 ? 0 : (completedCount / total) * 100;
  progressBar.style.width = percent + "%";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateTasks();
}

addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    saveTasks();
    taskInput.value = "";
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️ Light Mode";
  } else {
    themeToggle.textContent = "🌙 Dark Mode";
  }
});

updateTasks();
