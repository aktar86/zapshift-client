import React from "react";
import useAuth from "../hook/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivetRouter = ({ children }) => {
  const { user, loadign } = useAuth();
  const location = useLocation();
  if (loadign) {
    return <p>Loading...</p>;
  }
  if (!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivetRouter;
