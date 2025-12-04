import React from "react";
import useAuth from "../hook/useAuth";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../hook/useAxiosSecure";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        console.log(result.user);
        navigate(location?.state || "/");

        console.log(result.user.photoURL);

        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURl: result.user.photoURL,
        };
        console.log(userInfo);

        axiosSecure.post("/users", userInfo).then((res) => {
          console.log("user Data has been stored:", res.data);
        });
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
