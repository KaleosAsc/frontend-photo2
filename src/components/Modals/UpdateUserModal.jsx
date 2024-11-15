import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import UserService from '../../services/userService';

const UpdateUserModal = ({ show, handleClose, userId, userData, updateUserData }) => {
  // Si userData no está disponible, inicializa formData con valores vacíos
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '', // Nuevo campo username
    birthday: '' // Nuevo campo birthday
  });

  // Actualiza formData cuando userData cambie
  useEffect(() => {
    if (show && userData) {
      setFormData(userData);
    }
  }, [show, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UserService.putUsers(userId, formData); // Actualiza el usuario con los nuevos datos
      updateUserData((prev) =>
        prev.map((user) =>
          user.user_id === userId ? { ...user, ...formData } : user
        )
      );
      handleClose(); // Cierra el modal después de actualizar
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
    }
  };

  // No renderizamos el formulario hasta que `userData` esté disponible
  if (!userData) {
    return null; // No renderizamos nada si no hay datos
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Actualizar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              name="first_name"
              value={formData.first_name || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              name="last_name"
              value={formData.last_name || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              name="username"
              value={formData.username || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              name="birthday"
              value={formData.birthday || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateUserModal;
