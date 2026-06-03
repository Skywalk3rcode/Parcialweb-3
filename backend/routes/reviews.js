import express from 'express';
import Review from '../models/Review.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// 1. Obtener todas las reseñas: GET /api/reviews
// (Cualquier usuario, incluso sin loguear o logueado, puede visualizar las reseñas de todos)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ message: 'Error al obtener las reseñas de la base de datos.' });
  }
});

// 2. Crear una nueva reseña: POST /api/reviews
// (Solo para usuarios autenticados)
router.post('/', auth, async (req, res) => {
  try {
    const { restaurantName, rating, visitDate, observations } = req.body;

    if (!restaurantName || !rating || !visitDate || !observations) {
      return res.status(400).json({ message: 'Todos los campos de la reseña son obligatorios.' });
    }

    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ message: 'La calificación debe ser un número entre 1 y 5.' });
    }

    const review = new Review({
      restaurantName,
      rating: ratingNum,
      visitDate: new Date(visitDate),
      observations,
      userId: req.user.id,
      username: req.user.username
    });

    await review.save();
    res.status(201).json({ message: 'Reseña creada con éxito.', review });
  } catch (error) {
    console.error('Error al crear reseña:', error);
    res.status(500).json({ message: 'Error interno al guardar la reseña.' });
  }
});

// 3. Modificar una reseña: PUT /api/reviews/:id
// (Solo el dueño de la reseña puede realizar la modificación)
router.put('/:id', auth, async (req, res) => {
  try {
    const { restaurantName, rating, visitDate, observations } = req.body;
    const reviewId = req.params.id;

    // Buscar la reseña
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada.' });
    }

    // Verificar si el usuario autenticado es el dueño de la reseña
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Acceso denegado. No puedes modificar una reseña que no te pertenece.' });
    }

    // Validar campos si se proporcionan
    if (restaurantName) review.restaurantName = restaurantName;
    if (rating) {
      const ratingNum = Number(rating);
      if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
        return res.status(400).json({ message: 'La calificación debe ser un número entre 1 y 5.' });
      }
      review.rating = ratingNum;
    }
    if (visitDate) review.visitDate = new Date(visitDate);
    if (observations) review.observations = observations;

    await review.save();
    res.json({ message: 'Reseña actualizada con éxito.', review });
  } catch (error) {
    console.error('Error al actualizar reseña:', error);
    res.status(500).json({ message: 'Error interno al actualizar la reseña.' });
  }
});

// 4. Eliminar una reseña: DELETE /api/reviews/:id
// (Solo el dueño de la reseña puede eliminarla)
router.delete('/:id', auth, async (req, res) => {
  try {
    const reviewId = req.params.id;

    // Buscar la reseña
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Reseña no encontrada.' });
    }

    // Verificar si el usuario autenticado es el dueño de la reseña
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Acceso denegado. No puedes eliminar una reseña que no te pertenece.' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.json({ message: 'Reseña eliminada con éxito.' });
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    res.status(500).json({ message: 'Error interno al eliminar la reseña.' });
  }
});

export default router;
