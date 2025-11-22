import React from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} className="flex items-end">
      <img src={logo} alt="" />
      <h3 className="text-3xl font-bold -ms-2.5">zapShift</h3>
    </div>
  );
};

export default Logo;
