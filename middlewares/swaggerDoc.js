const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocs = (app) => {
    const swaggerOptions = {
        swaggerDefinition: {
            // openapi: "3.0.1",
            info: {
                title: "Node CRUD operations Rest API Documentation",
                version: "1.0.0",
                description: "Node operations - CRUD - rest API document generated using swagger",
            },
            
        },
        servers: [
            {
              url: 'http://localhost:8080',
              description: 'Development server',
            },
          ],
        apis: ['./routes/*.js'],
    };
    
    const swaggerDocsJs = swaggerJsDoc(swaggerOptions);
    // console.log(swaggerDocsJs);
    const swaggerUiOptions = {
        customSiteTitle: "Node CRUD Rest API",
    };

    app.use(
        "/api/docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocsJs, swaggerUiOptions)
    );
};

module.exports = swaggerDocs;