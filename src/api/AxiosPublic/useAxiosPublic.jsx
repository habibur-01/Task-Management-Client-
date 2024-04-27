import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://task-management-server-seven-steel.vercel.app',
    withCredentials: true
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;