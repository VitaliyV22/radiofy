import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  url = "https://radiofy-server.onrender.com"

  const login = async (email, password) => {
    try {
      const response = await axios.post(url + '/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
      window.location.reload()
    } catch (error) {
      console.error('Login failed:', error.response.data);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(url + '/api/auth/register', { username, email, password });
      navigate('/login');
      window.location.reload
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      throw error;
    }
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(url + '/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Failed to fetch user data:', error.response.data);
      throw error;
    }
  };

  return { user, login, register, getProfile };
};

export default useAuth;
