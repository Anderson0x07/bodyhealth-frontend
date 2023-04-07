import axios from "axios";

const API_BASE_URL = "http://localhost:8080";
const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

export const procesarPeticionGet = async (endpoint) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  const response = await axios.get(url, config)
  return response;
};

export const procesarPeticionPost = async (endpoint, datos) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  let response;

  if (token !== null) {
    response = await axios.post(url, datos, config)
  } else {
    response = await axios.post(url, datos)
  }

  return response;
};

export const procesarPeticionPut = async (endpoint, datos) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  const response = await axios.put(url, datos, config)
  return response;
};

export const procesarPeticionDelete = async (endpoint) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  const response = await axios.delete(url, config)
  return response;
};


export const procesarPeticionPdf = async (endpoint) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  const response = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    responseType: 'arraybuffer'
  });
  return response;
};