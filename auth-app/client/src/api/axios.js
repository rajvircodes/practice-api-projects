import axios from 'axios'

const API = axios.create({
    baseURL:'localhost://http:5000/api'
})

API.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Beared ${token}`
    }
    return config
})

export default API