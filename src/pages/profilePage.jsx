import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Galeria from '../components/gallery/Gallery'; // Asegúrate de tener el import correcto para Galeria
import EditProfileModal from '../components/Modals/EditProfileModal';
import PublishModal from '../components/Modals/PublishModal';

function PaginaPerfil() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [photos, setPhotos] = useState([]); // Estado para almacenar las fotos
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("user"); // 'normal' or 'admin'

  const handleShowEdit = () => setShowEditModal(true);
  const handleCloseEdit = () => setShowEditModal(false);
  const handleShowPublish = () => setShowPublishModal(true);
  const handleClosePublish = () => setShowPublishModal(false);

  const handleLogout = () => {
    navigate('/Pagina'); // Redirige al index "Pagina"
  };

  const handlePublish = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    // Crear un nuevo objeto de foto
    const newPhoto = {
      url: URL.createObjectURL(formData.get('image')),
      description: formData.get('description'),
      rating: 0,  // Inicializa la calificación en 0
      rated: false // Indica si la foto ya fue calificada
    };

    // Actualizar el estado de las fotos
    setPhotos([...photos, newPhoto]);
    handleClosePublish(); // Cerrar el modal después de publicar
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Barra de navegación superior */}
        <div className="row align-items-center bg-dark py-2">
          <div className="col-12 col-sm-2 text-center text-sm-start mb-2 mb-sm-0">
            <a href="/PaginaPrincipal">
              <img src="logo/LOGO_DAPA_.svg" alt="Logo DAPA" className="img-fluid" style={{ height: '80px' }} />
            </a>
          </div>
          <div className="col-12 col-sm-6 mb-2 mb-sm-0">
            <div className="search-container d-flex justify-content-center justify-content-sm-start">
              <input type="text" className="form-control me-2" placeholder="Search..." />
              <button className="btn btn-light search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="col-12 col-sm-4 d-flex justify-content-center justify-content-sm-end align-items-center">
            <div className="btn-group mb-2 mb-sm-0">
              <button className="btn btn-link text-light me-2" onClick={() => navigate('/paginaPerfil')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                Perfil
              </button>
              {userRole === 'admin' &&(
                <>
                   <button className="btn btn-link text-light me-2" onClick={() => navigate('/PaginaPublicaciones')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                      Tabla Publicaciones
                   </button>
                   <button className="btn btn-link text-light me-2" onClick={() => navigate('/TablaUsuarios')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                    Tabla Usuarios
                   </button>
                </>
              )}
              <button className="btn btn-link text-light me-2" onClick={handleLogout} style={{ textDecoration: 'none', fontSize: '16px' }}>
                Salir
              </button>
            </div>
            <img src="imagenes/imagen2.jpeg" alt="Profile Icon" className="rounded-circle" style={{ height: '50px', width: '50px' }} />
          </div>
        </div>
        <div className="col-12 col-md-10 d-flex flex-column align-items-center" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <div className="container">
            <div className="row my-3 d-flex align-items-center w-100">
              <div className="col-auto">
                <img
                  id="profileImage"
                  src="/imagenes/imagen2.jpeg"
                  alt="Foto de perfil"
                  className="rounded-circle img-thumbnail"
                  width="150"
                />
              </div>
              <div className="col">
                <h2 id="username">Nombre del perfil</h2>
                <Button className="btn btn-dark me-3 my-2" onClick={handleShowEdit}>
                  Editar
                </Button>
                <Button className="btn btn-dark me-3 my-2" onClick={handleShowPublish}>
                  +
                </Button>
                <h4 id="name">Nombre completo</h4>
              </div>
            </div>
          </div>

          {/* Mostrar las fotos publicadas */}
          <Galeria photos={photos} />
        </div>
      </div>
      {/* Modal de edición de perfil */}
       <EditProfileModal show={showEditModal} handleClose={handleCloseEdit} />
      {/* Modal para publicar imagen y descripción */}
      <PublishModal
        show={showPublishModal}
        handleClose={handleClosePublish}
        handlePublish={handlePublish}
      />
    </div>
  );
}

export default PaginaPerfil;
