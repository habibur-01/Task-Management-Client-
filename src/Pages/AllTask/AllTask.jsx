// import { useEffect, useState } from "react";
import useAxiosSecure from "../../api/AxiosSecure/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import TaskCard from "../../Comonents/Shared/TaskCard/TaskCard";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";
import './alltask.css'
import { useEffect, useState } from "react";
import list from "../../assets/TaskList/task (1).png"

const AllTask = () => {
    const { user, loading } = useAuth()
    const [currentPage, setCurrentPage] = useState(0);
    const [userTask, setUserTask] = useState([])
    const axiosSecure = useAxiosSecure()

    useEffect(() => {
        axiosSecure.get(`/task/paginate?page=${currentPage}&email=${user?.email}`)
            .then(res => {
                // console.log(res.data)

                setUserTask(res.data)
            }).catch(err => {
                console.log(err)
            })
    }, [axiosSecure, currentPage, user?.email])
    if (loading) {
        return (<div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>)
    }

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
                <h1 className="text-3xl font-medium flex items-center gap-4"> <span><img src={list} className="w-8 h-7 object-cover" alt="" /></span>All Task</h1>
                <Link to="/addTask"><p className="flex items-center"><CiCirclePlus size={20} color="red" /><span>Add</span></p></Link>
            </div>

            <div className="my-8 bg-slate-50 py-10 xl:p-10 rounded-md">
                {
                    tasks?.length === 0 ? <div className="w-full h-[80vh] flex justify-center items-center">
                        <h1 className="text-2xl">There is no data available yet.</h1>
                    </div> :
                        <div className="flex justify-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 mx-4 gap-6 lg:gap-8">

                                {
                                    tasks?.map(task => <TaskCard key={task._id} task={task} totalTask={userTask?.tasks} setUserTask={setUserTask}></TaskCard>)
                                }
                            </div>
                        </div>

                }



                <div className="mx-4 mt-8 lg:flex lg:justify-center lg:mt-14  ">

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
