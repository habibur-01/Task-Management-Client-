import { Link } from "react-router-dom";
import Card from "../../Comonents/Shared/TaskCard/Card";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../api/AxiosSecure/useAxiosSecure";
import progress from "../../assets/clipboard.png"

const ProgressTask = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [toDoTask, setToDoTask] = useState([])
    const { data: tasks, isLoading, refetch } = useQuery({
        queryKey: ['progresstask'],
        queryFn: async () => {

            const res = await axiosSecure.get(`/task?email=${user?.email}`);
            return res.data;

        },
    });
    console.log(toDoTask)
    useEffect(() => {
        const filter = tasks?.filter(task => task?.status === 'progress')
        setToDoTask(filter)
    }, [tasks])


    if (isLoading) {
        return <div><div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div></div>;
    }
    return (
        <div>
            <div className="py-2 border-b-4 flex justify-between">
                <h1 className="text-3xl font-medium flex items-center gap-4"><span><img src={progress} className="w-8 h-8 object-cover" alt="" /></span>Progress Task</h1>
                <Link to="/addTask"><p className="flex items-center"><CiCirclePlus size={20} color="red" /><span>Add</span></p></Link>
            </div>
            <div className="my-8 bg-slate-50 p-10 md:p-20 rounded-md">
                {
                    toDoTask?.length === 0 ? <div className="w-full h-[80vh] flex justify-center items-center">
                        <h1 className="text-2xl">There is no data available yet.</h1>
                    </div> :
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 md:gap-6 lg:gap-8">
                            {
                                toDoTask?.map(task => <Card key={task._id} task={task} refetch={refetch} ></Card>)
                            }
                        </div>
                }

            </div>

        </div>
    );
};

export default ProgressTask;