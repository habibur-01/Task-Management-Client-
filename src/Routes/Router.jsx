import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import AddTask from "../Pages/AddTask/AddTask";
import SignUp from "../Pages/SignUp/SignUp";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children:[
        {
           path: "/addTask",
           element: <AddTask/>
        },
        {
           path: "/signup",
           element: <SignUp/>
        },
        {
           path: "/login",
           element: <AddTask/>
        },
      ]
    },
  ]);

  export default router;