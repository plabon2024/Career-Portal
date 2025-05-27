import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import JobDetails from "../pages/JobDetails";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../layouts/MainLayout";

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
        path: "*/",
        Component: ErrorPage,
      },
    ],
  },
]);
export default router;
