const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    userName: {
        type: String,
        required: true,
        unique:true
    },
    passwordHash: String,
    todos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Todo'
    }]
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
        delete returnedObject.passwordHash;
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User