/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

// Séparé du provider pour éviter le warning Fast Refresh
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  // Initialiser l'état directement depuis localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      // Set axios header immédiatement
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return JSON.parse(storedUser);
    }
    return null;
  });
  
  const navigate = useNavigate();

  // Register
  const register = async (userData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', userData);
      
      const { token, ...userWithoutToken } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutToken));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userWithoutToken);
      toast.success('Inscription réussie !');
      navigate('/dashboard');
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de l\'inscription';
      toast.error(message);
      throw error;
    }
  };

  // Login
  const login = async (credentials) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
      
      const { token, ...userWithoutToken } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutToken));
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userWithoutToken);
      toast.success('Connexion réussie !');
      navigate('/dashboard');
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Erreur lors de la connexion';
      toast.error(message);
      throw error;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Déconnexion réussie');
    navigate('/login');
  };

  const value = {
    user,
    register,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};