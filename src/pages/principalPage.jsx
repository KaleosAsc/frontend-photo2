import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import AddPhotoModal from '../components/Modals/AddPhotoModal';
import PhotoGallery from '../components/gallery/PhotoGallery';
import RatingService from '../services/ratingService';
import { postInteraction } from '../services/interactionService';

const PaginaPrincipal = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState([]);
  const [userRole, setUserRole] = useState("user"); // 'normal' or 'admin'

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);
  const handlePhotoChange = (e) => setPhoto(e.target.files[0]);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  
  const handleSubmit = () => {
    const newPhoto = {
      url: URL.createObjectURL(photo),
      description, 
      rating: 0,
      rated: false 
    };
    setPhotos([...photos, newPhoto]);
    handleModalClose();
    setPhoto(null);
    setDescription("");
  };
  const handleLogout = () => {
    console.log("log out");
    localStorage.removeItem('user_id');
    navigate('/Pagina'); 
  };
  const handleRating = async (postId, rating) => {
    const updatedPostId = postId + 1; // Sumar 1 al postId
    
    console.log(`Estrella: ${rating}, Post: ${updatedPostId}`);
  
    // Obtén el user_id desde el localStorage
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      console.error('User ID no encontrado en el localStorage');
      return;
    }
  
    const interactionData = {
      starts: rating,        // Valor de la calificación
      user_id_id: userId,    // ID del usuario obtenido del localStorage
      post_id_id: updatedPostId // Usar el postId incrementado
    };
  
    // Actualiza la calificación en el estado local
    const updatedPhotos = [...photos];
    const photoIndex = updatedPhotos.findIndex((photo) => photo.post_id === postId);
    if (photoIndex >= 0) {
      updatedPhotos[photoIndex].rating = rating;
      updatedPhotos[photoIndex].rated = true;
      setPhotos(updatedPhotos);
    }
  
    try {
      // Llamamos al método de RatingService para actualizar el rating
      const ratingResponse = await RatingService.updatePostRating(updatedPostId, rating);
      console.log('Calificación actualizada:', ratingResponse);
  
      // Llamamos a postInteraction para enviar el user_id, post_id y rating
      const interactionResponse = await postInteraction(interactionData);
      console.log('Interacción registrada:', interactionResponse);
  
      // Si ambas respuestas son exitosas, puedes hacer algo más, como mostrar un mensaje de éxito
      if (ratingResponse && interactionResponse) {
        console.log('Ambas peticiones fueron exitosas');
      } else {
        console.log('Una de las peticiones falló');
      }
  
    } catch (error) {
      console.error('Error al actualizar la calificación o la interacción:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="row align-items-center bg-dark py-2">
            <div className="col-6 col-md-2 d-flex justify-content-center justify-content-md-start">
              <img src="logo/LOGO_DAPA_.svg" alt="Logo DAPA" style={{ height: '80px', marginLeft: '30px' }} />
            </div>
            <div className="col-12 col-md-6 mt-2 mt-md-0">
              <div className="search-container">
                <input type="text" className="form-control" placeholder="Search..." />
              </div>
            </div>
            <div className="col-12 col-md-4 d-flex justify-content-center justify-content-md-end mt-2 mt-md-0">
              <div className="btn-group">
                <button className="btn btn-link text-light me-2" onClick={() => navigate('/paginaPerfil')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                  Perfil
                </button>
                {userRole === "admin" && (
                  <>
                    <button className="btn btn-link text-light me-2" onClick={() => navigate('/PaginaPublicaciones')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                      Publicaciones
                    </button>
                    <button className="btn btn-link text-light me-2" onClick={() => navigate('/TablaUsuarios')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                      Usuarios
                    </button>
                  </>
                )}
                <button className="btn btn-link text-light me-2" onClick={handleLogout} style={{ textDecoration: 'none', fontSize: '16px' }}>
                  Salir
                </button>
              </div>
              <img src="imagenes/imagen2.jpeg" alt="Profile Icon" style={{ height: '50px', borderRadius: '50%' }} />
            </div>
          </div>
        </div>
        <div className="col-md-10 main-content">
          <h1 className="text-center my-5 title-shift">DAPA — De artistas, para artistas</h1>
          <PhotoGallery photos={photos} handleRating={handleRating} />
        </div>
        <div className="col-12 d-flex justify-content-center my-4">
          <button
            className="btn btn-dark"
            style={{
              fontSize: '18px',
              padding: '10px 20px',
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: 1000
            }}
            onClick={handleModalOpen}
          >
            +
          </button>
        </div>
      </div>
      <AddPhotoModal
        show={showModal}
        handleClose={handleModalClose}
        handlePhotoChange={handlePhotoChange}
        handleDescriptionChange={handleDescriptionChange}
        description={description}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default PaginaPrincipal;