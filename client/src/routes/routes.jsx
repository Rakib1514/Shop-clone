import { createBrowserRouter } from "react-router";
import App from "../App";
import DashboardLayout from "../layouts/DashboardLayout";
import MainLayout from "../layouts/MainLayout";
import SignIn from "../pages/authentication/SignIn";
import SignUp from "../pages/authentication/SignUp";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";

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
            path: "auth",
            children: [
              {
                path: "sign-in",
                Component: SignIn,
              },
              {
                path: "sign-up",
                Component: SignUp,
              },
            ],
          },

          // Dashboard Layout
          {
            Component: DashboardLayout,
            children: [
              {
                path: "profile",
                Component: Profile,
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
