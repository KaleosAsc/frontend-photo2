import React from 'react';
import { FaStar } from 'react-icons/fa';

const PhotoGallery = ({ photos, handleRating }) => {
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
              src={photo.url}
              className="card-img-top"
              alt={`Foto ${index + 1}`}
              style={{
                width: '100%',
                height: 'auto',
                backgroundColor: '#f0f0f0',
              }}
            />
            <div className="card-body d-flex flex-column flex-md-row justify-content-between align-items-center">
              <div className="mb-2 mb-md-0" style={{ flex: 1, maxHeight: '100px', overflow: 'auto' }}>
                <p className="card-text">{photo.description}</p>
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
