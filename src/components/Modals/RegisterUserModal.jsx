// src/components/RegisterUserModal.js
import React from 'react';
import { useReducer,useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

const intialState = {
  firstName: '',
  lastName: '',


  
}
function reducer(state,action){

}

function RegisterUserModal({ show, handleClose }) {
  const [state,dispatch] = useReducer(reducer, )
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registrar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form id="registerUserForm">
          <div className="form-group">
            <label htmlFor="registerUserName">Nombre</label>
            <input type="text" className="form-control" id="registerUserName" required />
          </div>
          <div className="form-group">
            <label htmlFor="registerUserLastName">Apellido</label>
            <input type="text" className="form-control" id="registerUserLastName" required />
          </div>
          <div className="form-group">
            <label htmlFor="registerUserBirthday">Fecha de Nacimiento</label>
            <input type="date" className="form-control" id="registerUserBirthday" required />
          </div>
          <div className="form-group">
            <label htmlFor="registerUseruser">User</label>
            <input type="text" className="form-control" id="registerUseruser" required />
          </div>
          <div className="form-group">
            <label htmlFor="registerUserEmail">Email</label>
            <input type="email" className="form-control" id="registerUserEmail" required />
          </div>
          <div className="form-group">
            <label htmlFor="registerUserPassword">Contraseña</label>
            <input type="password" className="form-control" id="registerUserPassword" required />
          </div>
          <Button variant="dark" type="submit">
            Registrar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default RegisterUserModal;
