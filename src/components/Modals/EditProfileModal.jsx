// src/components/modals/EditProfileModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const EditProfileModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="form-group">
            <label htmlFor="perfil">Nombre Perfil</label>
            <input type="text" className="form-control" id="perfil" defaultValue="Nombre del perfil" />
            <label htmlFor="completo">Nombre Usuario</label>
            <input type="text" className="form-control" id="completo" defaultValue="Nombre del usuario" />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="dark">
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
