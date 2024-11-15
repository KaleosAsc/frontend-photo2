import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PostService from '../../services/postService';
import '../../styles/global.css';

function PublicationsTable({ onDelete }) {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        const data = await PostService.getPost(); // Obtiene todas las publicaciones

        // Concatenar la URL base para las imágenes
        const updatedPublications = data.map(item => ({
          ...item,
          image_link: `${process.env.REACT_APP_API_PHOTO}${item.image_link}` // Concatenamos la URL base de las imágenes
        }));

        console.log("Publicaciones actualizadas con imágenes:", updatedPublications); // Verifica las publicaciones con la URL completa
        setPublications(updatedPublications); // Establece las publicaciones en el estado
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      }
    };

    fetchPublications();
  }, []); // Se ejecuta una vez cuando el componente se monta

  const handleDelete = async (item) => {
    try {
      // Llamamos al servicio para eliminar el post
      await PostService.deletePost(item.post_id);
      
      // Filtramos la publicación eliminada y actualizamos el estado
      const updatedPublications = publications.filter((publication) => publication.post_id !== item.post_id);
      setPublications(updatedPublications); // Actualiza el estado sin la publicación eliminada
    } catch (error) {
      console.error('Error al eliminar la publicación:', error);
    }
  };

  return (
    <div className="table-responsive w-100">
      <Table bordered className="text-center">
        <thead>
          <tr>
            <th scope="col">idPost</th>
            <th scope="col">Description</th>
            <th scope="col">Image</th>
            <th scope="col">User</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((item, index) => (
            <tr key={index}>
              <td>{item.post_id}</td>
              <td>{item.description_photo}</td>
              <td>
                <div className="image-gallery">
                  <div className="image-item">
                    <img 
                      src={item.image_link} 
                      alt={`Publication ${item.post_id}`} 
                      className="image" 
                      style={{ width: '200px', height: '200px' }} // Ajusta el tamaño según sea necesario
                    />
                  </div>
                </div>
              </td>
              <td>{item.user_id}</td>
              <td>
                <Button variant="dark" size="sm" onClick={() => handleDelete(item)}>
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PublicationsTable;