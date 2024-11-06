import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Post from '../../services/postService';

const BASE_URL = 'http://127.0.0.1:8000/'; // Cambia esto según tu configuración

const PhotoGallery = ({ handleRating }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = async () => {
    try {
      const response = await Post.getPosts();
      console.log('Respuesta de la API:', response);
      // Mapea las fotos para incluir la URL base
      setPhotos(response.map(photo => ({
        ...photo,
        image_link: `${BASE_URL}${photo.image_link}` // Concatena la URL base
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
    <div
      className="photo-gallery d-flex flex-column align-items-center"
      style={{
        width: '90%',
        maxWidth: '800px',
        margin: '50px auto',
        marginLeft: '30%',
      }}
    >
      {photos.map((photo, index) => (
        <div key={index} className="mb-4 w-100" style={{ maxWidth: '500px' }}>
          <div className="card">
            <img
              src={photo.image_link}
              className="card-img-top"
              alt={`Foto ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                backgroundColor: '#f0f0f0',
              }}
              onError={() => console.error(`Error al cargar la imagen: ${photo.image_link}`)}
            />
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="mb-2 mb-md-0" style={{ flex: 1, maxHeight: '100px', overflow: 'auto' }}>
                <p className="card-text">{photo.description_photo}</p>
              </div>
              <div className="d-flex align-items-center">
                <div className="star-rating me-2">
                  {[...Array(5)].map((star, i) => (
                    <FaStar
                      key={i}
                      color={i < photo.five_starts ? 'gold' : 'gray'}
                      size={20}
                      onClick={() => !photo.rated && handleRating(index, i + 1)}
                      style={{ cursor: photo.rated ? 'not-allowed' : 'pointer' }}
                    />
                  ))}
                </div>
                <span>Valoración: {photo.five_starts}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PhotoGallery;
