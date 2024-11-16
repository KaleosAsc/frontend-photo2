import React, { useReducer, useEffect } from 'react';
import Post from '../../services/postService';
import { Modal, Button, Form } from 'react-bootstrap';

const initialState = {
  image_link: null,           // Almacena el archivo de imagen
  description_photo: '',
  five_stars: 0,
  four_stars: 0,
  three_stars: 0,
  two_stars: 0,
  one_stars: 0,
  user_id: 1,
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

const AddPhotoModal = ({ show, handleClose }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (show) {
      dispatch({ type: 'RESET' });
    }
  }, [show]);

  // Manejo de cambios en el archivo de imagen
  const handlePhotoChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: 'image_link',
      value: e.target.files[0],
    });
  };

  // Manejo de cambios en la descripción
  const handleDescriptionChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: 'description_photo',
      value: e.target.value,
    });
  };

  // Envío del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image_link', state.image_link);              // Archivo de imagen
    formData.append('description_photo', state.description_photo);
    formData.append('five_stars', state.five_stars);
    formData.append('four_stars', state.four_stars);
    formData.append('three_stars', state.three_stars);
    formData.append('two_stars', state.two_stars);
    formData.append('one_stars', state.one_stars);
    formData.append('user_id', localStorage.getItem("user_id"));

    try {

        // Imprimir los datos del FormData
        formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
        });
      const response = await Post.postPost(formData);
      console.log('Publicación creada:', response);

      handleClose();
      window.alert('Publicación creada con éxito.');
      window.location.reload();
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      window.alert('Hubo un error al crear la publicación. Inténtalo de nuevo.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Foto y Descripción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}> {/* Cambiado a handleFormSubmit */}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Seleccionar Foto</Form.Label>
            <Form.Control 
              type="file" 
              accept="image/*" 
              onChange={handlePhotoChange} 
              required 
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Escribe una descripción..."
              value={state.description_photo}
              onChange={handleDescriptionChange}
              required
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="mt-3">
            Subir
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPhotoModal;
