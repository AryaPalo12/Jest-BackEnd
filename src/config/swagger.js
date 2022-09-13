const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Collection",
      description: "Kelas binar FSW wave 23 Greiq",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
  },
  apis: ["./src/*/*.route.js"],
};

const openapiSpecification = swaggerJsDoc(options);

module.exports = openapiSpecification;
