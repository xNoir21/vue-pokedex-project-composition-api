import axios from 'axios';

export default function getAxios() {
  const baseUrl = 'https://pokeapi.co/api/v2/';
  let axiosInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Prefer: 'odata.include-annotations=*',
    },
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
}
