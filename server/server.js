// Required for reading .env file
require('dotenv').config()

// required for database to perform CRUD operations
const mongoose = require('mongoose');

// required for the application to run
const app = require('./app');

const PORT = process.env.PORT || 5000;

console.log(process.env.MONGODB_URI)

// setting database
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('DB connection successful!');
    })
    .catch(err => {
        console.log('DB connection failed!');
        console.log(err.message);
    });

// Serve the application
app.listen(PORT, () => {
    console.log(`Server startes on port ${PORT}...`)
});

