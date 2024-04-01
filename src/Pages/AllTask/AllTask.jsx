// import { useEffect, useState } from "react";
import useAxiosSecure from "../../api/AxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import TaskCard from "../../Comonents/Shared/TaskCard/TaskCard";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import './alltask.css'
import { useEffect, useState } from "react";

const AllTask = () => {
    const { user } = useAuth()
    const [currentPage, setCurrentPage] = useState(0);
    const [userTask, setUserTask] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/task?page=${currentPage}&email=${user?.email}`)
            .then(res => {
                // console.log(res.data)

                setUserTask(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [axiosSecure, currentPage, user?.email])

    console.log(userTask)
    const pages = [...Array(userTask?.totalPages).keys()]
    const tasks = userTask?.tasks
    console.log(userTask?.tasks)

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    return (
        <div>
            <div className="py-2 border-b-4 flex justify-between">
                <h1 className="text-3xl font-medium flex items-center gap-4">All Task</h1>
                <Link to="/addTask"><p className="flex items-center"><CiCirclePlus size={20} color="red" /><span>Add</span></p></Link>
            </div>

            <div className="my-8 bg-slate-50 p-10 md:p-20 rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-4 md:gap-6 lg:gap-8">
                    {
                        tasks?.map(task => <TaskCard key={task._id} task={task} totalTask={userTask?.tasks} setUserTask={setUserTask}></TaskCard>)
                    }
                </div>

                <div className="mx-4 mt-8">

                    <button className="btn mr-2" disabled={currentPage === 0} onClick={handlePrevPage}>Prev</button>
                    {
                        pages.map(page => <button className={`btn mr-2 ${currentPage === page && 'selected'}`} onClick={() => setCurrentPage(page)} key={page}>{page}</button>)
                    }
                    <button className="btn mr-2" disabled={currentPage === pages.length - 1} onClick={handleNextPage}>Next</button>
                </div>

            </div>
        </div>
    );
};

export default AllTask;
