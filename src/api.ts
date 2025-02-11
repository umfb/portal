import axios from "axios";

const api = axios.create({
  baseURL: "https://portal-server-1.onrender.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
const getAccessToken = () => localStorage.getItem("accessToken");
const setAccessToken = (token: string) =>
  localStorage.setItem("accessToken", token);
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          "https://portal-server-1.onrender.com/refresh",
          null,
          { withCredentials: true }
        );
        setAccessToken(data.accessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
