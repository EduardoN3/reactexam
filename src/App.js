// App.js
import React from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import useUsers from "./hooks/useUsers";
import UsersList from "./components/userList/UsersList";
import UserCreateForm from "./components/userList/UserCreateForm";
import UserEditForm from "./components/userList/UserEdit";
import LoginForm from "./components/userList/LoginForm";
import "./App.css";

const App = () => {
  const { users, loading: loadingUsers, addUser, editUser, deleteUserDetails, checkEmailExists, login } = useUsers();
  const navigate = useNavigate();

  const handleLogin = async (userCredentials) => {
    try {
      const result = await login(userCredentials.correo, userCredentials.password);
      if (result) {
        localStorage.setItem("loggedIn", "true");
        navigate('/users');
      } else {
        console.error("Credenciales incorrectas");
      }
    } catch (error) {
      console.error("Error logging in", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    navigate('/login');
  };

  const redirectToDocs = () => {
    window.location.href = "https://44.202.157.173/api/docs/";
  };

  const isAuthenticated = localStorage.getItem("loggedIn");

  return (
    <div className="container">
      <Routes>
        {/* Ruta de login */}
        <Route path="/login" element={
          <div className="section">
            <LoginForm onLogin={handleLogin} />
          </div>
        } />

        {/* Ruta de registro (pública) */}
        <Route path="/register" element={
          <div className="section">
            <h1>Registro</h1>
            <UserCreateForm onCreate={addUser} checkEmailExists={checkEmailExists} />
            <button onClick={() => navigate('/login')} className="back-to-login">Volver al Login</button>
          </div>
        } />

        <Route path="/users" element={
          isAuthenticated ? (
            <div className="section">
              <h1>Lista de Usuarios</h1>
              {loadingUsers ? <p className="loading-text">Cargando usuarios...</p> :
                <UsersList
                  users={users}
                  onEdit={(user) => navigate(`/users/edit/${user.id}`)}
                  onDelete={deleteUserDetails}
                />
              }
              <button onClick={() => navigate('/users/create')} className="create-user-button">
                Crear Nuevo Usuario
              </button>
              
              <center>
                <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
              </center>
            </div>
          ) : <Navigate to="/login" replace />
        } />

        {/* Ruta SEPARADA para crear usuarios */}
        <Route path="/users/create" element={
          isAuthenticated ? (
            <div className="section">
              <h1>Crear Nuevo Usuario</h1>
              <UserCreateForm onCreate={addUser} checkEmailExists={checkEmailExists} />
              <button
                onClick={() => navigate('/users')}
                className="back-button"
              >
                Volver a la lista
              </button>
            </div>
          ) : <Navigate to="/login" replace />
        } />


        <Route path="/users/edit/:userId" element={
          isAuthenticated ? (
            <div className="section">
              <UserEditForm
                onUpdate={editUser}
                onCancel={() => navigate('/users')}
              />
            </div>
          ) : <Navigate to="/login" replace />
        } />

        <Route path="/" element={<Navigate to={isAuthenticated ? "/users" : "/login"} replace />} />
      </Routes>
    </div>
  );
};

export default App;
