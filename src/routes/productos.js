const express = require("express");
const router = express.Router();
const { getProductos, getProductoById, createProducto, updateProducto, deleteProducto } = require("../controllers/productoController");

/**
 * @swagger
 * tags:
 *   name: Productos
 *   description: Gestión de productos del inventario
 */

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos con su categoría
 */
router.get("/", getProductos);

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto encontrado
 *       404:
 *         description: Producto no encontrado
 */
router.get("/:id", getProductoById);

/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - precio
 *               - categoria_id
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Coca-Cola 600ml
 *               descripcion:
 *                 type: string
 *                 example: Refresco de cola
 *               precio:
 *                 type: number
 *                 example: 18.00
 *               stock:
 *                 type: integer
 *                 example: 100
 *               categoria_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: Campos requeridos faltantes
 *       404:
 *         description: Categoría no existe
 */
router.post("/", createProducto);

/**
 * @swagger
 * /productos/{id}:
 *   put:
 *     summary: Actualizar un producto existente
 *     tags: [Productos]
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
 *                 example: Coca-Cola 600ml
 *               descripcion:
 *                 type: string
 *                 example: Refresco de cola actualizado
 *               precio:
 *                 type: number
 *                 example: 20.00
 *               stock:
 *                 type: integer
 *                 example: 150
 *               categoria_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto o categoría no encontrada
 */
router.put("/:id", updateProducto);

/**
 * @swagger
 * /productos/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/:id", deleteProducto);

/**
 * @swagger
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nombre:
 *           type: string
 *           example: Coca-Cola 600ml
 *         descripcion:
 *           type: string
 *           example: Refresco de cola
 *         precio:
 *           type: number
 *           example: 18.00
 *         stock:
 *           type: integer
 *           example: 100
 *         categoria_id:
 *           type: integer
 *           example: 1
 *         categoria:
 *           $ref: '#/components/schemas/Categoria'
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

module.exports = router;
