# Usa una imagen de Node.js adecuada para Angular
FROM node:18.19
# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Instala las dependencias del proyecto
RUN npm install

# Copia todo el contenido del proyecto al contenedor
COPY . .

# Expone el puerto 4200 para acceder a la aplicación desde el host
EXPOSE 4200

# Comando para iniciar la aplicación
CMD ["npm i", "npm", "run", "start"]

# docker container run \
#   --name wcTest \
#   -w /app \
#   -p 4020:4200 \
#   -v "$(pwd)":/app \
#   -v node_modules:/app/node_modules \
#   supdashboard-angular
