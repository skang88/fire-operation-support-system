// Required for reading .env file
require('dotenv').config()

const express = require('express');
const app = express();

// required for database to perform CRUD operations
const mongoose = require('mongoose');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

// Middleware for debugging to lon in the console
app.use(morgan('dev'));

// Middleware to handle json data from body. for example, const userName = req.body.username;
app.use(express.json());

// Swagger Ui middleware 
// Editor URL: https://editor-next.swagger.io
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to communicate with client
app.use(cors());

// end point /api/
app.get("/api/v1", (req, res) => {
    res.json({ message: "Server Response: Like this video!", people: ['Aron', 'Jack', 'Mary'] });
});

// Routers
const stationRouter = require('./router/stationRouter');
app.use("/api/v1", stationRouter);

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

