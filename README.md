# Proyecto Backend con Node.js, Express y MongoDB

Este proyecto es una API de backend desarrollada con **Node.js**, **Express**, y **MongoDB**. La API permite gestionar usuarios y se conecta a un clúster de MongoDB en **MongoDB Atlas**.

---

## **Requisitos Previos**

1. **Instalar Node.js y npm:**

   - Descarga e instala Node.js desde su [página oficial](https://nodejs.org/).
   - Verifica la instalación ejecutando en la terminal:
    ```bash
    node -v
    npm -v
    ```

2. **MongoDB Atlas:**

   - Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
   - Crea un clúster gratuito y genera la URL de conexión. Deberá lucir algo así:
    ```
    mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/<base_de_datos>?retryWrites=true&w=majority
    ```

3. **Postman:**

   - Instala Postman para probar los endpoints de la API. Puedes descargarlo desde su [sitio oficial](https://www.postman.com/).

4. **Instalar TypeScript (opcional):**

   - Si deseas trabajar con TypeScript en lugar de JavaScript, asegúrate de instalarlo:
    ```bash
    npm install -g typescript
    ```

---

## **Configuración Inicial del Proyecto**

1. **Clonar el repositorio o iniciar un proyecto:**

   - Si tienes un repositorio, clónalo. De lo contrario, inicializa un nuevo proyecto:
    ```bash
    mkdir backend-project
    cd backend-project
    npm init -y
    ```

2. **Instalar dependencias principales:**

   ```bash
   npm install express mongoose dotenv
   ```

3. **Instalar dependencias de desarrollo:**

   ```bash
   npm install --save-dev typescript @types/express ts-node nodemon @types/node
   ```

4. **Configurar TypeScript:**

   - Crea un archivo `tsconfig.json` con el siguiente contenido:
    ```json
    {
    "compilerOptions": {
        "target": "ES6",
        "module": "CommonJS",
        "rootDir": "src",
        "outDir": "dist",
        "strict": true,
        "esModuleInterop": true
    }
    }
    ```

5. **Configurar scripts en **``**:**

   - Modifica los scripts para que incluyan:
    ```json
    "scripts": {
    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
    }
    ```