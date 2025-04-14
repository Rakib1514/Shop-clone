import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import SignUp from "../pages/authentication/SignUp";
import App from "../App";

const router = createBrowserRouter([
  {
    Component: App, //global wrapper
    children: [
      {
        path: "/",
        Component: MainLayout,
        children: [
          {
            index: true,
            Component: Home,
          },
          {
            path: "auth/sign-up",
            Component: SignUp,
          },
        ],
      },
    ],
  },
]);

export default router;
