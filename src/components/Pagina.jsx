// src/Index.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiar a useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const Pagina = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const navigate = useNavigate(); // Inicializar useNavigate
    const handleLoginModal = () => {
        setShowLoginModal(!showLoginModal);
    };

    const handleRegisterModal = () => {
        setShowRegisterModal(!showRegisterModal);
    };

    // Función para manejar el inicio de sesión
    const handleLogin = () => {
        // Aquí podrías agregar la lógica para verificar el inicio de sesión
        // Si es exitoso, redirigir a PaginaPrincipal
        navigate('/PaginaPrincipal'); // Redirige a PaginaPrincipal
        handleLoginModal(); // Cerrar el modal de login
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 sidebar">
                    <img src="logo/LOGO(DAPA).png" alt="Logo DAPA" />
                    <button className="btn btn-light" onClick={handleLoginModal}>Iniciar Sesión</button>
                    <button className="btn btn-light" onClick={handleRegisterModal}>Registrar</button>
                </div>

                <div className="col-md-10 main-content">
                    <div className="header-buttons">
                        <button className="btn btn-dark" onClick={handleLoginModal}>Iniciar sesión</button>
                        <button className="btn btn-dark" onClick={handleRegisterModal}>Registrar</button>
                    </div>

                    <h1>DAPA — De artistas, para artistas</h1>

                    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" data-interval="2000">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src="imagenes/imagen2.jpeg" className="d-block w-50 mx-auto" alt="Imagen 1" />
                            </div>
                            <div className="carousel-item">
                                <img src="imagenes/imagen4.jpeg" className="d-block w-50 mx-auto" alt="Imagen 2" />
                            </div>
                            <div className="carousel-item">
                                <img src="imagenes/imagen6.jpg" className="d-block w-50 mx-auto" alt="Imagen 3" />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Modal de inicio de sesión */}
            {showLoginModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Login into DAPA</h5>
                                <button type="button" className="close" onClick={handleLoginModal}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="loginForm" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                                    <div className="form-group">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" id="username" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" required />
                                    </div>
                                    <button type="submit" className="btn btn-secondary btn-block">Login</button>
                                </form>
                                <div className="text-center mt-3">
                                    <p>No tienes cuenta? <a href="#" onClick={handleRegisterModal}>Regístrate aquí</a>.</p>
                                    <p><a href="#" onClick={handleRegisterModal}>Regístrate Gratis</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de registro */}
            {showRegisterModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Regístrate gratis En DAPA</h5>
                                <button type="button" className="close" onClick={handleRegisterModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="registerForm">
                                    <div className="form-group">
                                        <label htmlFor="firstName">Nombre</label>
                                        <input type="text" className="form-control" id="firstName" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Apellido</label>
                                        <input type="text" className="form-control" id="lastName" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="birthday">Fecha Cumpleaños</label>
                                        <input type="date" className="form-control" id="birthday" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">Usuario</label>
                                        <input type="text" className="form-control" id="username" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Correo Electronico</label>
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
