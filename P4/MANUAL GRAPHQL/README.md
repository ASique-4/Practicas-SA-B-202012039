# Manual de GraphQL

## Introducción
GraphQL es un lenguaje de consulta para APIs y un tiempo de ejecución para cumplir con esas consultas con tus datos existentes. GraphQL te permite solicitar exactamente los datos que necesitas y nada más.

## Instalación
Para comenzar a usar GraphQL, primero necesitas instalar las dependencias necesarias. Aquí hay un ejemplo usando Node.js y Express:

```bash
npm install express express-graphql graphql
```

## Configuración Básica
A continuación, se muestra un ejemplo básico de cómo configurar un servidor GraphQL con Express:

```javascript
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type Query {
        hello: String
    }
`);

const root = {
    hello: () => {
        return 'Hello, world!';
    },
};

const app = express();
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => console.log('Servidor GraphQL ejecutándose en http://localhost:4000/graphql'));
```

## Consultas Básicas
Una vez que el servidor está en funcionamiento, puedes realizar consultas. Aquí hay un ejemplo de una consulta simple:

```graphql
{
    hello
}
```

La respuesta será:

```json
{
    "data": {
        "hello": "Hello, world!"
    }
}
```

## Ejemplo Avanzado
Para un ejemplo más avanzado, puedes definir un esquema con tipos más complejos y resolver funciones:

```javascript
const schema = buildSchema(`
    type Query {
        user(id: Int!): User
        users: [User]
    }

    type User {
        id: Int
        name: String
        age: Int
    }
`);

const users = [
    { id: 1, name: 'Alice', age: 30 },
    { id: 2, name: 'Bob', age: 25 },
];

const root = {
    user: ({ id }) => users.find(user => user.id === id),
    users: () => users,
};
```

Con este esquema, puedes realizar consultas más complejas como:

```graphql
{
    user(id: 1) {
        name
        age
    }
}
```

La respuesta será:

```json
{
    "data": {
        "user": {
            "name": "Alice",
            "age": 30
        }
    }
}
```

## Conclusión
GraphQL es una poderosa herramienta para construir APIs flexibles y eficientes. Este manual cubre solo los conceptos básicos, pero hay mucho más por explorar, como mutaciones, suscripciones y la integración con bases de datos.
