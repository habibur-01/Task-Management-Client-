import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/task.png"
import Banner from "./Banner/Banner";
import Featured from "./Featured/Featured";
import Whyus from "./Why us/Whyus";
import Testimonials from "./Testimonials/Testimonials";
import useAuth from "../../hooks/useAuth";
// import { CiLogout } from "react-icons/ci";
import useAdmin from "../../hooks/useAdmin";

const Home = () => {
    const { user, userLogOut } = useAuth()
    const navigate = useNavigate()
    const [isAdmin] = useAdmin()

    const addTaskDestination = '/main/addTask';
    const allUsersDestination = '/main/allusers';

    // Render the NavLink with the appropriate destination based on the condition
    const navLinkDestination = isAdmin ? addTaskDestination : allUsersDestination;

    const handleLogOut = () => {
        userLogOut()
        navigate('/')
    }
    return (
        <div className="container mx-auto ">
            <div className="flex justify-between bg-[#f2f2ff]/80  items-center fixed z-10 container px-5 h-20">
                <div className="flex items-center gap-2">
                    <div className="h-14 w-14">
                        <img src={logo} className="h-full w-full object-cover overflow-hidden" alt="logo"></img>
                    </div>
                    <h1 className="bg-gradient-to-r text-pink-300  text-2xl">TaskZen</h1>
                </div>
                <div>
                    <ul className="flex gap-6">
                        {
                            user ? <><li className="list-none"><NavLink to={navLinkDestination}>Dashboard</NavLink></li>
                                <li onClick={handleLogOut}><span className={`font-medium gap-2 hover:cursor-pointer`} > Log out </span></li></> :
                                <><li><NavLink to={'/login'}>Login</NavLink></li>
                                    <li><NavLink to={'/signup'}>Signup</NavLink></li></>
                        }


                    </ul>
                </div>
            </div>
            <div>
                <Banner></Banner>
            </div>

            <Whyus></Whyus>
            <Featured></Featured>
            <Testimonials></Testimonials>

        </div>
    );
};

export default Home;