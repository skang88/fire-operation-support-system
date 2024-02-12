const express = require('express');
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const morgan = require('morgan');
const cors = require('cors');

// Middleware for debugging to lon in the console
app.use(morgan('dev'));

// Middleware to handle json data from body. for example, const userName = req.body.username;
app.use(express.json());

// Swagger Ui middleware 
// Editor URL: https://editor-next.swagger.io
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to communicate with client
app.use(cors());

// Routers
const stationRouter = require('./router/stationRouter');
app.use("/api/v1", stationRouter);

const fleetRouter = require('./router/fleetRouter');
app.use("/api/v1", fleetRouter);


module.exports = app;