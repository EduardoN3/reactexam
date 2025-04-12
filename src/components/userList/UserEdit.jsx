import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './UserEditForm.css';
import useUsers from "../../hooks/useUsers";

const UserEditForm = ({ onUpdate, onCancel }) => {
    const { userId } = useParams();
    const { users } = useUsers();
    const navigate = useNavigate();
    const [updatedUser, setUpdatedUser] = useState(null);

    useEffect(() => {
        const userToEdit = users.find(user => user.id === parseInt(userId));
        if (userToEdit) {
            setUpdatedUser(userToEdit);
        }
    }, [userId, users]);

    const handleChange = (e) => {
        setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!updatedUser.name || !updatedUser.email) {
            alert("Todos los campos son obligatorios");
            return;
        }

        if (onUpdate) {
            onUpdate(updatedUser.id, { ...updatedUser });
            navigate('/users');
        }
    };

    if (!updatedUser) return <div>Cargando usuario...</div>;

    return (
        <div className="form-container">
            <h2>Editar Usuario</h2>
            <form className="user-form" onSubmit={handleSubmit}>
                <label>Nombre:</label>
                <input
                    className="input-field"
                    name="name"
                    value={updatedUser.name}
                    onChange={handleChange}
                    required
                />
                <label>Email:</label>
                <input
                    className="input-field"
                    type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                    required
                />
                <div className="form-buttons">
                    <button className="submit-button" type="submit">Actualizar Usuario</button>
                    <button className="cancel-button" type="button" onClick={() => navigate('/users')}>Cancelar</button>
                </div>
            </form>
        </div>
    );
};

export default UserEditForm;