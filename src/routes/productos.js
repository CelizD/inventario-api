const express = require("express");
const router = express.Router();
const { getProductos, getProductoById, createProducto } = require("../controllers/productoController");

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
 *         description: Lista de productos obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Producto'
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
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Producto'
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
 *                 example: Laptop ASUS 15"
 *               descripcion:
 *                 type: string
 *                 example: Laptop con procesador Intel Core i5
 *               precio:
 *                 type: number
 *                 example: 12999.99
 *               stock:
 *                 type: integer
 *                 example: 10
 *               categoria_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Producto creado correctamente
 *       400:
 *         description: Datos inválidos o campos requeridos faltantes
 *       404:
 *         description: La categoría especificada no existe
 */
router.post("/", createProducto);

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
 *           example: Laptop ASUS 15"
 *         descripcion:
 *           type: string
 *           example: Laptop con procesador Intel Core i5
 *         precio:
 *           type: number
 *           example: 12999.99
 *         stock:
 *           type: integer
 *           example: 10
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
