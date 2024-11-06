import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginModal = ({ show, onClose, onLogin }) => {
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
                                <form id="loginForm" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                                    <div className="form-group col-8 mx-auto">
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className="form-control" id="username" required />
                                    </div>
                                    <div className="form-group col-8 mx-auto">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className="form-control" id="password" required />
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
