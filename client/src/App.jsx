import { Outlet } from "react-router";
import AuthObserver from "./utils/AuthObserver";

const App = () => {
  return (
    <>
      <AuthObserver />
      <Outlet />
    </>
  );
};

export default App;
