import axios from 'axios';

const API_URL = 'http://localhost:3001/api/contadores';

export const getContadores = () => axios.get(API_URL);
export const createContador = (contador) => axios.post(API_URL, contador);
export const deleteContador = (id) => axios.delete(`${API_URL}/${id}`);
export const updateContador = (id, data) => axios.put(`${API_URL}/${id}`, data);
