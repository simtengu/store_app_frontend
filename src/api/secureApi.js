import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'https://storeapp-production.up.railway.app/api'
})
axiosInstance.interceptors.request.use(function (config){
    let token = localStorage.getItem('store_app_token');
    config.headers["Authorization"] = "Bearer " + token;
    return config;

})



export default axiosInstance;