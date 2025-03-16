# Restaurant Microservices

Este proyecto consiste en una arquitectura de microservicios para un sistema de gestión de un restaurante. Se han implementado cuatro microservicios que manejan diferentes aspectos del sistema:

1. **Servicio de Reservas** (`reservation-service`):
   - Permite la creación, modificación y cancelación de reservas.
   - Implementado en Python.
   - Endpoints disponibles para manejar solicitudes HTTP relacionadas con las reservas.

2. **Servicio de Pagos** (`payment-service`):
   - Maneja el procesamiento de pagos de las reservas.
   - Implementado en Python.
   - Endpoints disponibles para manejar solicitudes de pago.

3. **Servicio de Información sobre Restaurantes** (`restaurant-info-service`):
   - Proporciona información sobre restaurantes, menús y horarios.
   - Implementado en Node.js utilizando GraphQL.
   - Incluye un esquema GraphQL y resolvers para obtener la información.

4. **Servicio de Registro de Clientes y Gestión de Autenticación** (`customer-auth-service`):
   - Permite el registro de clientes y la gestión de autenticación.
   - Implementado en Node.js utilizando GraphQL.
   - Incluye un esquema GraphQL y resolvers para manejar el registro y la autenticación.

## Estructura del Proyecto

```
restaurant-microservices
├── reservation-service
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
├── payment-service
│   ├── app.py
│   ├── Dockerfile
│   └── requirements.txt
├── restaurant-info-service
│   ├── src
│   │   ├── index.js
│   │   └── schema.graphql
│   ├── Dockerfile
│   └── package.json
├── customer-auth-service
│   ├── src
│   │   ├── index.js
│   │   └── schema.graphql
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Instrucciones para Ejecutar

1. **Instalación de Dependencias**:
   - Para los servicios de Python, asegúrate de tener `pip` instalado y ejecuta:
     ```
     pip install -r reservation-service/requirements.txt
     pip install -r payment-service/requirements.txt
     ```
   - Para los servicios de Node.js, asegúrate de tener `npm` instalado y ejecuta:
     ```
     npm install --prefix restaurant-info-service
     npm install --prefix customer-auth-service
     ```

2. **Construcción y Ejecución de los Microservicios**:
   - Utiliza Docker Compose para construir y ejecutar todos los servicios:
     ```
     docker-compose up --build
     ```

3. **Interacción con los Microservicios**:
   - Puedes utilizar Postman o cualquier cliente HTTP para interactuar con los endpoints de los microservicios.
   - Asegúrate de que los servicios estén corriendo en los puertos especificados en el archivo `docker-compose.yml`.

## Notas

- Asegúrate de tener Docker y Docker Compose instalados en tu máquina para poder ejecutar el proyecto correctamente.
- Cada microservicio tiene su propia lógica y puede ser escalado de manera independiente.