import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarruselWrapper from '../components/Carrusel/CarruselWrapper';
import '../styles/global.css';
import LoginModal from '../components/Modals/LoginModal'; // Importa el LoginModal
import RegisterModal from '../components/Modals/RegisterModal'; // Importa el RegisterModal

const Pagina = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const navigate = useNavigate();

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

    const images = [
        'https://img.freepik.com/foto-gratis/retrato-abstracto-ojo-elegancia-mujeres-jovenes-generado-ai_188544-9712.jpg',
        'https://www.educaciontrespuntocero.com/wp-content/uploads/2020/04/mejores-bancos-de-imagenes-gratis.jpg',
        'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75',
    ];

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
                <CarruselWrapper images={images} interval={10} />
            </div>

            {/* Modales */}
            <LoginModal show={showLoginModal} onClose={handleLoginModal} onLogin={handleLogin} />
            <RegisterModal show={showRegisterModal} onClose={handleRegisterModal} onRegister={handleRegister} />
        </div>
    );
};

export default Pagina;
