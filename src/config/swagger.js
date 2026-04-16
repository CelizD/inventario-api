const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Inventario API", version: "1.0.0", description: "API REST para gestión de inventario de una tienda de abarrotes. CRUD completo." },
    servers: [{ url: "http://localhost:3000", description: "Servidor local" }],
  },
  apis: ["./src/routes/*.js"],
};
module.exports = swaggerJsdoc(options);
