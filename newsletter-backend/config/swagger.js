import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Newsletter System API",
      version: "1.0.0",
      description: "API documentation for Newsletter System",
    },
  },
  apis: ["./routes/*.js"],
};

export default swaggerJSDoc(options);
