import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:9090/api/todos', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
