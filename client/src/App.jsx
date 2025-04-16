import { Outlet } from "react-router";
import AuthObserver from "./utils/AuthObserver";
import { useSelector } from "react-redux";

const App = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user)
  return (
    <>
      <AuthObserver />
      <Outlet />
    </>
  );
};

export default App;
