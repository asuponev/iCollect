import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${window.localStorage.getItem('token')}`;

  return config;
})

export default instance;