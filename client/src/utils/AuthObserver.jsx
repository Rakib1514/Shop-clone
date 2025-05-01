import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import auth from "../firebase/firebase.config";
import { setLoading, setUser } from "../redux/authSlice";

const AuthObserver = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const res = await axios.get(`/api/users/${currentUser.uid}`);
        console.log(res.data.data);

        dispatch(setUser(res.data.data));
        dispatch(setLoading(false));
      } else {
        dispatch(setUser(null));

        dispatch(setLoading(false));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthObserver;
