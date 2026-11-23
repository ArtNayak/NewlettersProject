const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost:27017/tcet-book-matrix');
const db=mongoose.connection;

db.on('connected',function(){
    console.log("MongoDB is connected...");
});

db.on('disconnected',function(){
    console.log("MongoDB is disconnected...");
});

db.on('error',function(){
    console.log("something went wrong while connecting to MongoDB...");
});

module.exports=db;