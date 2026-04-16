require("dotenv").config();
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const sequelize = require("./config/database");
const errorHandler = require("./middlewares/errorHandler");

// Importar modelos para que Sequelize los registre y cree las tablas
require("./models/Categoria");
require("./models/Producto");
require("./models/Movimiento");

// Importar rutas
const categoriasRouter = require("./routes/categorias");
const productosRouter = require("./routes/productos");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use("/categorias", categoriasRouter);
app.use("/productos", productosRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    mensaje: "🚀 Inventario API funcionando correctamente",
    documentacion: `http://localhost:${PORT}/api-docs`,
    endpoints: {
      categorias: `http://localhost:${PORT}/categorias`,
      productos: `http://localhost:${PORT}/productos`,
    },
  });
});

// Error handler
app.use(errorHandler);

// Sincronizar DB y levantar servidor
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("✅ Base de datos sincronizada");
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
      console.log(`📄 Swagger UI en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos:", err.message);
    process.exit(1);
  });
