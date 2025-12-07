import React from "react";
import useAuth from "../hook/useAuth";
import ForbiddenPage from "../components/ForbiddenPage/ForbiddenPage";
import useRole from "../hook/useRole";
import { Loader } from "lucide-react";

const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loader />;
  }

  if (role !== "admin") {
    return <ForbiddenPage />;
  }
  return children;
};

export default AdminRoute;
