import React, { useState, useEffect } from 'react';
import Post from '../services/postService';
import User from '../services/userService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Galeria from '../components/gallery/Gallery';
import EditProfileModal from '../components/Modals/EditProfileModal';
import PublishModal from '../components/Modals/PublishModal';
/**Pagina perfil */
function PaginaPerfil() {
  const PHOTO_URL = process.env.REACT_APP_API_PHOTO;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [photos, setPhotos] = useState([]); // Estado para almacenar las fotos 
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("user");
  const [userData, setUserData] = useState(null);

  const handleShowEdit = () => setShowEditModal(true);
  const handleCloseEdit = () => setShowEditModal(false);
  const handleShowPublish = () => setShowPublishModal(true);
  const handleClosePublish = () => setShowPublishModal(false);
  const user_id = localStorage.getItem("user_id");

  const handleLogout = () => {
    console.log("log out");
    localStorage.removeItem('user_id');
    navigate('/Pagina'); 
  };

  const handlePublish = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const newPhoto = {
      url: URL.createObjectURL(formData.get('image')),
      description: formData.get('description'),
      rating: 0,
      rated: false
    };

    setPhotos([...photos, newPhoto]);
    handleClosePublish();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await User.getUsers(user_id);
        setUserData(userResponse);

        // Obtener los datos de las publicaciones del usuario
        const post = await Post.getPost(user_id);
        console.log('Respuesta de la api', post);
        
        // Crear un arreglo temporal de fotos
        const fetchedPhotos = post.map((p) => ({
          url: `${PHOTO_URL}${p.image_link}`,
          description: p.description_photo,
          rating: 0,
          rated: false,
        }));
        console.log(fetchedPhotos)
        // Actualizar el estado `photos` con el arreglo completo de fotos
        setPhotos(fetchedPhotos);
      } catch (error) {
        console.log("Error al obtener los datos:", error);
      }
    };
    fetchUserData();
  }, [user_id]);

  return (
    <div className="container-fluid">
      <div className="row">
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
              {userRole === 'admin' && (
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
                <h2 id="username">{userData ? userData.username : 'Cargando...'}</h2>
                <Button className="btn btn-dark me-3 my-2" onClick={handleShowEdit}>
                  Editar
                </Button>
                <Button className="btn btn-dark me-3 my-2" onClick={handleShowPublish}>
                  +
                </Button>
                <h4 id="name">{userData ? `${userData.first_name} ${userData.last_name}` : 'Cargando...'}</h4>
              </div>
            </div>
          </div>

          {/* Mostrar las fotos publicadas */}
          <Galeria photos={photos} />
        </div>
      </div>
      
      <EditProfileModal show={showEditModal} handleClose={handleCloseEdit} />
      <PublishModal
        show={showPublishModal}
        handleClose={handleClosePublish}
        handlePublish={handlePublish}
      />
    </div>
  );
}

export default PaginaPerfil;
