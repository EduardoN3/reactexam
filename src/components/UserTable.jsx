import React, { useState, useEffect } from 'react';

const UserTable = () => {
const [users, setUsers] = useState([]);
const [search, setSearch] = useState("");

useEffect(() => {
    // Llamada a la API de EC2
    fetch('https://44.202.157.173/users') 
    .then(response => response.json())
    .then(data => setUsers(data))
    .catch((err) => console.error("Error fetching users:", err));
}, []);

const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
);

return (
    <div className="p-4">
    <input
        type="text"
        placeholder="Buscar usuario..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />
    <table className="w-full border-collapse border border-gray-400">
        <thead>
        <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Apellido</th>
        </tr>
        </thead>
        <tbody>
        {filteredUsers.map((user, index) => (
            <tr key={index} className="border">
            <td className="border p-2">{user.name}</td>
            <td className="border p-2">{user.email}</td>
            <td className="border p-2">{user.last_name}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
);
};

export default UserTable;
