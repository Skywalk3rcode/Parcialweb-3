import React, { useState } from 'react';
import { Search, Star, Inbox } from 'lucide-react';
import ReviewCard from './ReviewCard';

const ReviewList = ({ reviews, currentUser, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  // Filtrar reseñas por término de búsqueda y por calificación
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.restaurantName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
      
    const matchesRating = 
      ratingFilter === 'all' || 
      review.rating === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  return (
    <div className="reviews-section">
      <div className="glass-panel controls-panel">
        <div className="search-input-wrapper">
          <span className="search-icon"><Search size={18} /></span>
          <input
            type="text"
            className="search-input"
            placeholder="Buscar restaurante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-select-wrapper">
          <label htmlFor="rating-filter" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Filtrar:
          </label>
          <select
            id="rating-filter"
            className="filter-select"
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
          >
            <option value="all">Todas las calificaciones</option>
            <option value="5">⭐⭐⭐⭐⭐ (5 estrellas)</option>
            <option value="4">⭐⭐⭐⭐ (4 estrellas)</option>
            <option value="3">⭐⭐⭐ (3 estrellas)</option>
            <option value="2">⭐⭐ (2 estrellas)</option>
            <option value="1">⭐ (1 estrella)</option>
          </select>
        </div>
      </div>

      {filteredReviews.length === 0 ? (
        <div className="glass-panel empty-state">
          <Inbox className="empty-icon" size={48} />
          <h3>No se encontraron reseñas</h3>
          <p style={{ marginTop: '8px', color: 'var(--text-secondary)' }}>
            {reviews.length === 0 
              ? 'Sé el primero en agregar una reseña culinaria en el panel de la izquierda.' 
              : 'Prueba ajustando los filtros o el término de búsqueda.'}
          </p>
        </div>
      ) : (
        <div className="reviews-grid">
          {filteredReviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              currentUser={currentUser}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewList;
