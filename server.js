// server.js
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
app.use(express.json())

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        servers: [
            {
                url: `http://localhost:${3001}`,
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
 },
    },
    apis: ['./routes/*.js'], // Path to your API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

const healthRoutes = require('./routes/health');
const basicAuthRoutes = require('./routes/basic-auth');
const tokenBasedAuthRoutes = require('./routes/token-based-auth');
const profileAuthRoutes = require('./routes/profile');
const publicAuthRoutes = require('./routes/public');
const protectedAuthRoutes = require('./routes/protected');


app.use('/health', healthRoutes);
app.use('/basic-auth', basicAuthRoutes);
app.use('/token-based-auth', tokenBasedAuthRoutes);
app.use('/profile', profileAuthRoutes);
app.use('/public', publicAuthRoutes);
app.use('/protected', protectedAuthRoutes);

app.listen(3001, () => {
    console.log("API running on localhost:3001");
});