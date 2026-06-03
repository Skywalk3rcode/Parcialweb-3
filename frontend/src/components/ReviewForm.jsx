import React, { useState, useEffect } from 'react';
import { Star, PlusCircle, Save, X, Calendar, Edit3, MessageSquare } from 'lucide-react';

const ReviewForm = ({ editingReview, onSubmit, onCancel, loading }) => {
  const [restaurantName, setRestaurantName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [visitDate, setVisitDate] = useState('');
  const [observations, setObservations] = useState('');
  const [error, setError] = useState('');

  // Sincronizar formulario si estamos editando una reseña
  useEffect(() => {
    if (editingReview) {
      setRestaurantName(editingReview.restaurantName);
      setRating(editingReview.rating);
      // Formatear fecha para el input date (YYYY-MM-DD)
      const date = new Date(editingReview.visitDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate() + 1).padStart(2, '0'); // Compensación de zona horaria simple
      // O usando ISO string cortado si es más seguro:
      const isoDate = date.toISOString().split('T')[0];
      setVisitDate(isoDate);
      setObservations(editingReview.observations);
      setError('');
    } else {
      clearForm();
    }
  }, [editingReview]);

  const clearForm = () => {
    setRestaurantName('');
    setRating(5);
    setHoverRating(0);
    // Establecer por defecto la fecha de hoy
    const today = new Date().toISOString().split('T')[0];
    setVisitDate(today);
    setObservations('');
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!restaurantName.trim() || !visitDate || !observations.trim()) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (rating < 1 || rating > 5) {
      setError('Por favor, selecciona una calificación entre 1 y 5 estrellas.');
      return;
    }

    const reviewData = {
      restaurantName: restaurantName.trim(),
      rating,
      visitDate,
      observations: observations.trim()
    };

    onSubmit(reviewData);
    if (!editingReview) {
      clearForm();
    }
  };

  return (
    <div className="glass-panel form-panel">
      <h2 className="form-panel-title">
        {editingReview ? (
          <>
            <Edit3 size={20} style={{ color: '#6366f1' }} />
            <span>Editar Reseña</span>
          </>
        ) : (
          <>
            <PlusCircle size={20} style={{ color: '#6366f1' }} />
            <span>Nueva Reseña</span>
          </>
        )}
      </h2>

      {error && (
        <div className="alert alert-danger" style={{ padding: '8px 12px', marginBottom: '16px' }}>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="restaurantName">Nombre del Restaurante</label>
          <input
            type="text"
            id="restaurantName"
            className="form-input"
            style={{ paddingLeft: '14px' }} // Sin icono para variar o mantener limpio
            placeholder="Ej. Trattoria da Luigi"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Calificación</label>
          <div className="stars-input-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`star-btn ${star <= (hoverRating || rating) ? 'filled' : ''}`}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                disabled={loading}
                title={`${star} estrellas`}
              >
                <Star size={26} fill={star <= (hoverRating || rating) ? 'currentColor' : 'none'} />
              </button>
            ))}
            <span style={{ marginLeft: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              ({rating} de 5)
            </span>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="visitDate">Fecha de Visita</label>
          <div className="input-container">
            <span className="input-icon"><Calendar size={16} /></span>
            <input
              type="date"
              id="visitDate"
              className="form-input"
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              disabled={loading}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="observations">Observaciones</label>
          <div className="input-container">
            <span className="input-icon" style={{ top: '16px', transform: 'none' }}>
              <MessageSquare size={16} />
            </span>
            <textarea
              id="observations"
              className="form-input form-input-textarea"
              placeholder="¿Qué tal estuvo la comida, el ambiente y el servicio?"
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              disabled={loading}
              required
            />
          </div>
        </div>

        <div className="form-actions-row">
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ flex: 1 }}>
            {loading ? (
              <span className="spinner"></span>
            ) : (
              <>
                <Save size={18} />
                <span>{editingReview ? 'Actualizar' : 'Guardar'}</span>
              </>
            )}
          </button>
          
          {editingReview && (
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onCancel}
              disabled={loading}
              style={{ width: 'auto' }}
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ReviewForm;
