import React from "react";
import Logo from "../components/Logo/Logo";
import { Outlet } from "react-router";
import authimg from "../assets/authImage.png";

const AuthLayout = () => {
  return (
    <div className="max-w-full mx-auto min-h-screen">
      <div className="flex">
        <div className="flex-1  ">
          <div className="py-10">
            <Logo></Logo>
          </div>
          <Outlet></Outlet>
        </div>

        <div className="flex-1 hidden  lg:flex justify-center items-center bg-[#FAFDF0]">
          <img src={authimg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
