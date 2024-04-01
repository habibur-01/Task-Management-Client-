
import { Outlet } from "react-router-dom";
import Navbar from "../Comonents/Shared/Navbar/Navbar";


const Main = () => {
    return (
        <div className="flex">
            <div>
            <Navbar></Navbar>
            </div>
            <div className="flex-1 py-16 px-20">
                <Outlet></Outlet>
            </div>

        </div>

    );
};

export default Main;