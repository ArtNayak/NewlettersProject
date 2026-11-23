const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
        
    },
    imamge: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
    },
    category:{
        type: String,
        required: true,
        enum:['FYIT','SVIT','TYIT','FYCS','SYCS','TYCS']
    }
   
});

const User = mongoose.model('Book', bookSchema); // Model name should be singular (Mongoose convention)

module.exports = Book;
