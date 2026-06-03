import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthForm from './components/AuthForm';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

const BACKEND_URL = 'http://localhost:5000';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const [currentUser, setCurrentUser] = useState(sessionStorage.getItem('username') || '');
  const [reviews, setReviews] = useState([]);
  const [editingReview, setEditingReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [alert, setAlert] = useState({ type: '', message: '' });

  // Cargar reseñas al montar el componente (siempre públicas)
  useEffect(() => {
    fetchReviews();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    // Ocultar alerta automáticamente después de 4 segundos
    setTimeout(() => {
      setAlert({ type: '', message: '' });
    }, 4000);
  };

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/reviews`);
      if (!response.ok) {
        throw new Error('Error al conectar con la API para obtener reseñas.');
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      showAlert('danger', 'No se pudieron cargar las reseñas de los restaurantes. Revisa tu conexión.');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleAuthSuccess = (newToken, username) => {
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('username', username);
    setToken(newToken);
    setCurrentUser(username);
    showAlert('success', `¡Bienvenido de nuevo, ${username}!`);
    fetchReviews(); // Refrescar para asegurar
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    setToken('');
    setCurrentUser('');
    setEditingReview(null);
    showAlert('success', 'Sesión cerrada correctamente.');
  };

  const handleReviewSubmit = async (reviewData) => {
    setLoading(true);
    const isEditing = !!editingReview;
    const url = isEditing 
      ? `${BACKEND_URL}/api/reviews/${editingReview._id}` 
      : `${BACKEND_URL}/api/reviews`;
    
    const method = isEditing ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reviewData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Ha ocurrido un error al procesar la reseña.');
      }

      showAlert('success', isEditing ? 'Reseña actualizada con éxito.' : 'Reseña guardada con éxito.');
      setEditingReview(null);
      fetchReviews(); // Recargar la lista de reseñas
    } catch (error) {
      console.error('Error submitting review:', error);
      showAlert('danger', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSelect = (review) => {
    setEditingReview(review);
    // Hacer scroll suave hacia el formulario en móviles
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditCancel = () => {
    setEditingReview(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta reseña? Esta acción no se puede deshacer.')) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al eliminar la reseña.');
      }

      showAlert('success', 'Reseña eliminada con éxito.');
      
      // Si la reseña eliminada estaba en edición, cancelar
      if (editingReview && editingReview._id === id) {
        setEditingReview(null);
      }

      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
      showAlert('danger', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Navbar currentUser={currentUser} onLogout={handleLogout} />

      {alert.message && (
        <div style={{ padding: '16px 32px 0 32px', maxWidth: '1300px', margin: '0 auto', width: '100%' }}>
          <div className={`alert ${alert.type === 'success' ? 'alert-success' : 'alert-danger'}`} style={{ marginBottom: 0 }}>
            {alert.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{alert.message}</span>
          </div>
        </div>
      )}

      {initialLoading ? (
        <div className="loading-container" style={{ flexGrow: 1 }}>
          <Loader2 className="spinner" size={32} />
          <span>Cargando aplicación culinaria...</span>
        </div>
      ) : !token ? (
        <AuthForm onAuthSuccess={handleAuthSuccess} backendUrl={BACKEND_URL} />
      ) : (
        <main className="dashboard-container">
          <div className="dashboard-sidebar">
            <ReviewForm
              editingReview={editingReview}
              onSubmit={handleReviewSubmit}
              onCancel={handleEditCancel}
              loading={loading}
            />
          </div>
          <div className="dashboard-content">
            <ReviewList
              reviews={reviews}
              currentUser={currentUser}
              onEdit={handleEditSelect}
              onDelete={handleDelete}
            />
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
