require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");

const Task = require("./models/Task");
const authRoutes = require("./routes/auth");
const verifyToken = require("./middleware/verifyToken");
const aiRoutes = require("./routes/ai");

const app = express();

// =======================
// Rate Limiter
// =======================
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json());

// Auth Routes (Protected by Rate Limiter)
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/ai", aiRoutes);

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "StudySync Backend Running Successfully",
  });
});

/* ==========================
   TASK ROUTES (PROTECTED)
========================== */

// GET ALL TASKS
app.get("/api/tasks", verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching tasks",
    });
  }
});

// SEARCH TASKS
app.get("/api/tasks/search", verifyToken, async (req, res) => {
  try {
    const query = req.query.q || "";

    const tasks = await Task.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { subject: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      message: "Error searching tasks",
    });
  }
});

// GET SINGLE TASK
app.get("/api/tasks/:id", verifyToken, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching task",
    });
  }
});

// CREATE TASK
app.post("/api/tasks", verifyToken, async (req, res) => {
  try {
    const { title, subject, completed } = req.body;

    if (!title || !subject) {
      return res.status(400).json({
        message: "Title and subject are required",
      });
    }

    const newTask = new Task({
      title,
      subject,
      completed: completed || false,
    });

    await newTask.save();

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({
      message: "Error creating task",
    });
  }
});

// UPDATE TASK
app.put("/api/tasks/:id", verifyToken, async (req, res) => {
  try {
    const { title, subject, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        subject,
        completed,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({
      message: "Error updating task",
    });
  }
});

// DELETE TASK
app.delete("/api/tasks/:id", verifyToken, async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({
      message: "Error deleting task",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});