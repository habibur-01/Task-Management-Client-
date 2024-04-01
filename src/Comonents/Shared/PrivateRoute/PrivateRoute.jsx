import { PropTypes } from "prop-types";
import { Navigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth()
    // console.log(user)
    if (loading) {
        return (<div className="w-full h-[80vh] flex justify-center items-center">
            <span className="loading loading-ring loading-lg"></span>
        </div>)
    }
    if (user) {
        return children
    }


    return (

        <Navigate to="/login" state={{ from: location }} replace></Navigate>
    );
};
PrivateRoute.propTypes={
    children: PropTypes.node
}
export default PrivateRoute;