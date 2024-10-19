import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';

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
  
  const handleRating = (index, rating) => {
    const updatedPhotos = [...photos];
    updatedPhotos[index].rating = rating;
    updatedPhotos[index].rated = true; 
    setPhotos(updatedPhotos);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Barra de navegación superior */}
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
              <button className="btn btn-link text-light me-2" onClick={() => navigate('/Pagina')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                Salir
              </button>
            </div>
            <img src="imagenes/imagen2.jpeg" alt="Profile Icon" style={{ height: '50px', borderRadius: '50%' }} />
          </div>
        </div>
        {/* Contenido Principal */}
        <div className="col-md-10 main-content">
          <h1 className="text-center my-4">DAPA — De artistas, para artistas</h1>
          {/* Mostrar las fotos públicas */}
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
        </div>
        {/* Botón para abrir el modal */}
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
      {/* Modal para agregar foto y descripción */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Foto y Descripción</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Seleccionar Foto</Form.Label>
              <Form.Control type="file" onChange={handlePhotoChange} />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe una descripción..."
                value={description}
                onChange={handleDescriptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Subir
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaginaPrincipal;
