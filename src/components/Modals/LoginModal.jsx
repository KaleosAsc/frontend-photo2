import React, { useReducer, useEffect } from 'react';
import User from '../../services/userService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Estado inicial para el formulario de inicio de sesión
const initialState = {
    username: '',
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

const LoginModal = ({ show, onClose }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleChange = (e) => {
        dispatch({
            type: 'SET_FIELD',
            field: e.target.id,
            value: e.target.value,
        });
    };

    // Resetea el formulario cada vez que se abre el modal
    useEffect(() => {
        if (show) {
            dispatch({ type: 'RESET' });
        }
    }, [show]);

    // Maneja el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Datos de inicio de sesión
        const data = {
            username: state.username,
            password: state.password,
        };

        try {
            // Llamada al servicio para iniciar sesión
            const response = await User.loginUsers(data);
            console.log('Usuario autenticado:', response);
            dispatch({ type: 'RESET' }); // Resetea el formulario tras el login
            navigate('/PaginaPrincipal'); // Redirigir a la página principal tras el login
        } catch (error) {
            console.error('Error en el inicio de sesión', error); // Manejar errores
        }
    };

    return (
        <>
            {show && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg col-8 mx-auto" style={{ maxWidth: '400px', marginTop: '-15vh' }} role="document">
                        <div className="modal-content col-8 mx-auto">
                            <div className="modal-header">
                                <h5 className="modal-title col-8 mx-auto">Login into DAPA</h5>
                                <button type="button" className="close" onClick={onClose}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form id="loginForm" onSubmit={handleSubmit}>
                                    <div className="form-group col-8 mx-auto">
                                        <label htmlFor="username">Username</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            value={state.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group col-8 mx-auto">
                                        <label htmlFor="password">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={state.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-secondary btn-block">Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginModal;
