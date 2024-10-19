import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarruselWrapper from '../components/Carrusel/CarruselWrapper';
import '../styles/global.css';

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

            {/* Modal de inicio de sesión */}
            {showLoginModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg col-8 mx-auto" style={{maxWidth: '400px', marginTop: '-15vh' }} role="document">
                        <div className="modal-content col-8 mx-auto">
                            <div className="modal-header">
                                <h5 className="modal-title col-8 mx-auto">Login into DAPA</h5>
                                <button type="button" className="close" onClick={handleLoginModal}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="loginForm" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                                    <div className="form-group col-8 mx-auto">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" id="username" required />
                                    </div>
                                    <div className="form-group col-8 mx-auto">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" required />
                                    </div>
                                    <button type="submit" className="btn btn-secondary btn-block ">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Modal de Registro */}
            {showRegisterModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg" style={{maxWidth: '400px', marginTop: '-10vh' }} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Regístrate gratis en DAPA</h5>
                                <button type="button" className="close" onClick={handleRegisterModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="registerForm" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
                                    <div className="form-group">
                                        <label htmlFor="firstName">Nombre</label>
                                        <input type="text" className="form-control" id="firstName" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Apellido</label>
                                        <input type="text" className="form-control" id="lastName" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="birthday">Fecha de Cumpleaños</label>
                                        <input type="date" className="form-control" id="birthday" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">Usuario</label>
                                        <input type="text" className="form-control" id="username" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Correo Electrónico</label>
                                        <input type="email" className="form-control" id="email" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Contraseña</label>
                                        <input type="password" className="form-control" id="password" required />
                                    </div>
                                    <button type="submit" className="btn btn-secondary btn-block">Regístrate</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pagina;
