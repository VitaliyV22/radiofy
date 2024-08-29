import axios from 'axios';


export const register = async (username, email, password) => {
  return await axios.post("http://localhost:8080/api/register", { username, email, password });
};

export const login = async (email, password) => {
  return await axios.post("http://localhost:8080/api/login", { email, password });
};

export const getProfile = async (token) => {
  return await axios.get(`${API_URL}/me`, {
    headers: { Authorization: token }
  });
};
