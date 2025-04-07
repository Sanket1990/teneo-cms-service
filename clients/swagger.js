import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Teneo CMS Service API",
      version: "1.0.0",
      description: "API documentation for the Teneo CMS Service",
    },
    servers: [
      {
        url: "http://localhost:3001/api/cms",
      },
    ],
  },
  apis: ["./routes/**/*.js"], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
