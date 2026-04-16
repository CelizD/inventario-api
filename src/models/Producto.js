const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Categoria = require("./Categoria");
const Producto = sequelize.define("Producto", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(150), allowNull: false },
  descripcion: { type: DataTypes.TEXT, allowNull: true },
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  categoria_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Categoria, key: "id" } },
}, { tableName: "productos", timestamps: true });
Categoria.hasMany(Producto, { foreignKey: "categoria_id", as: "productos" });
Producto.belongsTo(Categoria, { foreignKey: "categoria_id", as: "categoria" });
module.exports = Producto;
