import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import AddPhotoModal from '../components/Modals/AddPhotoModal'; // Asegúrate de tener la ruta correcta
import PhotoGallery from '../components/gallery/PhotoGallery'; // Importa el nuevo componente
/**Pagina principal */
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
        {/* Contenido Principal */}
        <div className="col-md-10 main-content">
          <h1 className="text-center my-5 title-shift">DAPA — De artistas, para artistas</h1>
          {/* Mostrar las fotos públicas */}
          <PhotoGallery photos={photos} handleRating={handleRating} />
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
