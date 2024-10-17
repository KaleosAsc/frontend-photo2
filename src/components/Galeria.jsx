// Galeria.js
import React from 'react';
import './styles.css'; // Asegúrate de tener tus estilos adecuados

const Galeria = ({ photos }) => {
  return (
    <div className="gallery">
      {photos.map((photo, index) => (
        <div key={index} className="gallery-item">
          <img src={photo.url} alt={`Foto ${index + 1}`} className="gallery-image" />
          <div className="description-container">
            <p className="description">{photo.description}</p>
          </div>
          <p>Calificación: {photo.rating} estrellas</p>
        </div>
      ))}
    </div>
  );
};

export default Galeria;
