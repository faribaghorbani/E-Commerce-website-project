import axios from "axios";

axios.defaults.baseURL = "http://localhost:3002"
axios.defaults.timeout = 4000

axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.token =  token ? token : '';
    return config;
});


export const authentication = (info, defaultCallback, errorCallback) => {
    axios.post('/auth/login', info)
        .then(res => {
            defaultCallback(res)
        })
        .catch(err => {errorCallback()})
}

export const getData = (url, defaultCallback, errorCallback) => {
    // const token = localStorage.getItem('token')
    axios.get(url)
        .then(res => {
            defaultCallback(res.data)
        })
        .catch(err => {
            if (err.response.status == 401) {
                localStorage.removeItem('token')
                errorCallback()
            }
        })
}

export const getDataUser = (url, defaultCallback, errorCallback) => {
    // const token = localStorage.getItem('token')
    axios.get(url)
        .then(res => {
            defaultCallback(res.data)
        })
        .catch(err => {
             errorCallback()
        })
}