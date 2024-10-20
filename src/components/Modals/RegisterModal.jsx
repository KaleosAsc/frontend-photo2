import React, { useReducer } from 'react';
import User from  '../../services/userService';
import 'bootstrap/dist/css/bootstrap.min.css';



// Estado inicial
const initialState = {
   firstName: '',
   lastName: '',
   birthday: '',
   username: '',
   email: '',
   password: '',
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

const RegisterModal = ({ show, onClose, onRegister }) => {
   User.registerUsers();
   const [state, dispatch] = useReducer(reducer, initialState);
   const handleChange = (e) => {
      dispatch({
          type: 'SET_FIELD',
          field: e.target.id,
          value: e.target.value,
      });
  };

  const handleSubmit =  async (e) => {
      e.preventDefault();
      const data = {
         username: "johndoe",        // Nombre de usuario
         first_name: "John",         // Primer nombre
         last_name: "Doe",           // Apellido
         birthday: "1990-01-01",     // Fecha de nacimiento (formato YYYY-MM-DD)
         email: "johndoe@example.com", // Correo electrónico
         password: "securePassword123", // Contraseña
         description: "hola"         // Descripción o cualquier valor que desees
     };
     const jsonData = JSON.stringify(data);
     
         // Construir el objeto de datos a enviar
      //    const data = {
      //       username: state.username,
      //       first_name: state.firstName,
      //       last_name: state.lastName,
      //       birthday: state.birthday,
      //       email: state.email,
      //       password: state.password,
      //       description: "hola" // O cualquier valor que desees
      //   };
        console.log(data);
        try{
         const response =  await User.registerUsers(jsonData);
         console.log('Usuario registrado', response);
         dispatch({ type: 'RESET' }); // Resetea el formulario después de registrarse
        }catch(error){
         console.error('Error al registrar usuario', error);
        }


  };
    return (
        <>
            {show && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg" style={{ maxWidth: '400px' }} role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Regístrate gratis en DAPA</h5>
                                <button type="button" className="close" onClick={onClose}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="registerForm" onSubmit={(e) => { e.preventDefault(); onRegister(); }}>
                                    <div className="form-group">
                                        <label htmlFor="firstName">Nombre</label>
                                        <input type="text" className="form-control" id="firstName" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Apellido</label>
                                        <input type="text" className="form-control" id="lastName" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="birthday">Fecha de Cumpleaños</label>
                                        <input type="date" className="form-control" id="birthday" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">Usuario</label>
                                        <input type="text" className="form-control" id="username" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Correo Electrónico</label>
                                        <input type="email" className="form-control" id="email" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Contraseña</label>
                                        <input type="password" className="form-control" id="password" required />
                                    </div>
                                    <button type="submit" className="btn btn-secondary btn-block">Regístrate</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default RegisterModal;
