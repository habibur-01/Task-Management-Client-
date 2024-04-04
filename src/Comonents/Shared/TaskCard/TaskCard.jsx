import { PropTypes } from "prop-types"
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit, CiViewList } from "react-icons/ci";
import useAxiosSecure from "../../../api/AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
    const { projectName, priority, startDate, endDate, description, status, _id } = task
    const [isHovered, setIsHovered] = useState(false);
    const axiosSecure = useAxiosSecure()
    const handleDeleteTask = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/task/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {

                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
        axiosSecure.delete('/task')
    }

    return (
        <div>
            <div className="card xl:w-96 sm:w-80 bg-slate-200 text-black-content">
                <div className="card-body">
                    <h2 className="card-title">{projectName}</h2>
                    <p className="text-wrap">{description.slice(0, 200)}</p>

                    <div className="card-actions justify-between items-baseline">
                        <div className="mt-2">
                            <p><span className="py-1 px-2 bg-slate-100 text-xs rounded-xl ">{startDate.split('T')[0]}</span> <span className="py-1 px-2 text-xs bg-slate-100 rounded-xl ">{endDate.split('T')[0]}</span></p>
                            <div className="mt-3">
                                <button className="btn btn- border-none btn-xs text-xs px-2 uppercase inline mr-2 hover:bg-[#ff9f9f]">
                                    {status}
                                </button>
                                
                            </div>
                        </div>
                        <div className="pt-8 flex gap-2">
                            <div>
                                <CiViewList size={21} onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)} />
                                {isHovered && (
                                    <div className="absolute bottom-2 right-20 bg-gray-100 text-gray-800 text-xs p-2 rounded shadow">
                                        Priority level- {priority}
                                    </div>
                                )}
                            </div>
                            <Link to="/updateTask" state={task}><CiEdit size={22} className="hover:cursor-pointer" /></Link>
                            <AiOutlineDelete size={22} className="hover:cursor-pointer" onClick={() => handleDeleteTask(_id)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
TaskCard.propTypes = {
    task: PropTypes.object,
    // totalTask: PropTypes.array,
    // setUserTask: PropTypes.any

}

export default TaskCard;