import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../Pages/AddTask/AddTask";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import PrivateRoute from "../Comonents/Shared/PrivateRoute/PrivateRoute";
import AllTask from "../Pages/AllTask/AllTask";
import CompleteTask from "../Pages/CompleteTask/CompleteTask";
import UpdateTask from "../Pages/AllTask/UpdateTask/UpdateTask";
import ToDo from "../Pages/ToDo/ToDo";
import ProgressTask from "../Pages/ProgressTask/ProgressTask";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Profile from "../Pages/Profile/Profile";
import AllUsers from "../Pages/Admin/Alluser/AllUsers";
import AdminDashboard from "../Pages/Admin/AdminDashboard/AdminDashboard";
import AdminRoute from "../hooks/AdminRoute";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
           path: "/addTask",
           element: <PrivateRoute><AddTask/></PrivateRoute>
        },
        {
           path: "/signup",
           element: <SignUp/>
        },
        {
           path: "/login",
           element: <Login/>
        },
        {
         path:"/allTask",
         element: <PrivateRoute><AllTask/></PrivateRoute>
        },
        {
         path:"/complete",
         element: <PrivateRoute><CompleteTask/></PrivateRoute>
        },
        {
         path:"/updateTask",
         element:<UpdateTask/>
        },
        {
         path:"/todo",
         element:<PrivateRoute><ToDo/></PrivateRoute>
        },
        {
         path:"/progress",
         element:<PrivateRoute><ProgressTask/></PrivateRoute>
        },
        {
         path:"/dashboard",
         element:<PrivateRoute><Dashboard/></PrivateRoute>
        },
        {
         path:"/editprofile",
         element:<PrivateRoute><Profile/></PrivateRoute>
        },
        {
         path: "/allusers",
         element:<AdminRoute><AllUsers/></AdminRoute>
        },
        {
         path:"/dashboard/admin",
         element:<AdminRoute><AdminDashboard/> </AdminRoute>
        }
      ]
    },
  ]);

  export default router;