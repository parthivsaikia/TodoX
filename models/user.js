const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        required: true,
        unique:true
    },
    passwordHash: String,
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Project'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User