import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../Pages/AddTask/AddTask";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import PrivateRoute from "../Comonents/Shared/PrivateRoute/PrivateRoute";
import AllTask from "../Pages/AllTask/AllTask";
import CompleteTask from "../Pages/CompleteTask/CompleteTask";
import UpdateTask from "../Pages/AllTask/UpdateTask/UpdateTask";

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
         element: <CompleteTask/>
        },
        {
         path:"/updateTask",
         element:<UpdateTask/>
        },
      ]
    },
  ]);

  export default router;