import axios from 'axios'

   let token = localStorage.getItem('store_app_token');
    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api',
        headers: {
            authorization: `Bearer ${token}`
        }
    })



export default axiosInstance;