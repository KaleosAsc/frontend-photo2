import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Post from '../../services/postService'; // Asegúrate de que el servicio de fotos esté configurado
import '../../styles/global.css'; // Asegúrate de tener tus estilos adecuados

const BASE_URL = 'http://127.0.0.1:8000/'; // Cambia esto según tu configuración

const Galeria = ({ handleRating }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    try {
      const response = await Post.getPosts(); // Cambia según tu implementación
      console.log('Respuesta de la API:', response);
      // Mapea las fotos para incluir la URL base
      setPhotos(response.map(photo => ({
        ...photo,
        image_link: `${BASE_URL}${photo.image_link}`, // Concatena la URL base
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="gallery">
      {photos.map((photo, index) => (
        <div key={index} className="gallery-item">
          <img 
            src={photo.image_link} 
            alt={`Foto ${index + 1}`} 
            className="gallery-image" 
            style={{ width: '100%', height: 'auto', backgroundColor: '#f0f0f0' }} 
            onError={() => console.error(`Error al cargar la imagen: ${photo.image_link}`)} 
          />
          <div className="description-container">
            <p className="description">{photo.description_photo}</p>
          </div>
          <div className="star-rating">
            {[...Array(5)].map((star, i) => (
              <FaStar
                key={i}
                color={i < photo.five_stars ? 'gold' : 'gray'}
                size={20}
                onClick={() => !photo.rated && handleRating(index, i + 1)}
                style={{ cursor: photo.rated ? 'not-allowed' : 'pointer' }}
              />
            ))}
          </div>
          <p>Calificación: {photo.five_stars} estrellas</p>
        </div>
      ))}
    </div>
  );
};

export default Galeria;
