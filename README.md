# 🗂️ Inventario API — Avance 1

API REST para gestión de inventario de productos construida con **Node.js**, **Express**, **Sequelize**, **PostgreSQL** y **Swagger**.

---

## 🗄️ Modelo de base de datos

```
categorias (1) ──< productos (1) ──< movimientos
```

| Tabla          | Descripción                                         |
|----------------|-----------------------------------------------------|
| `categorias`   | Agrupa los productos por tipo (Electrónica, etc.)   |
| `productos`    | Artículos del inventario con precio y stock         |
| `movimientos`  | Registra entradas/salidas de stock de cada producto |

---

## 🚀 Levantar el proyecto con Docker

### Requisitos
- Docker Desktop instalado y corriendo

### Pasos

```bash
# 1. Clonar / tener el proyecto
cd inventario-api

# 2. Levantar contenedores (API + PostgreSQL)
docker-compose up --build

# 3. Listo ✅
```

La API queda disponible en: **http://localhost:3000**  
Swagger UI en: **http://localhost:3000/api-docs**

### Detener contenedores
```bash
docker-compose down
```

### Detener y eliminar volumen de datos
```bash
docker-compose down -v
```

---

## 📋 Endpoints disponibles — Avance 1

### Categorías

| Método | Endpoint            | Descripción                     |
|--------|---------------------|---------------------------------|
| GET    | `/categorias`       | Obtener todas las categorías    |
| GET    | `/categorias/:id`   | Obtener una categoría por ID    |
| POST   | `/categorias`       | Crear una nueva categoría       |

### Productos

| Método | Endpoint          | Descripción                   |
|--------|-------------------|-------------------------------|
| GET    | `/productos`      | Obtener todos los productos   |
| GET    | `/productos/:id`  | Obtener un producto por ID    |
| POST   | `/productos`      | Crear un nuevo producto       |

---

## 🧪 Probar con Swagger

1. Abrir **http://localhost:3000/api-docs**
2. Primero crear una categoría con `POST /categorias`
3. Luego crear un producto con `POST /productos` usando el `id` de la categoría
4. Verificar con `GET /productos`

### Ejemplo — Crear categoría
```json
POST /categorias
{
  "nombre": "Electrónica",
  "descripcion": "Dispositivos y accesorios electrónicos"
}
```

### Ejemplo — Crear producto
```json
POST /productos
{
  "nombre": "Laptop ASUS 15\"",
  "descripcion": "Intel Core i5, 8GB RAM, 512GB SSD",
  "precio": 12999.99,
  "stock": 10,
  "categoria_id": 1
}
```

---

## 🏗️ Estructura del proyecto

```
inventario-api/
├── src/
│   ├── config/
│   │   ├── database.js      # Conexión Sequelize + PostgreSQL
│   │   └── swagger.js       # Configuración Swagger
│   ├── models/
│   │   ├── Categoria.js
│   │   ├── Producto.js
│   │   └── Movimiento.js
│   ├── controllers/
│   │   ├── categoriaController.js
│   │   └── productoController.js
│   ├── routes/
│   │   ├── categorias.js    # Rutas + documentación Swagger
│   │   └── productos.js
│   ├── middlewares/
│   │   └── errorHandler.js
│   └── index.js             # Entry point
├── docker-compose.yml
├── Dockerfile
├── .env
└── package.json
```
