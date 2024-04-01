import { PropTypes } from "prop-types"
import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import useAxiosSecure from "../../../api/AxiosSecure/useAxiosSecure";

const TaskCard = ({ task }) => {
    const { projectName, priority, startDate, endDate, description, status, _id } = task
    const [isHovered, setIsHovered] = useState(false);
    const axiosSecure = useAxiosSecure()
    const handleDeleteTask = (id) => {
        axiosSecure.delete('/task')
    }
    const handleUpdateTask = (task) => {

    }
    return (
        <div>
            <div className="card w-96 bg-slate-200 text-black-content">
                <div className="card-body">
                    <h2 className="card-title">{projectName}</h2>
                    <p className="text-wrap">{description.slice(0,200)}</p>
                    
                    <div className="card-actions justify-between items-baseline">
                        <div className="mt-2">
                            <p><span className="py-1 px-2 bg-slate-100 rounded-xl ">{startDate.split('T')[0]}</span> <span className="py-1 px-2 bg-slate-100 rounded-xl ">{endDate.split('T')[0]}</span></p>
                            <div className="mt-3">
                                <button className="btn btn- border-none btn-sm text-sm uppercase inline mr-2 hover:bg-[#ff9f9f]">{status}</button>
                                <button className="btn btn-xs" onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}>{priority}</button>
                                {isHovered && (
                                    <div className="absolute bottom-2 right-20 bg-gray-100 text-gray-800 text-xs p-2 rounded shadow">
                                        Priority level
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="pt-8 flex gap-2">
                            <CiEdit size={22} className="hover:cursor-pointer" onClick={()=>handleUpdateTask(task)}/>
                            <AiOutlineDelete size={22} className="hover:cursor-pointer" onClick={()=>handleDeleteTask(_id)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
TaskCard.propTypes = {
    task: PropTypes.any
}

export default TaskCard;