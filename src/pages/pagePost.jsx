import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faUser, faUpload, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function PaginaPublicaciones() {
  // Estados para manejar la visibilidad del modal
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Funciones para abrir y cerrar el modal
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const navigate = useNavigate();

  return (
    <div className="container-fluid">
      {/* Contenedor principal */}
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
              <button className="btn btn-link text-light me-2" onClick={() => navigate('/PaginaPublicaciones')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                Tabla Publicaciones
              </button>
              <button className="btn btn-link text-light me-2" onClick={() => navigate('/TablaUsuarios')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                Tabla Usuarios
              </button>
              <button className="btn btn-link text-light me-2" onClick={() => navigate('/Pagina')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                Exit
              </button>
            </div>
            <img src="imagenes/imagen2.jpeg" alt="Profile Icon" className="rounded-circle" style={{ height: '50px', width: '50px' }} />
          </div>
        </div>

        {/* Sección de contenido principal */}
        <div className="col-12 d-flex flex-column align-items-center">
          <h1 className="my-3 text-center">DAPA — De artistas, para artistas</h1>
          <div className="table-responsive w-100">
            <Table bordered className="text-center">
              <thead>
                <tr>
                  <th scope="col">UserName</th>
                  <th scope="col">Description</th>
                  <th scope="col">Image</th>
                  <th scope="col">Stars</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>
                    <Button variant="dark" size="sm" onClick={handleShowUpdateModal}>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </Button>
                    <Button variant="dark" size="sm">
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal de actualización */}
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Datos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="updateForm">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input type="text" className="form-control" id="description" name="description" required />
            </div>
            <div className="form-group">
              <label htmlFor="image">Imagen</label>
              <input type="file" className="form-control" id="image" name="image" accept="image/*" required />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseUpdateModal}>
            Cerrar
          </Button>
          <Button variant="dark">
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PaginaPublicaciones;
