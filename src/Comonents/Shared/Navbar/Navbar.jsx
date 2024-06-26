import { NavLink, useNavigate } from "react-router-dom";
import profile from "../../../assets/profile.png"
import settings from "../../../assets/update.png"
import todo from "../../../assets/to-do-list.png"
import { CiCirclePlus, CiLogout, CiMenuFries } from "react-icons/ci";
import complete from "../../../assets/Complete/completed-task.png"
import allTask from "../../../assets/TaskList/task (1).png"
import today from "../../../assets/clipboard.png"
import { AiOutlineNotification } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";
import { MdOutlineDashboard } from "react-icons/md";
import './navbar.css'
import { useState } from "react";
import { FaHome, FaRegUser, FaUsers } from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";

const Navbar = () => {
    const { user, userLogOut } = useAuth()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const [isAdmin] = useAdmin()
    console.log(isAdmin)

    const handleLogOut = () => {
        userLogOut()
        navigate('/')
    }
    // const isAdmin = true
    const userNav = <>
        <li><NavLink to="/main/addTask" ><span className="flex items-center gap-2"><CiCirclePlus size={20} color="red" /> Add Task </span></NavLink></li>
        <li><NavLink to="/main/progress"><span className="flex items-center gap-2"><img src={today} alt="" className="w-7 h-6 object-cover" /> Progress </span></NavLink></li>
        <li><NavLink to="/main/todo"><span className="flex items-center gap-2"><img src={todo} alt="" className="w-6 h-6 object-cover mr-1" /> To Do </span></NavLink></li>
        <li><NavLink to="/main/complete"><span className="flex items-center gap-2"><img src={complete} alt="" className="w-7 h-6 object-cover" /> Completed </span></NavLink></li>
        <li><NavLink to="/main/allTask"><span className="flex items-center gap-2"><img src={allTask} alt="" className="w-7 h-6 object-cover" /> All Task </span></NavLink></li>
        {/* <li><NavLink to="/signup"><span className={`flex items-center gap-2 ${user ? 'hidden' : 'block'}`}><MdAssignmentInd size={20} />Signup </span></NavLink></li>
        <li><NavLink to="/login"><span className={`flex items-center gap-2 ${user ? 'hidden' : 'block'}`}><CiLogin size={20} />  Login </span></NavLink></li> */}

    </>
    const adminNav = <>
        <li><NavLink to="/signup" ><span className="flex items-center gap-2"><FaRegUser size={16} color="green" /> Add User </span></NavLink></li>
        <li><NavLink to="/main/allusers"><span className="flex items-center gap-2"><FaUsers size={20} /> All Users </span></NavLink></li>
        <li><NavLink to="/main/dashboard/admin"><span className="flex items-center gap-2"><MdOutlineDashboard size={20} /> Dashboard </span></NavLink></li>

    </>

    return (
        <div className="xl:w-64 bg-slate-300 xl:min-h-screen xl:px-6 xl:py-5 relative">
            <div className="xl:hidden flex justify-between items-center px-10 ">
                <div className="relative">
                    <div onClick={() => setIsOpenMenu(!isOpenMenu)}><CiMenuFries size={25} /></div>
                    {
                        isOpenMenu && <div className="absolute w-40 left-2 top-12 z-10 bg-slate-200 py-4 px-6 rounded-md shadow-md">
                            <ul className="space-y-6" id="sidebar">
                                {
                                    isAdmin ?
                                        <>{adminNav}</>
                                        :
                                        <>{userNav}</>
                                }
                                <li className="border-t-4 pt-4"><NavLink to="/"><span className="flex items-center gap-2"> <FaHome size={22} /> Home </span></NavLink></li>
                                <li onClick={handleLogOut}><span className={`flex items-center gap-2 hover:cursor-pointer ${user ? 'block' : 'hidden'}`}><CiLogout size={20} /> Log out </span></li>
                            </ul>
                        </div>
                    }
                </div>
                <div className="">

                    <div className="w-14 h-14 rounded-full flex items-center justify-end" onClick={() => setIsOpen(!isOpen)}>
                        {
                            user ? <div className="w-10 h-10 rounded-full ">
                                {
                                    user?.photoURL ? <img src={user?.photoURL} className="w-full  h-full object-cover rounded-full" alt="" /> :
                                        <img src={profile} className="w-full  h-full object-cover rounded-full" alt="" />
                                }
                            </div> :
                                <div className="w-10 h-10 rounded-full">
                                    <img src={profile} className="w-full  h-full object-cover rounded-full" alt="" />

                                </div>}

                    </div>

                    <div >

                        {
                            isOpen && <div className="text-sm space-y-4 absolute w-52 bg-slate-100 rounded-md z-20 py-4 px-5 right-2 top-16">
                                {
                                    (!isAdmin) && <li className="list-none"><NavLink to={"/main/dashboard"}>Dashboard</NavLink></li>
                                }
                                <li className="list-none"><NavLink to={"/main/profile"}>Profile</NavLink></li>
                            </div>
                        }
                    </div>

                </div>
            </div>
            <div className="hidden xl:block">
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
                        <div className="text-center hidden xl:block">
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
                                    {
                                        (!isAdmin) && <li className="list-none"><NavLink to={"/main/dashboard"}>Dashboard</NavLink></li>
                                    }
                                    <li className="list-none"><NavLink to={"/main/profile"}>Profile</NavLink></li>
                                </div>
                            }
                        </div>
                    </div>
                </div>


                <hr className="my-5" />

                <div className="xl:block">
                    <ul className="space-y-6" id="sidebar">
                        {
                            isAdmin ?
                                <>{adminNav}</>
                                :
                                <>{userNav}</>
                        }
                        <li className="border-t-2 pt-4"><NavLink to="/"><span className="flex items-center gap-2"> <FaHome size={22} /> Home </span></NavLink></li>
                        <li onClick={handleLogOut}><span className={`flex items-center gap-2 hover:cursor-pointer ${user ? 'block' : 'hidden'}`}><CiLogout size={20} /> Log out </span></li>
                    </ul>

                </div>
            </div>

        </div>
    );
};

export default Navbar;