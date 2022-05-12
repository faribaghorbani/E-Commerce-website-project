import axios from "axios";

export const authentication = (info, defaultCallback, errorCallback) => {
    axios.post('http://localhost:3002/auth/login', info)
        .then(res => {
            console.log("ok")
            defaultCallback(res)
        })
        .catch(err => {errorCallback()})
}