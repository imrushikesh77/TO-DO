const express = require('express');
const router = express.Router();
const {verifyToken} = require('../middlewares/auth');
const { addNewTask,
        deleteTask,
        updateTask
    } = require('../controllers/tasks');

router.post('/add-new',verifyToken, addNewTask);
router.delete('/delete/:id',verifyToken, deleteTask);
router.put('/update/:id',verifyToken, updateTask);

module.exports = router;