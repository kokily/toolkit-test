import axios from 'axios';

const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:4000/api'
      : 'https://paysys.kr/api',
  withCredentials: true,
});

export default client;
