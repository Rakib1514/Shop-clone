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
      if (currentUser) {
        const userInfo = {
          name: currentUser?.displayName,
          email: currentUser?.email,
          uid: currentUser?.uid,
        };

        dispatch(setUser(userInfo));
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
