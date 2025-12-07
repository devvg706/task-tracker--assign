const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/Auth");



const {
    createTask,
    deleteTask,
    getUserTasks,
    updateTask,
} = require("../controllers/tasks");


router.post("/createTask", auth, createTask);
router.delete("/:id", auth, deleteTask);
router.put("/:id", auth, updateTask);
router.get("/", auth, getUserTasks);


module.exports = router;