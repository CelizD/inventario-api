const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Producto = require("./Producto");
const Movimiento = sequelize.define("Movimiento", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  tipo: { type: DataTypes.ENUM("entrada", "salida"), allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false },
  motivo: { type: DataTypes.STRING(255), allowNull: true },
  producto_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: Producto, key: "id" } },
}, { tableName: "movimientos", timestamps: true });
Producto.hasMany(Movimiento, { foreignKey: "producto_id", as: "movimientos" });
Movimiento.belongsTo(Producto, { foreignKey: "producto_id", as: "producto" });
module.exports = Movimiento;
