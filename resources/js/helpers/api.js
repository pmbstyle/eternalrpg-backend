import axios from 'axios'
const $axios = axios
import router from '../router'
export default () => {
    let api = $axios.create({
        withCredentials: false,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    api.interceptors.response.use(
        function (response) {
            return response
        },
        function (error) {
            if (error.response.status === 401 || error.response.status === 419) {
                router.push({ name: 'login' })
            } else {
                return Promise.reject(error);
            }
        }
    )
    return api
}