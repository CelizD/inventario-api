const Categoria = require("../models/Categoria");

// GET /categorias
const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({ order: [["id", "ASC"]] });
    res.json({ ok: true, data: categorias });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error al obtener categorías", error: error.message });
  }
};

// GET /categorias/:id
const getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ ok: false, mensaje: "Categoría no encontrada" });
    res.json({ ok: true, data: categoria });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error al obtener categoría", error: error.message });
  }
};

// POST /categorias
const createCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre) return res.status(400).json({ ok: false, mensaje: "El campo 'nombre' es requerido" });
    const nueva = await Categoria.create({ nombre, descripcion });
    res.status(201).json({ ok: true, mensaje: "Categoría creada correctamente", data: nueva });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ ok: false, mensaje: "Ya existe una categoría con ese nombre" });
    }
    res.status(500).json({ ok: false, mensaje: "Error al crear categoría", error: error.message });
  }
};

// PUT /categorias/:id
const updateCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ ok: false, mensaje: "Categoría no encontrada" });
    const { nombre, descripcion } = req.body;
    await categoria.update({ nombre, descripcion });
    res.json({ ok: true, mensaje: "Categoría actualizada correctamente", data: categoria });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ ok: false, mensaje: "Ya existe una categoría con ese nombre" });
    }
    res.status(500).json({ ok: false, mensaje: "Error al actualizar categoría", error: error.message });
  }
};

// DELETE /categorias/:id
const deleteCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (!categoria) return res.status(404).json({ ok: false, mensaje: "Categoría no encontrada" });
    await categoria.destroy();
    res.json({ ok: true, mensaje: "Categoría eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: "Error al eliminar categoría", error: error.message });
  }
};

module.exports = { getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria };
