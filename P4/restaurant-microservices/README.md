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

## Contratos de microservicios

[Contratos](https://documenter.getpostman.com/view/33670598/2sAYkBt1sd)

