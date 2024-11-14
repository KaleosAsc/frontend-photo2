import React, { useState, useEffect } from 'react';
import Post from '../services/postService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarruselWrapper from '../components/Carrusel/CarruselWrapper';
import '../styles/global.css';
import LoginModal from '../components/Modals/LoginModal';
import RegisterModal from '../components/Modals/RegisterModal';
import ImageGallery from '../components/gallery/ImageGallery';

const Pagina = () => {
    const PHOTO_URL = process.env.REACT_APP_API_PHOTO;
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]); // Estado para 

    const handleLoginModal = () => {
        setShowLoginModal(!showLoginModal);
    };

    const handleRegisterModal = () => {
        setShowRegisterModal(!showRegisterModal);
    };

    const handleLogin = () => {
        navigate('/PaginaPrincipal');
        handleLoginModal();
    };

    const handleRegister = () => {
        navigate('/PaginaPrincipal');
        handleRegisterModal();
    };
    useEffect(() => {
        const fetchUserData = async () => {
          try {
    
            // Obtener los datos de las publicaciones del usuario
            const post = await Post.getPost();
            console.log('Respuesta de la api pagina principal', post);
            
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
      }, []);
    

    return (
        <div className="container-fluid">
            {/* Barra de navegación superior */}
            <div className="row align-items-center bg-dark py-2">
                <div className="col-4 col-md-2 text-center">
                    <img src="logo/LOGO_DAPA_.svg" alt="Logo DAPA" style={{ height: '60px', marginLeft: '10px' }} />
                </div>
                <div className="col-8 col-md-6">
                    <div className="search-container">
                        <input type="text" className="form-control" placeholder="Search..." />
                        <button className="btn btn-light search-button">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div className="col-12 col-md-2 text-center text-md-right mt-2 mt-md-0">
                    <button className="btn btn-outline-light mx-1" onClick={handleLoginModal}>Sign in</button>
                    <button className="btn btn-outline-light" onClick={handleRegisterModal}>Sign up</button>
                </div>
                <div className="col-12 col-md-2 text-center text-md-right mt-2 mt-md-0">
                    <img src="imagenes/imagen2.jpeg" alt="Profile Icon" style={{ height: '40px', borderRadius: '50%' }} />
                </div>
            </div>

            {/* Contenido principal */}
            <div className="my-4">
                <CarruselWrapper photos={photos} />
                <ImageGallery photos={photos} />
            </div>

            {/* Modales */}
            <LoginModal show={showLoginModal} onClose={handleLoginModal} onLogin={handleLogin} />
            <RegisterModal show={showRegisterModal} onClose={handleRegisterModal} onRegister={handleRegister} />
        </div>
    );
};

export default Pagina;
