// UpdateModal.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function UpdateModal({ show, handleClose, handleSave }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Datos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="updateForm">
          <div className="form-group">
            <label htmlFor="description">Descripcion</label>
            <input type="text" className="form-control" id="description" name="description" required />
          </div>
          <div className="form-group">
            <label htmlFor="image">Imagen</label>
            <input type="file" className="form-control" id="image" name="image" accept="image/*" required />
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="dark" onClick={handleSave}>
          Guardar cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateModal;
