import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../Pages/AddTask/AddTask";
import SignUp from "../Pages/SignUp/SignUp";
import Login from "../Pages/Login/Login";
import PrivateRoute from "../Comonents/Shared/PrivateRoute/PrivateRoute";
import AllTask from "../Pages/AllTask/AllTask";
import CompleteTask from "../Pages/CompleteTask/CompleteTask";

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
         element: <AllTask/>
        },
        {
         path:"/complete",
         element: <CompleteTask/>
        },
      ]
    },
  ]);

  export default router;