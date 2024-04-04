
import { Outlet } from "react-router-dom";
import Navbar from "../Comonents/Shared/Navbar/Navbar";


const Main = () => {
    return (
        <div className="xl:flex">
            <div>
            <Navbar></Navbar>
            </div>
            <div className="xl:flex-1 py-16 px-4 md:px-10 xl:mx-0 xl:py-16 xl:px-20">
                <Outlet></Outlet>
            </div>

        </div>

    );
};

export default Main;