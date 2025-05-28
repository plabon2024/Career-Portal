import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/job/:id",
        Component: JobDetails,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/signup",
        Component: Signup,
      },
      {
        path: "*/",
        Component: ErrorPage,
      },
    ],
  },
]);
export default router;
