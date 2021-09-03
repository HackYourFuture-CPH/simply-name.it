const express = require('express');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
const { authenticate } = require('../../middleware/auth');

// Router imports

const usersRouter = require('./users.router');

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
// Use authentication for router when global fetch is implemented
router.use(authenticate);
router.use('/users', usersRouter);

module.exports = router;
