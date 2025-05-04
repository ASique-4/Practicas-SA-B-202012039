FROM node:20

# Instalar herramientas necesarias para compilar
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar solo package.json
COPY package.json ./

# Instalar dependencias normales
RUN npm install

# Forzar que sqlite3 se compile desde fuente
RUN npm install sqlite3 --build-from-source

# Copiar el resto del proyecto
COPY . .

EXPOSE 5002

CMD ["node", "src/index.js"]
