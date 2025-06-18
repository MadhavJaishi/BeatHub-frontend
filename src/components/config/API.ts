import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.REACT_APP_BASE_URL,
});

export default API;