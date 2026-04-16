const express = require("express");
const router = express.Router();
const { getCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria } = require("../controllers/categoriaController");

/**
 * @swagger
 * tags:
 *   name: Categorías
 *   description: Gestión de categorías de productos
 */

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorías]
 *     responses:
 *       200:
 *         description: Lista de categorías
 */
router.get("/", getCategorias);

/**
 * @swagger
 * /categorias/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *       404:
 *         description: Categoría no encontrada
 */
router.get("/:id", getCategoriaById);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crear una nueva categoría
 *     tags: [Categorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Bebidas
 *               descripcion:
 *                 type: string
 *                 example: Refrescos, aguas y jugos
 *     responses:
 *       201:
 *         description: Categoría creada
 *       400:
 *         description: Datos inválidos
 *       409:
 *         description: Ya existe una categoría con ese nombre
 */
router.post("/", createCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   put:
 *     summary: Actualizar una categoría existente
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Bebidas y Jugos
 *               descripcion:
 *                 type: string
 *                 example: Descripción actualizada
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *       404:
 *         description: Categoría no encontrada
 *       409:
 *         description: Ya existe una categoría con ese nombre
 */
router.put("/:id", updateCategoria);

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categorías]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoría eliminada
 *       404:
 *         description: Categoría no encontrada
 */
router.delete("/:id", deleteCategoria);

/**
 * @swagger
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Bebidas
 *         descripcion:
 *           type: string
 *           example: Refrescos, aguas y jugos
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

module.exports = router;
