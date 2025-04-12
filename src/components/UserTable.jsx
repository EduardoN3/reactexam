import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('https://44.202.157.173/users/', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Error:', err));
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('¿Eliminar usuario?')) return;
        try {
            const token = localStorage.getItem('token');
            await fetch(`https://44.202.157.173/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleEdit = (user) => {
        setEditingId(user.id);
        setFormData({ name: user.name, email: user.email });
    };

    const handleUpdate = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://44.202.157.173/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setUsers(users.map(user =>
                    user.id === id ? { ...user, ...formData } : user
                ));
                setEditingId(null);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="user-table-container">
            <h2>Lista de Usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>
                                {editingId === user.id ? (
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>
                            <td>
                                {editingId === user.id ? (
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>
                            <td className="actions">
                                {editingId === user.id ? (
                                    <button
                                        onClick={() => handleUpdate(user.id)}
                                        className="save-button"
                                    >
                                        Guardar
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEdit(user)}
                                            className="edit-button"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className="delete-button"
                                        >
                                            Eliminar
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;