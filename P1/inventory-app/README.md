# Aplicación de Gestión de Inventario

Este proyecto es una aplicación de gestión de inventario que permite a los usuarios gestionar productos en una tienda. La aplicación proporciona funcionalidades para agregar, eliminar y buscar productos, así como mostrar el inventario de varias maneras.

## Objetivos

### Objetivos Generales
- Aplicar los conocimientos adquiridos a lo largo de la carrera de Ingeniería en Ciencias y Sistemas para generar software de alta calidad y escalable, utilizando diversas técnicas de desarrollo y las últimas tecnologías.

### Objetivos Específicos
- Asegurar que el estudiante comprenda completamente los conceptos de código limpio.
- Familiarizar al estudiante con la aplicación de buenas prácticas de programación y los principios SOLID.

## Funcionalidades

La aplicación permite a los usuarios realizar las siguientes acciones:
1. Agregar un nuevo producto al inventario.
2. Eliminar un producto del inventario.
3. Mostrar la lista de productos con sus detalles.
4. Mostrar la lista de productos ordenados por precio y/o cantidad.
5. Buscar un producto por su nombre y mostrar su información.

## Estructura

El proyecto está organizado en varios archivos y directorios:

- **src/app.ts**: Punto de entrada de la aplicación, configurando el servidor y las rutas principales.
- **src/controllers/productController.ts**: Contiene la clase `ProductController` con métodos para gestionar las operaciones de productos.
- **src/models/product.ts**: Define la clase `Product` que representa la estructura de un producto en el inventario.
- **src/services/productService.ts**: Contiene la clase `ProductService` con la lógica de negocio para gestionar el inventario.
- **src/utils/errorHandler.ts**: Funciones para manejar errores y gestionar entradas incorrectas.
- **src/types/index.ts**: Exporta interfaces que definen los tipos utilizados en la aplicación.

## Principios SOLID

### S - Principio de Responsabilidad Única
Una clase debe tener una y solo una razón para cambiar. Por ejemplo, la clase `Product` solo maneja datos de productos, mientras que la clase `ProductService` gestiona la lógica de negocio.

### O - Principio de Abierto/Cerrado
Las entidades de software deben estar abiertas para extensión pero cerradas para modificación. Esto se puede lograr utilizando interfaces y clases abstractas.

### L - Principio de Sustitución de Liskov
Los objetos de una superclase deben ser reemplazables con objetos de una subclase sin afectar la corrección del programa. Por ejemplo, si tenemos una clase `DiscountedProduct` que extiende `Product`, debería funcionar sin problemas donde se espera un `Product`.

### I - Principio de Segregación de Interfaces
Los clientes no deben estar obligados a depender de interfaces que no usan. Esto significa crear interfaces más pequeñas y específicas en lugar de una grande y de propósito general.

### D - Principio de Inversión de Dependencias
Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones. Esto se puede implementar utilizando inyección de dependencias.

## Ejecución del Programa

Para ejecutar el programa, sigue estos pasos:

1. Clona el repositorio en tu máquina local:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2. Navega al directorio del proyecto:
    ```bash
    cd inventory-app
    ```

3. Instala las dependencias del proyecto:
    ```bash
    npm install
    ```

4. Compila el proyecto TypeScript a JavaScript:
    ```bash
    npm run build
    ```

5. Inicia la aplicación:
    ```bash
    npm start
    ```

La aplicación estará disponible en `http://localhost:3000`.

## Conclusión

Este README proporciona una visión general de la aplicación de gestión de inventario, sus objetivos, funcionalidades, estructura y adherencia a los principios SOLID. La aplicación está diseñada para ser modular, mantenible y escalable, asegurando prácticas de desarrollo de software de alta calidad.