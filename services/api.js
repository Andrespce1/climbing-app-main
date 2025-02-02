import axios from 'axios';

const api = axios.create({
  //baseURL: 'http://192.168.1.8:5000',
  baseURL: 'http://192.168.0.107:5000', 
  //baseURL: 'http://192.168.2.7:5000', 
  //baseURL: 'http://192.168.143.95:5000',
  timeout: 5000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
