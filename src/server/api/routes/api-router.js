const express = require('express');

const router = express.Router();

// Router imports

const usersRouter = require('./users.router');
const boardsRouter = require('./boards.router');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0',
      title: 'Final project',
      description: 'API documentation for the final project',
      contact: {},
    },
    host: '',
    basePath: '/api',
  },
  securityDefinitions: {},
  apis: ['./src/server/api/routes/*.js'],
};

const swaggerDocument = swaggerJsDoc(swaggerOptions);

// Route for Swagger API Documentation
router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Application routes

router.use('/users', usersRouter);
router.use('/users', boardsRouter);

module.exports = router;
