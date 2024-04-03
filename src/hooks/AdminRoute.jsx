import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "./useAdmin";
import useAuth from "./useAuth";


const AdminRoute = (children) => {
    const [user, loading] = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin()
    const location = useLocation()
    if (loading || isAdminLoading) {
        return (<div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>)
    }
    if (user && isAdmin) {
        return children
    }


    return (

        <Navigate to="/login" state={{ from: location }} replace></Navigate>
    );
};

export default AdminRoute;