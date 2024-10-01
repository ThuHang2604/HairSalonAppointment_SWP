import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7211/v1',
  timeout: 10000,
});
export default instance;
