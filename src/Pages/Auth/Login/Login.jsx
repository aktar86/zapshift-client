import React from "react";
import useAuth from "../../../hook/useAuth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../../../socialLogin/socialLogin";

const Login = () => {
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Email password authentication sign in
  const handleSignIn = (data) => {
    console.log(data);
    signInUser(data.email, data.password)
      .then((result) => {
        console.log("Logged in:", result.user);
        navigate(location?.state || "/");
        alert("Login Successful!");
      })
      .catch((err) => {
        console.log("Login Error:", err.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>

        {/* Email */}
        <label className="block mb-1 text-gray-700 font-medium">Email</label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-[#03373d]/70"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}

        {/* Password */}
        <label className="block mt-4 mb-1 text-gray-700 font-medium">
          Password
        </label>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 
                     focus:outline-none focus:ring-2 focus:ring-[#03373d]/70"
          placeholder="Enter your password"
        />
        {errors.password?.type === "required" && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}

        <p className="text-right mt-2 text-sm text-blue-600 cursor-pointer hover:underline">
          Forgot Password?
        </p>

        {/* Submit Button */}
        <button
          className="w-full mt-6 py-3 rounded-lg text-white font-semibold shadow-md 
                     transition-all duration-200 hover:-translate-y-0.5"
          style={{ backgroundColor: "#03373d" }}
        >
          Sign In
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            state={location?.state}
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register Now
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </form>
    </div>
  );
};

export default Login;

// aktar@bd.com
//123456@sA
