const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true, // 'title' is required
    },
    completed: Boolean,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;