const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Chemistry Revision",
    subject: "Chemistry",
    completed: false,
  },
  {
    id: 2,
    title: "Mathematics Practice",
    subject: "Mathematics",
    completed: true,
  },
  {
    id: 3,
    title: "Prepare Report",
    subject: "Project",
    completed: false,
  },
];

// HOME ROUTE
app.get("/", (req, res) => {
  res.json({
    message: "StudySync Backend Running Successfully",
  });
});

// GET ALL TASKS
app.get("/api/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// SEARCH TASKS
app.get("/api/tasks/search", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(query) ||
      task.subject.toLowerCase().includes(query)
  );

  res.status(200).json(filteredTasks);
});

// GET SINGLE TASK
app.get("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  res.status(200).json(task);
});

// CREATE TASK
app.post("/api/tasks", (req, res) => {
  const { title, subject } = req.body;

  if (!title || !subject) {
    return res.status(400).json({
      message: "Title and subject are required",
    });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    subject,
    completed: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// UPDATE TASK
app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  const { title, subject, completed } = req.body;

  if (title !== undefined) task.title = title;
  if (subject !== undefined) task.subject = subject;
  if (completed !== undefined) task.completed = completed;

  res.status(200).json(task);
});

// DELETE TASK
app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks.splice(taskIndex, 1);

  res.status(204).send();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});