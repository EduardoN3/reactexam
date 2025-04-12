import React, { useState } from "react";
import './UserCreateForm.css';

const UserCreateForm = ({ onCreate, checkEmailExists }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
        return regex.test(password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }

        if (!validatePassword(password)) {
            setError("La contraseña debe tener al menos 10 caracteres, una mayúscula, una minúscula, un número y un símbolo.");
            return;
        }

        // Verificar si el correo ya existe
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            setError("⚠️ Este correo ya está registrado. Por favor, usa otro.");
            return;
        }

        const newUser = {
            name,
            email,
            password,
        };

        onCreate(newUser);

        // Limpiar campos
        setName('');
        setEmail('');
        setPassword('');
        setError('');
    };

    const handleCancel = () => {
        setName('');
        setEmail('');
        setPassword('');
        setError('');
    };

    return (
        <div className="auth-card">
            <h2>Registrar Nueva Cuenta</h2>
            {error && <p className="auth-error">{error}</p>}
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Nombre Completo</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Ej: Juan Pérez"
                    />
                </div>
                <div className="input-group">
                    <label>Correo Electrónico</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Ej: usuario@email.com"
                    />
                </div>
                <div className="input-group">
                    <label>Contraseña Segura</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Mínimo 10 caracteres"
                    />
                </div>
                <div className="action-buttons">
                    <button type="submit" className="primary-btn">Registrarse</button>
                    
                </div>
            </form>
        </div>
    );
};

export default UserCreateForm;
