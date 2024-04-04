
import { Outlet } from "react-router-dom";
import Footer from "../../Comonents/Shared/Footer/Footer";

const Root = () => {
    return (
        <div>
            <Outlet></Outlet>
            <div className="container mx-auto">
                <Footer></Footer>
            </div>


        </div>
    );
};

export default Root;