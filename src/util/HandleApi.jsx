import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const procesarPeticionGet = async (ruta) => {
  const url = `${API_BASE_URL}/${ruta}`;

  const response = await axios.get(url);
  return response;
};

export const procesarPeticionPost = async (ruta, datos) => {
  const url = `${API_BASE_URL}/${ruta}`;

  const response = await axios.post(url, datos);
  return response;
};

export const procesarPeticionPut = async (ruta, datos) => {
  const url = `${API_BASE_URL}/${ruta}`;

  const response = await axios.put(url, datos);
  return response;
};

export const procesarPeticionDelete = async (ruta) => {
  const url = `${API_BASE_URL}/${ruta}`;

  const response = await axios.delete(url);
  return response;
};
