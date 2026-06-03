import React from 'react';
import { Star, Calendar, User, Edit, Trash2, ShieldAlert } from 'lucide-react';

const ReviewCard = ({ review, currentUser, onEdit, onDelete }) => {
  const { _id, restaurantName, rating, visitDate, observations, username } = review;
  
  // Determinar si la reseña pertenece al usuario actualmente logueado
  const isOwner = currentUser && username.toLowerCase() === currentUser.toLowerCase();

  // Formatear la fecha para que sea legible (ej. "15 de mayo de 2026")
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      // Ajustar zona horaria local para evitar saltos de día
      const userTimezoneOffset = date.getTimezoneOffset() * 60000;
      const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
      
      return adjustedDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className="glass-panel review-card">
      <div>
        <div className="review-card-header">
          <h3 className="restaurant-name">{restaurantName}</h3>
          <div className="rating-stars" title={`${rating} estrellas`}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                fill={star <= rating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
        </div>

        <div className="visit-info">
          <Calendar size={14} />
          <span>Visitado el {formatDate(visitDate)}</span>
        </div>

        <p className="review-observations">{observations}</p>
      </div>

      <div className="review-card-footer">
        <div className="creator-info">
          <User size={14} />
          <span>
            Por: <span className="creator-username">{username}</span>
          </span>
        </div>

        <div className="card-actions">
          {isOwner ? (
            <>
              <button 
                className="action-btn action-btn-edit" 
                onClick={() => onEdit(review)}
                title="Editar reseña"
              >
                <Edit size={14} />
              </button>
              <button 
                className="action-btn action-btn-delete" 
                onClick={() => onDelete(_id)}
                title="Eliminar reseña"
              >
                <Trash2 size={14} />
              </button>
            </>
          ) : (
            <span className="badge-readonly" title="Solo lectura">
              Lectura
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
