import axios from 'axios';

export default function getAxios() {
  let axiosInstance = axios.create({
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
