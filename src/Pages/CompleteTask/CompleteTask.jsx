import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../api/AxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import Card from "../../Comonents/Shared/TaskCard/Card";


const CompleteTask = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [completedTask, setCompletedTask] = useState([])
    const { data: tasks, isLoading } = useQuery({
        queryKey: ['taskDone'],
        queryFn: async () => {

            const res = await axiosSecure.get(`/task?email=${user?.email}`);
            return res.data;

        },
    });
    console.log(tasks)
    useEffect(() => {
        const filter = tasks?.filter(task => task?.status === 'completed')
        setCompletedTask(filter)
    }, [tasks])


    if (isLoading) {
        return <div><div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div></div>;
    }
    return (
        <div>
            <div className="py-2 border-b-4 flex justify-between">
                <h1 className="text-3xl font-medium flex items-center gap-4">Completed Task</h1>
                <Link to="/addTask"><p className="flex items-center"><CiCirclePlus size={20} color="red" /><span>Add</span></p></Link>
            </div>
            <div className="my-8 bg-slate-50 p-10 md:p-20 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 md:gap-6 lg:gap-8">
                    {
                        completedTask?.map(task => <Card key={task._id} task={task}></Card>)
                    }
                </div>

            </div>

        </div>
    );
};

export default CompleteTask;