import React from "react";
import useAuth from "../hook/useAuth";
import { useLocation, useNavigate } from "react-router";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="w-full mt-6 py-2 rounded-lg  text-secondary border border-[#03373d] font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5 "
      >
        Google Sign In
      </button>
    </div>
  );
};

export default SocialLogin;
