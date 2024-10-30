const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    priority: {type: String},
    dueDate: { type: Date },
    completed: {type: Boolean, default: false},
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true}
})

todoSchema.set('toJSON', {
    transform: (document, transformedTodo) => {
        transformedTodo.id = transformedTodo._id.toString()
        delete transformedTodo._id
        delete transformedTodo.__v
    }
})

module.exports = mongoose.model('Todo', todoSchema)