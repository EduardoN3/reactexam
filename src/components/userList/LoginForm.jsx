import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import { FaEnvelope, FaKey } from "react-icons/fa";

const LoginForm = ({ onLogin }) => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!correo || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        setError("");
        try {
            await onLogin({ correo, password });
            // La redirección ahora la maneja onLogin
        } catch (err) {
            setError("Credenciales incorrectas. Intenta nuevamente.");
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-card">
                <h1 className="auth-title">Bienvenido de nuevo</h1>
                <p className="auth-subtitle">Ingresa tus credenciales para continuar</p>
                {error && <div className="auth-error">{error}</div>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-input">
                        <FaEnvelope className="auth-icon" />
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="auth-input">
                        <FaKey className="auth-icon" />
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="auth-button">Entrar</button>
                </form>
                <div className="auth-footer">
                    <span>¿No tienes una cuenta?</span>
                    <button className="auth-link" onClick={() => navigate('/register')}>Regístrate</button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;