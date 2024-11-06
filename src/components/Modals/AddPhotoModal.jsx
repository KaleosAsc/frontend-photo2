import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddPhotoModal = ({ show, handleClose, handlePhotoChange, handleDescriptionChange, description, handleSubmit }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Foto y Descripción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Seleccionar Foto</Form.Label>
            <Form.Control type="file" onChange={handlePhotoChange} />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escribe una descripción..."
              value={description}
              onChange={handleDescriptionChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Subir
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPhotoModal;
