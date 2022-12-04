import axios from 'axios'

 const axiosInstance = axios.create({
     baseURL:'https://storeapp-production.up.railway.app/api'
})  


export default axiosInstance;