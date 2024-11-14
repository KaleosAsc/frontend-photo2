import React, { useReducer, useEffect } from 'react';
import Post from '../../services/postService';
import { Modal, Button } from 'react-bootstrap';

const initialState = {
  image_link: null, // Almacena el archivo de imagen
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

const PublishModal = ({ show, handleClose }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (show) {
      dispatch({ type: 'RESET' });
    }
  }, [show]);

  const handleImageChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: 'image_link',
      value: e.target.files[0],
    });
  };

  const handleDescriptionChange = (e) => {
    dispatch({
      type: 'SET_FIELD',
      field: 'description_photo',
      value: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image_link', state.image_link);
    formData.append('description_photo', state.description_photo);
    formData.append('five_stars', state.five_stars);
    formData.append('four_stars', state.four_stars);
    formData.append('three_stars', state.three_stars);
    formData.append('two_stars', state.two_stars);
    formData.append('one_stars', state.one_stars);
    formData.append('user_id', localStorage.getItem("user_id"));

    try {
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
        <Modal.Title>Publicar Contenido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleFormSubmit}> {/* Cambiado a handleFormSubmit */}
          <div className="form-group">
            <label htmlFor="image">Agregar foto</label>
            <input 
              type="file" 
              className="form-control" 
              id="image" 
              name="image" 
              accept="image/*" 
              onChange={handleImageChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción</label>
            <textarea 
              className="form-control" 
              id="description" 
              name="description" 
              rows="3" 
              value={state.description_photo} 
              onChange={handleDescriptionChange} 
              required 
            ></textarea>
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
