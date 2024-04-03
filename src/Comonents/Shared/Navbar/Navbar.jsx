import { NavLink, useNavigate } from "react-router-dom";
import profile from "../../../assets/profile.png"
import settings from "../../../assets/update.png"
import todo from "../../../assets/to-do-list.png"
import { CiCirclePlus, CiLogin, CiLogout } from "react-icons/ci";
import complete from "../../../assets/Complete/completed-task.png"
import allTask from "../../../assets/TaskList/task (1).png"
import today from "../../../assets/clipboard.png"
import { AiOutlineNotification } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import { MdAssignmentInd, MdOutlineDashboard } from "react-icons/md";
import './navbar.css'
import { useState } from "react";
import { FaRegUser, FaUsers } from "react-icons/fa";

const Navbar = () => {
    const { user, userLogOut } = useAuth()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const handleLogOut = () => {
        userLogOut()
        navigate('/login')
    }
    const isAdmin = true

    return (
        <div className="w-64 bg-slate-300 min-h-screen px-4 py-5 relative">
            <div className="flex justify-center items-center ">
                <div className="space-y-4 w-full flex flex-col justify-center items-center">
                    <div className="w-14 h-14 rounded-full">
                        {
                            user ? <div className="w-14 h-14 rounded-full">
                                {
                                    user?.photoURL ? <img src={user?.photoURL} className="w-full  h-full object-cover rounded-full" alt="" /> :
                                        <img src={profile} className="w-full  h-full object-cover rounded-full" alt="" />
                                }
                            </div> :
                                <div className="w-14 h-14 rounded-full">
                                    <img src={profile} className="w-full  h-full object-cover rounded-full" alt="" />

                                </div>}

                    </div>
                    <div className="text-center">
                        <h2 className="text-sm">{user ? <>{user.email}</> : 'User Email'}</h2>
                        <h1 className="text-base font-medium">{user ? <>{user.displayName}</> : 'User Name'}</h1>
                    </div>
                </div>
                <div className="flex gap-2 absolute top-4 right-2">
                    <div className="cursor-pointer hover:scale-110">
                        <AiOutlineNotification size={20} />
                    </div>
                    <div className="relative w-5 h-5 cursor-pointer hover:scale-110" onClick={() => setIsOpen(!isOpen)}>
                        <img src={settings} className="w-full h-full" alt="" />
                        {
                            isOpen && <div className="absolute bg-white p-4 rounded-md right-0 top-8 w-32 text-sm space-y-4">
                                <li className="list-none"><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
                                <li className="list-none"><NavLink to={"/editprofile"}>Profile</NavLink></li>
                            </div>
                        }
                    </div>
                </div>
            </div><hr className="my-5" />
            <div>
                <ul className="space-y-6" id="sidebar">
                    {
                        isAdmin ?
                            <><li><NavLink to="/signup" ><span className="flex items-center gap-2"><FaRegUser size={16} color="green" /> Add User </span></NavLink></li>
                                <li><NavLink to="/allusers"><span className="flex items-center gap-2"><FaUsers size={20}/> All Users </span></NavLink></li>
                                <li><NavLink to="/dashboard"><span className="flex items-center gap-2"><MdOutlineDashboard size={20} /> Dashboard </span></NavLink></li>
                                <li onClick={handleLogOut}><NavLink to=""><span className={`flex items-center gap-2 ${user ? 'block' : 'hidden'}`}><CiLogout size={20} /> Log out </span></NavLink></li></>
                            :
                            <><li><NavLink to="/addTask" ><span className="flex items-center gap-2"><CiCirclePlus size={20} color="red" /> Add Task </span></NavLink></li>
                                <li><NavLink to="/progress"><span className="flex items-center gap-2"><img src={today} alt="" className="w-7 h-6 object-cover" /> Progress </span></NavLink></li>
                                <li><NavLink to="/todo"><span className="flex items-center gap-2"><img src={todo} alt="" className="w-6 h-6 object-cover mr-1" /> To Do </span></NavLink></li>
                                <li><NavLink to="/complete"><span className="flex items-center gap-2"><img src={complete} alt="" className="w-7 h-6 object-cover" /> Completed </span></NavLink></li>
                                <li><NavLink to="/allTask"><span className="flex items-center gap-2"><img src={allTask} alt="" className="w-7 h-6 object-cover" /> All Task </span></NavLink></li>
                                <li><NavLink to="/signup"><span className={`flex items-center gap-2 ${user ? 'hidden' : 'block'}`}><MdAssignmentInd size={20} />Signup </span></NavLink></li>
                                <li><NavLink to="/login"><span className={`flex items-center gap-2 ${user ? 'hidden' : 'block'}`}><CiLogin size={20} />  Login </span></NavLink></li>
                                <li onClick={handleLogOut}><NavLink to=""><span className={`flex items-center gap-2 ${user ? 'block' : 'hidden'}`}><CiLogout size={20} /> Log out </span></NavLink></li></>
                    }

                </ul>
            </div>

        </div>
    );
};

export default Navbar;