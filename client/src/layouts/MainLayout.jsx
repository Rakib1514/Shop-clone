import { Outlet } from "react-router";
import Header from "../components/header/Header";

const MainLayout = () => {
  return (
    <div className="bg-base-200">
      <Header/>
      <Outlet/>
    </div>
  );
};

export default MainLayout;