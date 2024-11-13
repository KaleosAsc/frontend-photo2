// src/components/Modals/UpdateUserModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function UpdateUserModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="updateUserForm">
          <div className="form-group">
            <label htmlFor="updateUserName">Nombre</label>
            <input type="text" className="form-control" id="updateUserName" required />
          </div>
          <div className="form-group">
            <label htmlFor="updateUserLastName">Apellido</label>
            <input type="text" className="form-control" id="updateUserLastName" required />
          </div>
          <div className="form-group">
            <label htmlFor="updateUserBirthday">Fecha de Nacimiento</label>
            <input type="date" className="form-control" id="updateUserBirthday" required />
          </div>
          <div className="form-group">
            <label htmlFor="updateUseruser">User</label>
            <input type="text" className="form-control" id="updateUseruser" required />
          </div>
          <div className="form-group">
            <label htmlFor="updateUserEmail">Email</label>
            <input type="email" className="form-control" id="updateUserEmail" required />
          </div>
          <div className="form-group">
            <label htmlFor="updateUserPassword">Contraseña</label>
            <input type="password" className="form-control" id="updateUserPassword" required />
          </div>
          <Button variant="dark" type="submit">
            Editar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default UpdateUserModal;
