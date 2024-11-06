import React, { useReducer, useEffect } from 'react';
import Post from '../../services/postService'; // Asegúrate de tener el servicio de fotos
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

// Estado inicial para el modal de agregar foto
const initialState = {
  image_link: null, // Cambiado a null para almacenar el archivo de imagen
  description_photo: '',
  five_stars: 0, // Estrellas fijas
  four_stars: 0, // Estrellas fijas
  three_stars: 0, // Estrellas fijas
  two_stars: 0, // Estrellas fijas
  one_stars: 0, // Estrellas fijas
  user_id: 1, // ID del usuario fijo en 1
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
  const navigate = useNavigate();

  // Resetea los campos cada vez que el modal se abre
  useEffect(() => {
    if (show) {
      dispatch({ type: 'RESET' });
    }
  }, [show]);

  // Maneja los cambios en los campos del formulario
  const handlePhotoChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: 'image_link',
      value: e.target.files[0], // Captura el archivo seleccionado
    });
  };

  const handleDescriptionChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: 'description_photo',
      value: e.target.value,
    });
  };

  // Maneja el envío del formulario
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Construir el objeto de datos a enviar
    const formData = new FormData();
    formData.append('image_link', state.image_link); // Almacena el archivo de imagen
    formData.append('description_photo', state.description_photo);
    formData.append('five_stars', state.five_stars); // Estrellas fijas
    formData.append('four_stars', state.four_stars); // Estrellas fijas
    formData.append('three_stars', state.three_stars); // Estrellas fijas
    formData.append('two_stars', state.two_stars); // Estrellas fijas
    formData.append('one_stars', state.one_stars); // Estrellas fijas
    formData.append('user_id', state.user_id); // user_id está definido en 1

    try {
      // Enviar los datos al servicio de fotos
      console.log(formData)
      const response = await Post.createPost(formData);
      console.log('Foto subida:', response);

      // Cierra el modal si la subida fue exitosa
      handleClose();
      // Muestra alerta de éxito
      window.alert('Foto subida con éxito.');
      
    } catch (error) {
      console.error('Error al subir la foto:', error);
      // Muestra alerta de error
      window.alert('Hubo un error al subir la foto. Inténtalo de nuevo.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Foto y Descripción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Seleccionar Foto</Form.Label>
            <Form.Control 
              type="file" 
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
              value={state.description}
              onChange={handleDescriptionChange}
              required // Este campo es obligatorio
            />
          </Form.Group>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Subir
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPhotoModal;
