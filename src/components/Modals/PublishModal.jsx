import React, { useReducer, useEffect } from 'react';
import Post from '../../services/postService'; // Asegúrate de tener el servicio de fotos
import { Modal, Button, Form } from 'react-bootstrap';

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

const PublishModal = ({ show, handleClose, handlePublish }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Resetea los campos cada vez que el modal se abre
  useEffect(() => {
    if (show) {
      dispatch({ type: 'RESET' });
    }
  }, [show]);

  // Maneja los cambios en el campo de archivo
  const handleImageChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: 'image_link',
      value: e.target.files[0], // Captura el archivo seleccionado
    });
  };

  // Maneja los cambios en el campo de descripción
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
      const response = await Post.createPost(formData);
      console.log('Publicación creada:', response);

      // Cierra el modal si la publicación fue exitosa
      handleClose();
      // Muestra alerta de éxito
      window.alert('Publicación creada con éxito.');
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      // Muestra alerta de error
      window.alert('Hubo un error al crear la publicación. Inténtalo de nuevo.');
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Publicar Contenido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Agregar Foto</Form.Label>
            <Form.Control 
              type="file" 
              onChange={handleImageChange} 
              accept="image/*" 
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
