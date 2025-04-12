import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const response = await fetch('https://44.202.157.173/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
                credentials: 'include' // Esto es importante para cookies/tokens
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.msg || 'Error en la autenticación');
            }
    
            const data = await response.json();
            
            if (!data.access_token) {
                throw new Error('Token de acceso no recibido');
            }
    
            localStorage.setItem('token', data.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
    
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>Iniciar Sesión</h2>
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Ingresar'}
                    </button>

                    <div className="auth-footer">
                        <p>¿No tienes cuenta?
                            <button
                                type="button"
                                onClick={() => navigate('/register')}
                                className="btn btn-link"
                            >
                                Regístrate aquí
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;