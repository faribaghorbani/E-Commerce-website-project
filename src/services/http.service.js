import axios from "axios";

export const authentication = (info, callback) => {
    axios.post('http://localhost:3002/auth/login', info)
        .then(res => {
            console.log(res.status)
            localStorage.setItem("token", res.data.token)
            callback(res.data.token)
        })
        .catch(err => {console.log(err.data)})
}