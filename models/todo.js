const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date, required: true },
    completed: {type: Boolean, default: false},
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true}
})

module.exports = mongoose.model('Todo', todoSchema)