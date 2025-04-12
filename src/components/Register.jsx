import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Register.css'; 

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://44.202.157.173/users/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });
            if (response.ok) {
                navigate('/login');
            } else {
                alert('Error al registrar. Verifica tus datos.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2 className="register-title">Registro</h2>
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="register-input"
                        />
                    </div>
                    <button type="submit" className="register-submit-btn">
                        Registrarse
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/login')} 
                        className="register-back-btn"
                    >
                        Volver al Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;