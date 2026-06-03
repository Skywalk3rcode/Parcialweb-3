import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import reviewsRoutes from './routes/reviews.js';

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de estado de la API
app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Servidor de Reseñas de Restaurantes activo' });
});

// Rutas de la aplicación
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewsRoutes);

// Conexión a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('>>> Conexión exitosa a MongoDB en', process.env.MONGO_URI);
    // Iniciar servidor solo después de conectar a la base de datos
    app.listen(PORT, () => {
      console.log(`>>> Servidor de Backend corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('!!! Error al conectar a MongoDB:', error);
    process.exit(1);
  });
