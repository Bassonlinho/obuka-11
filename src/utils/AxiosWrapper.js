import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 404) {
      //prebaci na root rutu
      // window.location.replace("/");
      alert("User is not authorized for this action!");
    }
    // ako je 401 status kod (unauthorized)
    //https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
    if (error.response.status === 401) {
      // window.location.replace("/");
      alert("User is not authorized for this action!");
    }
    return Promise.reject(error);
  }
);

export default axios;
