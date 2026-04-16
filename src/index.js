require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const sequelize = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");
require("./models/Categoria");
require("./models/Producto");
require("./models/Movimiento");
const categoriasRouter = require("./routes/categorias");
const productosRouter = require("./routes/productos");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/categorias", categoriasRouter);
app.use("/productos", productosRouter);
app.get("/", (req, res) => res.json({ mensaje: "Inventario API funcionando", documentacion: `http://localhost:${PORT}/api-docs` }));
app.use(errorHandler);
sequelize.sync({ alter: true }).then(() => {
  console.log("✅ Base de datos sincronizada");
  app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
    console.log(`📄 Swagger UI en http://localhost:${PORT}/api-docs`);
  });
}).catch(err => { console.error("❌ Error DB:", err.message); process.exit(1); });
