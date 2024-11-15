import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Post from '../../services/postService';

const PhotoGallery = ({ handleRating }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = process.env.REACT_APP_API_PHOTO;

  const fetchPhotos = async () => {
    try {
      const response = await Post.getPost();
      console.log('Respuesta de la API:', response);
      setPhotos(response.map(photo => ({
        ...photo,
        image_link: `${BASE_URL}${photo.image_link}`, // Concatenar la URL base
        rated: false // Iniciar cada foto como no calificada
      })));
    } catch (error) {
      console.error('Error al obtener las fotos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleStarClick = (index, rating) => {
    // Solo actualizar el estado si la foto no ha sido calificada
    if (!photos[index].rated) {
      handleRating(index, rating);
      // Actualizar el estado de las fotos para reflejar la calificación
      const updatedPhotos = [...photos];
      updatedPhotos[index].rating = rating;
      updatedPhotos[index].rated = true;
      setPhotos(updatedPhotos);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="photo-gallery">
      {photos.map((photo, index) => (
        <div key={index} className="gallery-item2">
          <div className="card">
            <img
              src={photo.image_link}
              className="card-img-top gallery-image2"
              alt={`Foto ${index + 1}`}
            />
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="description-container">
                <p className="description">{photo.description}</p>
              </div>
              <div className="d-flex align-items-center">
                <div className="star-rating me-2">
                  {[...Array(5)].map((star, i) => (
                    <FaStar
                      key={i}
                      color={i < photo.rating ? 'gold' : 'gray'}
                      size={20}
                      onClick={() => handleStarClick(index, i + 1)} // Usamos handleStarClick
                      style={{ cursor: photo.rated ? 'not-allowed' : 'pointer' }} // Bloqueamos el clic si ya está calificada
                    />
                  ))}
                </div>
                <span>Valoración: {photo.rating}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
