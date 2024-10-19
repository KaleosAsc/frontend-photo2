import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarruselWrapper from '../components/Carrusel/CarruselWrapper';
import RegisterForm from '../components/forms/RegisterForms'; 
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
        'https://img.freepik.com/foto-gratis/retrato-abstracto-ojo-elegancia-mujeres-jovenes-generado-ai_188544-9712.jpg', // Reemplaza con la ruta de tu imagen
        'https://www.educaciontrespuntocero.com/wp-content/uploads/2020/04/mejores-bancos-de-imagenes-gratis.jpg',
        'https://next-images.123rf.com/index/_next/image/?url=https://assets-cdn.123rf.com/index/static/assets/top-section-bg.jpeg&w=3840&q=75',
        // Agrega más imágenes según sea necesario
    ];
    return (
        <div className="container-fluid">
            {/* Barra de navegación superior */}
            <div className="row align-items-center bg-dark py-2">
                <div className="col-2">
                    
                    <img src="logo/LOGO_DAPA_.svg" alt="Logo DAPA" style={{ height: '80px', marginLeft: '30px'}} />
                </div>
                <div className="col-6">
                    <div className="search-container">
                        <input type="text" className="form-control" placeholder="Search..." />
                        <button className="btn btn-light search-button">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
                <div className="col-2 text-right">
                    <button className="btn btn-outline-light mx-5" onClick={handleLoginModal}>Sing in</button>
                    <button className="btn btn-outline-light" onClick={handleRegisterModal}>Sing up</button>
                </div>
                <div className="col-2 text-right">
                    <img src="imagenes/imagen2.jpeg" alt="Profile Icon" style={{ height: '40px', borderRadius: '50%' }} />
                </div>
            </div>

            {/* Contenido principal */}
             {/* Carrusel de imágenes */}
             <CarruselWrapper images={images} interval={10} />

                 
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
                                    <p>No tienes cuenta? <a href="" onClick={handleRegisterModal}>Regístrate aquí</a>.</p>
                                    <p><a href="" onClick={handleRegisterModal}>Regístrate Gratis</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {
                showRegisterModal &&(
                    <RegisterForm/>
                )
            }
        
        </div>
    );
};

export default Pagina;
