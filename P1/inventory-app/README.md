# PRACTICA 1

| Nombre                       | Carnet    |
| ---------------------------- | --------- |
| Angel Francisco Sique Santos | 202012039 |

___

# Aplicación de Gestión de Inventario

Este proyecto es una aplicación de gestión de inventario que permite a los usuarios gestionar productos en una tienda. La aplicación proporciona funcionalidades para agregar, eliminar y buscar productos, así como mostrar el inventario de varias maneras.

## Índice
1. [Objetivos](#objetivos)
   - [Objetivos Generales](#objetivos-generales)
   - [Objetivos Específicos](#objetivos-específicos)
2. [Funcionalidades](#funcionalidades)
3. [Estructura del Proyecto](#estructura-del-proyecto)
   - [Descripción de los Archivos](#descripción-de-los-archivos)
4. [Principios SOLID](#principios-solid)
   - [S - Principio de Responsabilidad Única](#s---principio-de-responsabilidad-única-single-responsibility-principle)
   - [O - Principio de Abierto/Cerrado](#o---principio-de-abierto-cerrado-openclosed-principle)
   - [L - Principio de Sustitución de Liskov](#l---principio-de-sustitución-de-liskov-liskov-substitution-principle)
   - [I - Principio de Segregación de Interfaces](#i---principio-de-segregación-de-interfaces-interface-segregation-principle)
   - [D - Principio de Inversión de Dependencias](#d---principio-de-inversión-de-dependencias-dependency-inversion-principle)
5. [Ejecución del Programa](#ejecución-del-programa)


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

## Estructura del Proyecto

El proyecto está organizado en varios archivos y directorios:

- **src/app.ts**: Punto de entrada de la aplicación, configurando el servidor y las rutas principales.
- **src/controllers/productController.ts**: Contiene la clase `ProductController` con métodos para gestionar las operaciones de productos.
- **src/models/product.ts**: Define la clase `Product` que representa la estructura de un producto en el inventario.
- **src/services/productService.ts**: Contiene la clase `ProductService` con la lógica de negocio para gestionar el inventario.
- **src/utils/errorHandler.ts**: Funciones para manejar errores y gestionar entradas incorrectas.
- **src/types/index.ts**: Exporta interfaces que definen los tipos utilizados en la aplicación.
- **public/index.html**: Archivo HTML que define la interfaz de usuario.
- **public/styles.css**: Archivo CSS que define los estilos de la interfaz de usuario.
- **public/app.js**: Archivo JavaScript que contiene la lógica del frontend para interactuar con el backend.

### Descripción de los Archivos

- **src/app.ts**: Configura el servidor Express, define las rutas y los controladores, y sirve los archivos estáticos.
  - `app.use(bodyParser.json())`: Configura el middleware para parsear JSON.
  - `app.use(cors())`: Habilita CORS para permitir solicitudes desde diferentes orígenes.
  - Define las rutas para agregar, eliminar, obtener, ordenar y buscar productos.
  - `app.listen(port, () => {...})`: Inicia el servidor en el puerto especificado.

- **src/controllers/productController.ts**: Gestiona las solicitudes HTTP y llama a los métodos del `ProductService` para realizar operaciones en el inventario.
  - `addProduct(req: Request, res: Response)`: Agrega un nuevo producto al inventario.
  - `removeProduct(req: Request, res: Response)`: Elimina un producto del inventario por su nombre.
  - `getProducts(req: Request, res: Response)`: Devuelve la lista de productos.
  - `sortProducts(req: Request, res: Response)`: Devuelve la lista de productos ordenados por precio o cantidad.
  - `searchProduct(req: Request, res: Response)`: Busca un producto por su nombre y devuelve su información.

- **src/models/product.ts**: Define la clase `Product` con los atributos `name`, `quantity` y `price`.
  - `constructor(public name: string, public quantity: number, public price: number)`: Inicializa un nuevo producto con los atributos especificados.

- **src/services/productService.ts**: Implementa la lógica de negocio para agregar, eliminar, obtener, ordenar y buscar productos en una lista simple.
  - `addProduct(product: Product)`: Agrega un nuevo producto a la lista.
  - `removeProduct(name: string)`: Elimina un producto de la lista por su nombre.
  - `getProducts()`: Devuelve la lista de productos.
  - `sortProducts(sortBy: 'price' | 'quantity')`: Ordena la lista de productos por precio o cantidad.
  - `searchProduct(name: string)`: Busca un producto por su nombre y devuelve el producto encontrado.

- **src/utils/errorHandler.ts**: (Opcional) Contiene funciones para manejar errores y validar entradas.
  - `handleError(error: Error)`: Maneja errores y devuelve una respuesta adecuada.

- **src/types/index.ts**: Define la interfaz `ProductInterface` que describe la estructura de un producto.
  - `interface ProductInterface { name: string; quantity: number; price: number; }`: Define los atributos de un producto.

- **public/index.html**: Define la estructura de la interfaz de usuario con formularios para agregar y buscar productos, y una lista para mostrar el inventario.
  - Contiene formularios para agregar y buscar productos.
  - Contiene una lista para mostrar el inventario de productos.

- **public/styles.css**: Define los estilos para la interfaz de usuario.
  - Define estilos para el cuerpo, encabezados, formularios, etiquetas, entradas, botones y listas.

- **public/app.js**: Contiene la lógica del frontend para manejar eventos de formularios, realizar solicitudes HTTP al backend y actualizar la interfaz de usuario.
  - `document.getElementById('addProductForm').addEventListener('submit', function(event) {...})`: Maneja el evento de envío del formulario para agregar un producto.
  - `document.getElementById('searchProductForm').addEventListener('submit', function(event) {...})`: Maneja el evento de envío del formulario para buscar un producto.
  - `document.getElementById('refreshInventory').addEventListener('click', loadInventory)`: Maneja el evento de clic para actualizar el inventario.
  - `document.getElementById('sortByPrice').addEventListener('click', () => loadInventory('price'))`: Maneja el evento de clic para ordenar el inventario por precio.
  - `document.getElementById('sortByQuantity').addEventListener('click', () => loadInventory('quantity'))`: Maneja el evento de clic para ordenar el inventario por cantidad.
  - `function loadInventory(sortBy) {...}`: Carga el inventario desde el backend y actualiza la lista en la interfaz de usuario.
  - `function deleteProduct(name) {...}`: Elimina un producto del inventario y actualiza la lista en la interfaz de usuario.

# Principios SOLID

Los principios SOLID son un conjunto de buenas prácticas para escribir código más limpio, mantenible y escalable en programación orientada a objetos. 

## S - Principio de Responsabilidad Única (Single Responsibility Principle)

Este principio establece que una clase debe tener una única responsabilidad o razón para cambiar.

Por ejemplo:

- La clase `Product` solo maneja los datos del producto, como el nombre, la cantidad y el precio.
- La clase `ProductService` se encarga de la lógica de negocio, como agregar, eliminar y buscar productos.

Separar las responsabilidades ayuda a mantener el código organizado y fácil de modificar.

## O - Principio de Abierto/Cerrado (Open/Closed Principle)

Las clases deben estar abiertas para extenderse, pero cerradas para modificaciones. Esto significa que podemos agregar nuevas funcionalidades sin alterar el código original.

Por ejemplo, si queremos agregar productos con descuento, en lugar de modificar la clase `Product`, creamos una nueva clase `DiscountedProduct` que extienda `Product`. Así, mantenemos la base de código mientras añadimos nuevas características.

## L - Principio de Sustitución de Liskov (Liskov Substitution Principle)

Las subclases deben poder reemplazar a sus clases base sin afectar el comportamiento del programa.

Por ejemplo, si tenemos una clase `Carro` y una subclase `CarroElectrico`, deberíamos poder usar `CarroElectrico` en cualquier parte del código donde se espere un `Carro`, sin que esto genere errores o altere el funcionamiento del sistema.

## I - Principio de Segregación de Interfaces (Interface Segregation Principle)

Las interfaces deben ser específicas y adaptadas a las necesidades de cada cliente. No es recomendable crear una interfaz grande que obligue a las clases a implementar métodos que no necesitan.

Por ejemplo, en lugar de tener una única interfaz con todas las operaciones de un producto (`Product` con agregar, eliminar y buscar), podemos dividirla así:

- `CreateProduct` para agregar productos.
- `DeleteProduct` para eliminar productos.
- `SearchProduct` para buscar productos.

Esto hace que el código sea más modular.

## D - Principio de Inversión de Dependencias (Dependency Inversion Principle)

Los módulos más importantes no deben depender directamente de módulos que manejan los detalles, sino de abstracciones. Esto permite que los módulos sean más flexibles y fáciles de cambiar.

Por ejemplo, en una aplicación de gestión de estudiantes, `Estudiante` necesita obtener información sobre los estudiantes. Si `Estudiante` depende directamente de `Estudiantes`, cualquier cambio en la forma en que se almacenan los estudiantes (como pasar de una base de datos local a un servicio en la nube) obligaría a modificar `Estudiante`. Para evitar esto, se puede crear una interfaz `InterfazEstudiante`, que define cómo se obtienen los estudiantes sin importar la implementación específica. De este modo, si se cambia la fuente de datos, solo es necesario crear una nueva clase que implemente `InterfazEstudiantes`, sin afectar `Estudiante`. Esto hace que el código sea más flexible y fácil de mantener.

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
