import { NavLink } from "react-router-dom";
import logo from "../../assets/Logo/task.png"
import Banner from "./Banner/Banner";

const Home = () => {
    return (
        <div className="container mx-auto ">
            <div className="flex justify-between bg-slate-100 items-center fixed z-10 container px-5 h-20">
                <div className="flex items-center gap-2">
                    <div className="h-14 w-14">
                        <img src={logo} className="h-full w-full object-cover overflow-hidden" alt="logo"></img>
                    </div>
                    <h1 className="bg-gradient-to-r text-pink-300  text-2xl">TaskZen</h1>
                </div>
                <div>
                    <ul className="flex gap-6">
                        <li><NavLink to={'/login'}>Login</NavLink></li>
                        <li><NavLink to={'/login'}>Signup</NavLink></li>

                    </ul>
                </div>
            </div>
            <div>
                <Banner></Banner>
            </div>

        </div>
    );
};

export default Home;