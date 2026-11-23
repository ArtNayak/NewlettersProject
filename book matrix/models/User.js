const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username: {
        type: String,
        unique:true,
        required: true
        
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    userType:{
        type: String,
        required: true,
        enum:['Student','Librarian']
    }
   
});

const User = mongoose.model('User', userSchema); // Model name should be singular (Mongoose convention)

module.exports = User;
