import React from 'react';
import { FaStar } from 'react-icons/fa';

const PhotoGallery = ({ photos, handleRating }) => {
  return (
    <div className="photo-gallery">
      {photos.map((photo, index) => (
        <div key={index} className="gallery-item2">
          <div className="card">
            <img
              src={photo.url}
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
                      onClick={() => !photo.rated && handleRating(index, i + 1)}
                      style={{ cursor: photo.rated ? 'not-allowed' : 'pointer' }}
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
