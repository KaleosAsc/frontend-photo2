import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const PublishModal = ({ show, handleClose, handlePublish }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Publicar Contenido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handlePublish}>
          <div className="form-group">
            <label htmlFor="image">Agregar foto</label>
            <input type="file" className="form-control" id="image" name="image" accept="image/*" required />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea className="form-control" id="description" name="description" rows="3"></textarea>
          </div>
          <Button type="submit" variant="dark" className="mt-2">
            Publicar
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PublishModal;
