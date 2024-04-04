import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://task-management-server-4gc3simgq-habibur01s-projects.vercel.app',
    withCredentials: true
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;