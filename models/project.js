//defines the project schema
const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

projectSchema.set('toJSON', {
    transform: (document, transformedSchema) => {
        transformedSchema.id = transformedSchema._id.toString()
        delete transformedSchema._id
        delete transformedSchema.__v
    }
})

module.exports = mongoose.model('Project', projectSchema)