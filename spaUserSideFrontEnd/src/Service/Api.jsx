// import axios from 'axios';

// const api = axios.create({
//   baseURL: "http://localhost:3000/api/v1"
// });

// export default api;



import axios from 'axios';

const api = axios.create({
  baseURL: 'https://spamanagment.onrender.com/api/v1',
  withCredentials: true, // if using cookies
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
