import { NavLink } from "react-router-dom";
import profile from "../../../assets/profile.png"
import settings from "../../../assets/update.png"
import todo from "../../../assets/to-do-list.png"
import { CiCirclePlus } from "react-icons/ci";
import complete from "../../../assets/Complete/completed-task.png"
import allTask from "../../../assets/TaskList/task (1).png"
import today from "../../../assets/clipboard.png"
import { AiOutlineNotification } from "react-icons/ai";

const Navbar = () => {
    return (
        <div className="w-64 bg-slate-300 min-h-screen px-4 py-5 relative">
            <div className="flex justify-center items-center ">
                <div className="space-y-4 w-full flex flex-col justify-center items-center">
                    <div className="w-14 h-14">
                        <img src={profile} className="w-full  h-full object-cover rounded-full" alt="" />

                    </div>
                    <div className="text-center">
                        <h2 className="text-sm">User Email</h2>
                        <h1 className="text-base font-medium">User Name</h1>
                    </div>
                </div>
                <div className="flex gap-2 absolute top-4 right-2">
                    <div>
                        <AiOutlineNotification size={20} />
                    </div>
                    <div className="w-5 h-5">
                        <img src={settings} className="w-full h-full" alt="" />
                    </div>
                </div>
            </div><hr className="my-5" />
            <div>
                <ul className="space-y-6">
                    <li><NavLink to="/addTask" ><span className="flex items-center gap-2"><CiCirclePlus size={20} color="red" /> Add Task </span></NavLink></li>
                    <li><NavLink to="/today"><span className="flex items-center gap-2"><img src={today} alt="" className="w-7 h-6 object-cover" /> Today </span></NavLink></li>
                    <li><NavLink to="/todo"><span className="flex items-center gap-2"><img src={todo} alt="" className="w-6 h-6 object-cover mr-1" /> To Do </span></NavLink></li>
                    <li><NavLink to="/complete"><span className="flex items-center gap-2"><img src={complete} alt="" className="w-7 h-6 object-cover" /> Complete </span></NavLink></li>
                    <li><NavLink to="/allTask"><span className="flex items-center gap-2"><img src={allTask} alt="" className="w-7 h-6 object-cover" /> All Task </span></NavLink></li>
                </ul>
            </div>

        </div>
    );
};

export default Navbar;