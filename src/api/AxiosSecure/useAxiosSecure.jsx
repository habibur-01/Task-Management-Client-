import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://task-management-server-4gc3simgq-habibur01s-projects.vercel.app',
    withCredentials: true
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { userLogOut } = useAuth()
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        return Promise.reject(error);
    })
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status
        // console.log('status error in interceptors', status)
        if (status === 401 || status === 403) {
            await userLogOut()
            navigate('/login')

        }
        return Promise.reject(error)
    })

    return axiosSecure;
};

export default useAxiosSecure;