const Producto = require("../models/Producto");
const Categoria = require("../models/Categoria");

// GET /productos
const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre"] }],
      order: [["id", "ASC"]],
    });
    res.json({ ok: true, data: productos });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error al obtener productos", error: error.message });
  }
};

// GET /productos/:id
const getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id, {
      include: [{ model: Categoria, as: "categoria", attributes: ["id", "nombre"] }],
    });
    if (!producto) return res.status(404).json({ ok: false, mensaje: "Producto no encontrado" });
    res.json({ ok: true, data: producto });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error al obtener producto", error: error.message });
  }
};

// POST /productos
const createProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria_id } = req.body;
    if (!nombre || !precio || !categoria_id) {
      return res.status(400).json({ ok: false, mensaje: "Los campos 'nombre', 'precio' y 'categoria_id' son requeridos" });
    }
    const categoriaExiste = await Categoria.findByPk(categoria_id);
    if (!categoriaExiste) {
      return res.status(404).json({ ok: false, mensaje: "La categoría especificada no existe" });
    }
    const nuevo = await Producto.create({ nombre, descripcion, precio, stock: stock ?? 0, categoria_id });
    res.status(201).json({ ok: true, mensaje: "Producto creado correctamente", data: nuevo });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error al crear producto", error: error.message });
  }
};

// PUT /productos/:id
const updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ ok: false, mensaje: "Producto no encontrado" });

    const { nombre, descripcion, precio, stock, categoria_id } = req.body;

    if (categoria_id) {
      const categoriaExiste = await Categoria.findByPk(categoria_id);
      if (!categoriaExiste) {
        return res.status(404).json({ ok: false, mensaje: "La categoría especificada no existe" });
      }
    }

    await producto.update({ nombre, descripcion, precio, stock, categoria_id });
    res.json({ ok: true, mensaje: "Producto actualizado correctamente", data: producto });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error al actualizar producto", error: error.message });
  }
};

// DELETE /productos/:id
const deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (!producto) return res.status(404).json({ ok: false, mensaje: "Producto no encontrado" });
    await producto.destroy();
    res.json({ ok: true, mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error al eliminar producto", error: error.message });
  }
};

module.exports = { getProductos, getProductoById, createProducto, updateProducto, deleteProducto };
