import axios from "axios";

axios.defaults.baseURL = "http://localhost:3002"

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.token =  token ? token : '';
    return config;
});


export const authentication = (info, defaultCallback, errorCallback) => {
    axios.post('/auth/login', info)
        .then(res => {
            console.log("ok")
            defaultCallback(res)
        })
        .catch(err => {errorCallback()})
}

export const getData = () => {
    const token = localStorage.getItem('token')
    axios.get('/products')
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {console.log(err.response.status)})
}