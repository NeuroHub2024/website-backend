const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'NeuroHub Project',
      version: '1.0.0',
      description: 'API documentation for our application',
    },
    servers: [
      {
        url: 'http://localhost:5000', // Update this with your server URL
        description: 'Development server',
      },
    ],
  },
  apis: ['../user-service/src/api/index.js',
    '../batch-service/src/api/index.js',
    '../content-service/src/api/index.js',
  ], // Path to the API routes files
};


const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs),
};
