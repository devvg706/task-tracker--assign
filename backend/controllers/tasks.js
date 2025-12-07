const Task = require("../models/Task");
const mongoose = require("mongoose");
// CREATE a new task for the authenticated user
exports.createTask = async (req, res) => {
  try {
    // The logged-in user's ID comes from your auth middleware (req.user.id)

    console.log("req.user.id", req.user.id);
    const userId = req.user && req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found",
      });
    }

    const { title, description, dueDate, priority, status } = req.body;

    // Basic validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    // Create task
    const task = await Task.create({
      title: title.trim(),
      description: description?.trim() || "",
      dueDate: dueDate ? new Date(dueDate) : null,
      priority: priority || "low",     // defaults defined in schema, optional override
      status: status || "todo",        // defaults defined in schema
      user: userId                     // 🔥 IMPORTANT: this links task to the correct user
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });

  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating task",
    });
  }
};



// DELETE a task (only if the logged-in user created it)
exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.id;        // logged-in user's ID
    const taskId = req.params.id;      // ID of the task to delete

    // 1. Find the task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // 2. Check ownership
    if (String(task.user) !== String(userId)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You cannot delete someone else's task",
      });
    }

    // 3. Delete the task
    await Task.findByIdAndDelete(taskId);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting task",
    });
  }
};



// UPDATE an existing task (only if the logged-in user owns it)
exports.updateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    // Trim whitespace/newline from id (important)
    const rawId = req.params.id;
    const taskId = typeof rawId === "string" ? rawId.trim() : rawId;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task id",
      });
    }

    // 1. Find the task
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // 2. Ownership check
    if (String(task.user) !== String(userId)) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: You cannot update another user's task",
      });
    }

    // 3. Whitelist allowed fields to update
    const allowedUpdates = ["title", "description", "dueDate", "priority", "status"];
    const updates = req.body || {};

    for (let key of Object.keys(updates)) {
      if (!allowedUpdates.includes(key)) {
        return res.status(400).json({
          success: false,
          message: `Invalid field: ${key}`,
        });
      }
    }

    // 4. Apply updates
    Object.keys(updates).forEach((field) => {
      if (field === "title" || field === "description") {
        task[field] = updates[field] ? updates[field].trim() : "";
      } else if (field === "dueDate") {
        task[field] = updates[field] ? new Date(updates[field]) : null;
      } else {
        task[field] = updates[field];
      }
    });

    // 5. Save updated task
    await task.save();

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while updating task",
    });
  }
};





// GET all tasks of logged-in user
exports.getUserTasks = async (req, res) => {
  try {
    const userId = req.user.id;

    const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching tasks",
    });
  }
};
