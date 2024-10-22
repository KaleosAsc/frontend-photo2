import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/global.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RegisterModal from '../Modals/RegisterModal'; // Importa el RegisterModal
import UpdateUserModal from '../Modals/UpdateUserModal'; // Importa el UpdateUserModal
import UserService from '../../services/userService'; // Asegúrate de importar el servicio

const TablaUsuarios = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [users, setUsers] = useState([]); // Estado para almacenar usuarios
  const [selectedUserId, setSelectedUserId] = useState(null); // Estado para almacenar el ID del usuario seleccionado
  const navigate = useNavigate();

  const handleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  };

  const handleRegister = async () => {
    await fetchUsers(); // Vuelve a cargar los usuarios después de registrar
    navigate('/PaginaPrincipal');
    handleRegisterModal(); 
  };

  const handleShowUpdateModal = (id) => {
    setSelectedUserId(id); // Almacena el ID del usuario que se quiere actualizar
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedUserId(null); // Resetea el ID seleccionado
  };

  // Función para obtener usuarios al cargar el componente
  const fetchUsers = async () => {
    try {
      const data = await UserService.getUsers();
      setUsers(data); // Almacena los usuarios en el estado
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Llama a fetchUsers al montar el componente
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para eliminar un usuario
  const handleDeleteUser = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await UserService.deleteUsers(id);
        fetchUsers(); // Actualiza la tabla después de eliminar
      } catch (error) {
        console.error('Error eliminando usuario:', error);
      }
    }
  };

  // Función para actualizar un usuario
  const handleUpdateUser = async () => {
    await fetchUsers(); // Vuelve a cargar la lista de usuarios después de actualizar
    handleCloseUpdateModal(); // Cierra el modal de actualización
  };

  return (
    <div className="container-fluid">
      {/* Contenedor principal */}
      <div className="row">
        {/* Barra de navegación superior */}
        <div className="row align-items-center bg-dark py-2">
          <div className="col-12 col-sm-2 text-center text-sm-start mb-2 mb-sm-0">
            <a href="/PaginaPrincipal">
              <img src="logo/LOGO_DAPA_.svg" alt="Logo DAPA" className="img-fluid" style={{ height: '80px' }} />
            </a>
          </div>
          <div className="col-12 col-sm-6 mb-2 mb-sm-0">
            <div className="search-container d-flex justify-content-center justify-content-sm-start">
              <input type="text" className="form-control me-2" placeholder="Search..." />
              <button className="btn btn-light search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
          <div className="col-12 col-sm-4 d-flex justify-content-center justify-content-sm-end align-items-center">
            <div className="btn-group mb-2 mb-sm-0">
              <button className="btn btn-link text-light me-2" onClick={() => navigate('/paginaPerfil')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                Perfil
              </button>
              <button className="btn btn-link text-light me-2" onClick={() => navigate('/PaginaPublicaciones')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                Tabla Publicaciones
              </button>
              <button className="btn btn-link text-light me-2" onClick={() => navigate('/TablaUsuarios')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                Tabla Usuarios
              </button>
              <button className="btn btn-link text-light me-2" onClick={() => navigate('/Pagina')} style={{ textDecoration: 'none', fontSize: '16px' }}>
                Exit
              </button>
            </div>
            <img src="imagenes/imagen2.jpeg" alt="Profile Icon" className="rounded-circle" style={{ height: '50px', width: '50px' }} />
          </div>
        </div>

        {/* Sección de contenido principal */}
        <div className="col-12 d-flex flex-column align-items-center">
          <h1 className="my-3 text-center">DAPA — De artistas, para artistas</h1>
          <div className="table-responsive w-100">
            <Table bordered className="text-center">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Cumpleaños</th>
                  <th scope="col">Usuario</th>
                  <th scope="col">Correo</th>
                  <th scope="col">
                    {/* Botón para abrir el modal de registro */}
                    <Button variant="dark" size="sm" onClick={handleRegisterModal}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.user_id}>
                    <td>{user.user_id}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>{user.birthday}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button variant="dark" size="sm" onClick={() => handleShowUpdateModal(user.user_id)}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </Button>
                      <Button variant="dark" size="sm" onClick={() => handleDeleteUser(user.user_id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Modal para registrar usuario */}
      <RegisterModal show={showRegisterModal} onClose={handleRegisterModal} onRegister={handleRegister} />
      {/* Modal para actualizar usuario */}
      <UpdateUserModal show={showUpdateModal} handleClose={handleCloseUpdateModal} userId={selectedUserId} onUpdate={handleUpdateUser} />
    </div>
  );
}

export default TablaUsuarios;