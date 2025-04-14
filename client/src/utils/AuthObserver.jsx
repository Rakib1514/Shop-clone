import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "../redux/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../firebase/firebase.config";

const AuthObserver = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch(setUser(currentUser));
      dispatch(setLoading(false));
      return () => unsubscribe();
    });
  }, [dispatch]);

  return null;
};

export default AuthObserver;
