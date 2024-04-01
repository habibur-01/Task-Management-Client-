import { useState } from "react";
import useAxiosSecure from "../api/AxiosSecure/useAxiosSecure";
import useAuth from "./useAuth";


const useTask = ( page ) => {
const axiosSecure = useAxiosSecure()
const {user} = useAuth()
const [userTask, setUserTask] = useState([])
axiosSecure.get(`/task?page=${page}&email=${user?.email}`)
.then(res => {
    console.log(res.data)
    setUserTask(res.data)
}).catch(err=>{
    console.log(err)
})

    return [userTask]
};

export default useTask;