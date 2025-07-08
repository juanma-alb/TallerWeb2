# TP - Taller Web II: KikStore 🛒👟

## Integrantes (Grupo 9)

-   Lautaro Desouches
-   Agustín Anichini
-   Leonardo Arias
-   Juan Manuel Albino

## Descripción del Proyecto

**KikStore** es una aplicación web desarrollada con **Angular** (Frontend) y **Node.js con Express y Prisma** (Backend), diseñada como un **e-commerce de zapatillas**.

## Tecnologías Utilizadas

-   **Frontend:**

    -   Angular 17
    -   PrimeNG
    -   Bootstrap (parcial)
    -   Reactive Forms
    -   Angular Router
    -   Toasts para notificaciones

-   **Backend:**
    -   Node.js
    -   Express
    -   Prisma ORM
    -   MySQL
    -   JWT para autenticación
    -   Nodemailer + Gmail SMTP para recuperación de contraseña

## Instrucciones

# Instalar dependencias

npm install

# Configurar variables de entorno (crear archivo .env)

.env.example .env

# Editar con tus credenciales de DB y Gmail

# Migrar base de datos

npx prisma db push --> Sincroniza el esquema directamente con la base de datos (no crea migraciones)
npx prisma migrate dev --name init  --> Crea una migración con SQL, aplica cambios y guarda historial

# Iniciar servidor

npm start