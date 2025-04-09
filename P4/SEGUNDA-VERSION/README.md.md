
# 📘 Manual de Uso y Funcionamiento del Proyecto de Microservicios

Este proyecto implementa una arquitectura básica de microservicios usando **Docker**, **Node.js**, **Python**, **GraphQL**, y **REST**.

---

## 🧱 Microservicios

| Servicio            | Lenguaje | Tipo de API | Puerto  | Descripción                       |
|---------------------|----------|-------------|---------|-----------------------------------|
| `users-service`     | Python   | REST        | 5001    | Gestión de usuarios               |
| `products-service`  | Node.js  | GraphQL     | 5002    | Catálogo de productos             |
| `orders-service`    | Python   | GraphQL     | 5003    | Registro de pedidos               |
| `inventory-service` | Node.js  | REST        | 5004    | Control de stock e inventario     |
| `api-gateway`       | Node.js  | Proxy       | 5000    | Enrutador entre servicios         |

---

## 🚀 Cómo levantar el sistema

### Requisitos:
- Docker
- Docker Compose

### Comandos:

```bash
docker compose pull
docker compose up
```

Accede a los servicios vía: [http://localhost:5000](http://localhost:5000)

---

## 📦 API Gateway

El API Gateway enruta llamadas a los microservicios:

| Ruta Gateway                      | Redirige a                          |
|----------------------------------|-------------------------------------|
| `/users`                         | `users-service:5001`                |
| `/products/graphql`              | `products-service:5002/graphql`     |
| `/orders/graphql`                | `orders-service:5003/graphql`       |
| `/inventory`                     | `inventory-service:5004`            |

> Para GraphQL, se aplica `pathRewrite` en el Gateway para que las rutas funcionen correctamente.

---

## 🧪 Ejemplos de Uso (GraphQL)

### `products-service`

#### 🚀 URL:
`http://localhost:5000/products/graphql`

#### Query:
```graphql
query {
  products {
    id
    name
    price
  }
}
```

#### Mutation:
```graphql
mutation {
  addProduct(name: "Laptop", price: 1200.50) {
    id
    name
  }
}
```

---

### `orders-service`

#### 🚀 URL:
`http://localhost:5000/orders/graphql`

#### Query:
```graphql
query {
  orders {
    id
    user_id
    product_name
    quantity
  }
}
```

#### Mutation:
```graphql
mutation {
  createOrder(userId: 1, productName: "Laptop", quantity: 2) {
    id
    product_name
    quantity
  }
}
```

---

## 🔧 Servicios REST

### `users-service`

#### URL:
`http://localhost:5000/users`

#### POST /users
```json
{
  "username": "maria",
  "email": "maria@example.com"
}
```

---

### `inventory-service`

#### URL:
`http://localhost:5000/inventory`

#### POST /inventory
```json
{
  "product_name": "Camisa",
  "stock": 20
}
```

---

## 📄 Estructura General del Proyecto

```
P4/
├── api-gateway/
├── users-service/
├── products-service/
├── orders-service/
├── inventory-service/
├── docker-compose.yml
└── manual-graphql/
```

---

## 📚 Tecnologías Usadas

- Node.js (v20)
- Python (v3.12)
- Flask + Strawberry GraphQL
- Express + Apollo Server v4
- SQLite
- Docker + Docker Compose

---

## 🧼 Notas Finales

- Cada microservicio se puede ejecutar y probar individualmente.
- El API Gateway es responsable de centralizar las rutas y evitar exponer puertos múltiples.
- El archivo Postman collection permite pruebas rápidas en entorno local.

---
