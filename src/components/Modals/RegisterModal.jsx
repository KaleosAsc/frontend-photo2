import React, { useReducer, useEffect } from 'react';
import User from '../../services/userService';
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
    // Manejo de estado dependiendo de la acción
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

const RegisterModal = ({ show, onClose }) => {
    // useReducer para manejar el estado del formulario
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (e) => {
        dispatch({
            type: 'SET_FIELD',
            field: e.target.id,
            value: e.target.value,
        });
    };

    // Se resetea el formulario cada vez que el modal se abre
    useEffect(() => {
        if (show) {
            dispatch({ type: 'RESET' }); // Resetea el formulario cuando se abre el modal
        }
    }, [show]);

    // Método para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Construir el objeto de datos a enviar
        const data = {
            username: state.username,
            first_name: state.firstName,
            last_name: state.lastName,
            birthday: state.birthday,
            email: state.email,
            password: state.password,
            description: "hola" // O cualquier valor que desees
        };

        try {
            // Enviar los datos al servicio
            const response = await User.registerUsers(JSON.stringify(data));
            console.log('Usuario registrado', response);

            // Resetea el formulario después del registro
            dispatch({ type: 'RESET' });

            // Cerrar el modal
            onClose();

            // Mostrar una alerta para iniciar sesión
            window.alert('Registro exitoso. Por favor, inicia sesión para continuar.');
        } catch (error) {
            console.error('Error al registrar usuario', error); // Manejar errores
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
                                <form id="registerForm" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="firstName">Nombre</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="firstName"
                                            value={state.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Apellido</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="lastName"
                                            value={state.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="birthday">Fecha de Cumpleaños</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="birthday"
                                            value={state.birthday}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">Usuario</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="username"
                                            value={state.username}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Correo Electrónico</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            value={state.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Contraseña</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            value={state.password}
                                            onChange={handleChange}
                                            required
                                        />
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
