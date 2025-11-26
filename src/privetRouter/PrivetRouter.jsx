import React from "react";
import useAuth from "../hook/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader/Loader";

const PrivetRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/login"></Navigate>;
  }
  return children;
};

export default PrivetRouter;
