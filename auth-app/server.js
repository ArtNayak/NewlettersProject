const express = require('express');
require('./db'); // Connect to MongoDB
const userRouter = require('./userRouter');

const app = express();

app.use(express.json());
app.use('/User', userRouter);

app.listen(4000, function () {
    console.log('Server started on port 4000...');
});
