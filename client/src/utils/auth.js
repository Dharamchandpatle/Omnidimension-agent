// Auth utility: handles login, register, token storage, attach JWT to axios
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const auth = {
  login: async (email, password, rememberMe) => {
    // Placeholder backend endpoint
    const res = await axios.post(`${BACKEND_URL}/login`, { email, password });
    if (res.data && res.data.token) {
      if (rememberMe) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      } else {
        sessionStorage.setItem('token', res.data.token);
        sessionStorage.setItem('user', JSON.stringify(res.data.user));
      }
      return res.data.user;
    }
    throw new Error('Invalid login');
  },
  register: async (name, email, password) => {
    const res = await axios.post(`${BACKEND_URL}/register`, { name, email, password });
    if (res.data && res.data.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data.user;
    }
    throw new Error('Registration failed');
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  },
  getToken: () => {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || "null");
  }
};

// Attach auth token to all axios requests
axios.interceptors.request.use(config => {
  const token = auth.getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default auth;