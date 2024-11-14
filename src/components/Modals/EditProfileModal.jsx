// src/components/modals/EditProfileModal.js
import React, { useReducer } from 'react';
import User from '../../services/userService';
import { Modal, Button } from 'react-bootstrap';

const initialState = {
  username: '',
  description: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const EditProfileModal = ({ show, handleClose }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Manejador de cambios para actualizar el estado
  const handleChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: e.target.id,
      value: e.target.value,
    });
  };

  // Manejador de envío para enviar datos
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir el objeto de datos para enviar
    const data = {
      username: state.username,
      description: state.description,
    };

    try {
      const  user_id = localStorage.getItem("user_id");
      const response = await User.putUsers(user_id, data);
      console.log('Datos actualizados:', response);

      handleClose(); // Cerrar el modal después de la actualización
      window.alert('Perfil actualizado con éxito.');
      window.location.reload();
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      window.alert('Hubo un error al actualizar el perfil. Inténtalo de nuevo.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Perfil</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nombre de Usuario</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={state.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={state.description}
              onChange={handleChange}
              required
            />
          </div>
          <Button variant="primary" type="submit" className="mt-3">
            Guardar Cambios
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProfileModal;
