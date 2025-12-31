const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Fuel & Mileage Tracker API',
            version: '1.0.0',
            description: 'API documentation for the Fuel Tracker app',
        },
        servers: [
            {
                url: 'http://localhost:5000',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                    },
                },
                Vehicle: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        name: { type: 'string' },
                        type: { type: 'string', enum: ['Bike', 'Car', 'TukTuk', 'Other'] },
                        userId: { type: 'integer' },
                    },
                },
                FuelRecord: {
                    type: 'object',
                    properties: {
                        id: { type: 'integer' },
                        vehicleId: { type: 'integer' },
                        date: { type: 'string', format: 'date' },
                        odometer: { type: 'number' },
                        liters: { type: 'number' },
                        cost: { type: 'number' },
                        mileage: { type: 'number' },
                    },
                },
            },
        },
        security: [{
            bearerAuth: [],
        }],
    },
    apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log('Swagger docs available at http://localhost:5000/api-docs');
};

module.exports = setupSwagger;
