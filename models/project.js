//defines the project schema
const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    todos: [{type: mongoose.Schema.Types.ObjectId, ref: "Todo"}]
})

module.exports = mongoose.model('Project', projectSchema)