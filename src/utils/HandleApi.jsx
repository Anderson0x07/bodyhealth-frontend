import axios from "axios";

const API_BASE_URL = "https://api.antech-software.com";
const token = localStorage.getItem('token');
const config = {
  headers: { Authorization: `Bearer ${token}` }
};

export const procesarPeticionGet = (endpoint) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  const response = axios.get(url, config);

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

export const procesarPeticionLogin = (endpoint) => {
  const url = `${API_BASE_URL}/${endpoint}`;

  const promise = axios.get(url, config);

  return getSuspender(promise);
};

function getSuspender(promise) {
  let status = 'pending';
  let response;

  const suspender = promise.then(
    (res) => {
      status = "success";
      response = res;
    },
    (err) => {
      status = "error";
      response = err;
    }
  );


  const read = () => {
    switch (status) {
      case "pending":
        throw suspender;
      case "error":
        throw response;
      default:
        return response;
    }
  }

  return { read };

}

