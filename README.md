# 🍽️ Culinaria - Plataforma de Reseñas de Restaurantes

¡Bienvenido a **Culinaria**! Esta es una aplicación web full-stack (MERN) diseñada para entusiastas de la gastronomía. Permite a los usuarios registrarse, iniciar sesión y gestionar (crear, leer, actualizar y eliminar) reseñas sobre sus experiencias en diferentes restaurantes, con una interfaz premium de estilo *glassmorphic*.

---

## 👥 Autores del Proyecto

Este proyecto fue desarrollado para el parcial final de desarrollo web por:
*   **Miguel Ángel Ramírez Corredor**
*   **Pedro Juan Mendoza Ovallos**

---

## 🚀 Características Principales

*   **Autenticación Segura**: Registro e inicio de sesión de usuarios con encriptación de contraseñas mediante `bcryptjs` y manejo de sesiones seguras con JSON Web Tokens (JWT).
*   **Operaciones CRUD Completas**: Los usuarios autenticados pueden crear, modificar y eliminar sus propias reseñas culinarias.
*   **Visualización Pública**: Cualquier visitante (incluso sin iniciar sesión) puede explorar la lista completa de reseñas disponibles.
*   **Búsqueda y Filtrado en Tiempo Real**: Buscador de restaurantes por nombre y filtro dinámico por número de estrellas (calificación de 1 a 5).
*   **Diseño Premium Glassmorphic**: Interfaz moderna y responsiva construida con CSS nativo (Vanilla CSS), con efectos de desenfoque de fondo (*backdrop-filter*), gradientes elegantes y transiciones suaves.
*   **Validación de Datos**: Reglas de negocio del lado del servidor utilizando Mongoose (calificaciones de 1 a 5, obligatoriedad de campos, nombres de usuario únicos, etc.).

---

## 🛠️ Tecnologías Utilizadas

### Frontend
*   **React 19**: Biblioteca principal para la construcción de la interfaz.
*   **Vite**: Herramienta de compilación rápida para desarrollo moderno.
*   **Lucide React**: Paquete de iconos vectoriales limpios y estilizados.
*   **Vanilla CSS**: Diseño adaptativo y estilos avanzados sin dependencias de frameworks adicionales.

### Backend
*   **Node.js**: Entorno de ejecución de JavaScript en el servidor.
*   **Express.js**: Framework web ligero para estructurar la API RESTful.
*   **MongoDB & Mongoose**: Base de datos NoSQL y ODM para el modelado de datos de usuarios y reseñas.
*   **JSON Web Tokens (JWT)**: Protocolo de autenticación basado en tokens.
*   **Bcrypt.js**: Encriptación hash de contraseñas de usuarios.

---

## 📁 Estructura del Proyecto

El proyecto está dividido en dos partes principales:

```text
├── backend/                  # Servidor API y Base de datos
│   ├── middleware/           # Middlewares (ej. Autenticación de Token JWT)
│   ├── models/               # Modelos Mongoose (User, Review)
│   ├── routes/               # Enrutadores Express (auth, reviews)
│   ├── .env.template         # Archivo plantilla para variables de entorno
│   ├── server.js             # Punto de entrada de la API backend
│   └── package.json          # Dependencias y scripts del servidor
│
├── frontend/                 # Aplicación del Cliente (Interfaz de Usuario)
│   ├── public/               # Recursos estáticos públicos
│   ├── src/
│   │   ├── assets/           # Imágenes y logos culinarios
│   │   ├── components/       # Componentes de React (AuthForm, ReviewForm, etc.)
│   │   ├── App.jsx           # Componente principal y control de estado global
│   │   ├── index.css         # Hoja de estilos global (Variables, Glassmorphism)
│   │   └── main.jsx          # Punto de entrada de React
│   ├── index.html            # Plantilla HTML base
│   └── package.json          # Dependencias y scripts del cliente
```

---

## ⚙️ Configuración del Sistema

### Requisitos Previos
Asegúrate de tener instalado:
*   [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
*   [MongoDB](https://www.mongodb.com/) corriendo de forma local o una URI de MongoDB Atlas.

---

### 1. Configuración del Backend

1.  Navega al directorio del backend:
    ```bash
    cd backend
    ```

2.  Instala las dependencias necesarias:
    ```bash
    npm install
    ```

3.  Crea un archivo `.env` en la raíz de la carpeta `backend/` tomando como referencia las siguientes variables:
    ```env
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/restaurante-reviews
    JWT_SECRET=tu_clave_secreta_super_segura
    ```

4.  Inicia el servidor en modo de desarrollo (utiliza `nodemon` para reinicios automáticos):
    ```bash
    npm run dev
    ```
    *El servidor backend debería iniciar en `http://localhost:5000` indicando la conexión exitosa a MongoDB.*

---

### 2. Configuración del Frontend

1.  Navega al directorio del frontend:
    ```bash
    cd ../frontend
    ```

2.  Instala las dependencias del cliente:
    ```bash
    npm install
    ```

3.  Inicia la aplicación en modo desarrollo con Vite:
    ```bash
    npm run dev
    ```
    *La interfaz de usuario estará disponible en el puerto indicado por Vite (usualmente `http://localhost:5173`).*

---

## 🔌 API Endpoints (Rutas del Backend)

### Autenticación (`/api/auth`)
| Método | Endpoint | Descripción | Requiere Token |
| :--- | :--- | :--- | :--- |
| **POST** | `/api/auth/register` | Registrar un nuevo usuario | No |
| **POST** | `/api/auth/login` | Iniciar sesión y obtener token JWT | No |

### Reseñas (`/api/reviews`)
| Método | Endpoint | Descripción | Requiere Token |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/reviews` | Obtener todas las reseñas culinarias | No |
| **POST** | `/api/reviews` | Crear una nueva reseña | **Sí (Bearer)** |
| **PUT** | `/api/reviews/:id` | Editar una reseña existente (solo propietario) | **Sí (Bearer)** |
| **DELETE** | `/api/reviews/:id` | Eliminar una reseña (solo propietario) | **Sí (Bearer)** |

---

## 🎨 Aspecto Visual y UX
El desarrollo de la interfaz priorizó una experiencia fluida e interactiva:
*   **Paleta de colores**: Diseñada con colores oscuros y contrastes vibrantes usando variables CSS.
*   **Microinteracciones**: Efectos hover suaves al posicionarse sobre botones, campos de entrada y tarjetas de reseñas.
*   **Diseño Adaptable (Responsive)**: Optimizado tanto para dispositivos móviles en pantalla vertical como para monitores de escritorio.
