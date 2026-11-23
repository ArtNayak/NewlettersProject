const mongoose = require('mongoose');

const issueBookSchema = new mongoose.Schema({
    studentId:{
        type: String,
        required: true
    },
    studentName:{
        type: String,
        required: true
    },
    bookId: {
        type: String,
        required: true
        
    },
    bookName: {
        type: String,
        required: true
    },
    issueDate: {
        type: Number,
        required: true,
    },
    returnDate:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
        enum:['Pending','Returned']
    }
   
});

const IssueBook = mongoose.model('IssueBook', issueBookSchema); // Model name should be singular (Mongoose convention)

module.exports = IssueBook;
