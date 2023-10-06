const Task = require('../models/tasks');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

const addNewTask = async(req, res) => {
    const task = req.body.task;
    const token = req.cookies.token;
    const userId = jwt.decode(token, secret).userId;
    const username = jwt.decode(token, secret).username;
    // console.log(userId, username);

    const newTask = await Task.create({
        title: task,
        completed: false,
        createdBy: userId,
    });
    // console.log(newTask);
    res.redirect('/user/dashboard');
}

const deleteTask = async(req, res) => {
    const id = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(id);
    // console.log(deletedTask);
    res.status(200).json({ message: "Task deleted successfully" });
}

const updateTask = async(req, res) => {
    const id = req.params.id;
    const task = await Task.findById(id);
    task.title = req.body.task;
    await task.save();
    res.status(200).json({ message: "Task updated successfully" });
}

module.exports = {
    addNewTask,
    deleteTask,
    updateTask
}