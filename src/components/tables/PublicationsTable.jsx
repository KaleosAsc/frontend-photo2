import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import UpdatePublicationModal from '../Modals/UpdatePublicationModal'; // Modal para actualizar publicaciones
import PostService from '../../services/postService'; // Importa tu servicio de publicaciones

const BASE_URL = 'http://127.0.0.1:8000/'; // Cambia esto según tu configuración

const PublicationsTable = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [publications, setPublications] = useState([]); // Estado para almacenar las publicaciones
  const [selectedPublication, setSelectedPublication] = useState(null); // Estado para almacenar la publicación seleccionada

  // Función para obtener publicaciones al cargar el componente
  const fetchPublications = async () => {
    try {
      const data = await PostService.getPosts(); // Obtiene las publicaciones usando tu servicio
      // Concatenar la URL base con el enlace de la imagen
      const updatedPublications = data.map(item => ({
        ...item,
        image_link: `${BASE_URL}${item.image_link}`
      }));
      setPublications(updatedPublications); // Almacena las publicaciones en el estado
    } catch (error) {
      console.error('Error fetching publications:', error);
    }
  };

  // Llama a fetchPublications al montar el componente
  useEffect(() => {
    fetchPublications();
  }, []);

  const handleShowUpdateModal = (publication) => {
    setSelectedPublication(publication); // Almacena la publicación seleccionada para editar
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedPublication(null); // Resetea la publicación seleccionada
  };

  const handleDeletePublication = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta publicación?')) {
      try {
        await PostService.deletePost(id);
        fetchPublications(); // Actualiza la tabla después de eliminar
      } catch (error) {
        console.error('Error eliminando publicación:', error);
      }
    }
  };

  const handleUpdatePublication = async () => {
    await fetchPublications(); // Vuelve a cargar la lista de publicaciones después de actualizar
    handleCloseUpdateModal(); // Cierra el modal de actualización
  };

  return (
    <div className="table-responsive w-100">
      <Table bordered className="text-center">
        <thead>
          <tr>
            <th scope="col">User ID</th>
            <th scope="col">Post ID</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        {publications.map((item) => (
          <tr key={item.post_id}>
            <td>{item.user_id_id || item.user_id}</td>
            <td>{item.post_id}</td>
            <td>{item.description_photo}</td>
            <td>
              <img 
                src={item.image_link} 
                alt={`Foto de publicación ${item.post_id}`} 
                style={{ width: '100px', height: 'auto' }} 
                onError={() => console.error(`Error al cargar la imagen: ${item.image_link}`)} 
              />
            </td>
            <td>
              <Button variant="dark" size="sm" onClick={() => handleShowUpdateModal(item)}>
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
              <Button variant="dark" size="sm" onClick={() => handleDeletePublication(item.post_id)}>
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>

      {/* Modal para actualizar publicación */}
      <UpdatePublicationModal 
        show={showUpdateModal} 
        handleClose={handleCloseUpdateModal} 
        publication={selectedPublication} 
        onUpdate={handleUpdatePublication} 
      />
    </div>
  );
};

export default PublicationsTable;
