// src/PaginaPrincipal.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"; 

const PaginaPrincipal = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Barra lateral */}
                <div className="col-md-2 sidebar">
                    <img src="logo/LOGO(DAPA).png" alt="Logo DAPA" className="img-fluid mb-4 mx-auto d-block" />
                    <a href="#" className="btn btn-light btn-lg btn-block mb-3">
                        <i className="fa-solid fa-magnifying-glass"></i> Buscar
                    </a>
                    <a href="#" className="btn btn-light btn-lg btn-block mb-3">
                        <i className="fa-solid fa-user"></i> Perfil
                    </a>
                    <a href="#" className="btn btn-light btn-lg btn-block">
                        <i className="fa-solid fa-upload"></i> Crear
                    </a>
                    <a href="#" className="btn btn-light btn-lg btn-block">
                        <i className="fa-solid fa-right-from-bracket"></i> Salir
                    </a>
                </div>

                {/* Contenido Principal */}
                <div className="col-md-10 main-content">
                    <h1>DAPA — De artistas, para artistas</h1>
                </div>
            </div>

            {/* Scripts de Bootstrap y FontAwesome */}
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            <script src="https://kit.fontawesome.com/457bda309b.js" crossOrigin="anonymous"></script>
        </div>
    );
};

export default PaginaPrincipal;
