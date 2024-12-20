// server.js
const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const CSS_URL = "https://cdn.jsdelivr.net/npm/swagger-ui@5.18.2/dist/swagger-ui.min.css";

const app = express();
app.use(express.json())

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Full Stack - Auth',
            version: '1.0.0',
            description: 'API documentation for Auth',
        },
        servers: [
            {
                url: `https://node-express-starter.vercel.app`,
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
    apis: ['./*.js'], // Path to your API docs
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { customCssUrl: CSS_URL }));

const healthRoutes = require('./health');
const basicAuthRoutes = require('./basic-auth');
const tokenBasedAuthRoutes = require('./token-based-auth');
const profileAuthRoutes = require('./profile');
const publicAuthRoutes = require('./public');
const protectedAuthRoutes = require('./protected');


app.use('/health', healthRoutes);
app.use('/basic-auth', basicAuthRoutes);
app.use('/token-based-auth', tokenBasedAuthRoutes);
app.use('/profile', profileAuthRoutes);
app.use('/public', publicAuthRoutes);
app.use('/protected', protectedAuthRoutes);

app.listen(3001, () => {
    console.log("API running on localhost:3001");
});
