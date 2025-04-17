import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { isLoading, user } = useSelector((state) => state.auth);

  console.log(isLoading)
  
  if (isLoading) {
    return <h2>Loading in Private route check...</h2>;
  }

  if (!user) {
    return <Navigate to={"/auth/sign-in"} />;
  }

  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
