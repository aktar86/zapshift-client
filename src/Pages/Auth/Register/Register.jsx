import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../../../hook/useAuth";
import SocialLogin from "../../../socialLogin/socialLogin";

const Register = () => {
  const { registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleRegistration = (data) => {
    console.log("button clicked");
    registerUser(data.email, data.password)
      .then((result) => {
        console.log("Registered User:", result.user);
        reset(); // clear form
      })
      .catch((error) => {
        console.log("Registration Error:", error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        <form onSubmit={handleSubmit(handleRegistration)}>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Create an Account
          </h2>

          {/* Email */}
          <label className="block mb-1 text-gray-700 font-medium">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#03373d]/60"
            placeholder="Enter your email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500 text-sm mt-1">Email is required</p>
          )}

          {/* Password */}
          <label className="block mt-4 mb-1 text-gray-700 font-medium">
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                message:
                  "Password must include uppercase, lowercase & special character",
              },
            })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#03373d]/60"
            placeholder="Enter your password"
          />

          {/* Dynamic Error Message */}
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}

          <p className="text-right mt-2 text-sm text-blue-600 cursor-pointer hover:underline">
            Forgot Password?
          </p>

          {/* Submit Button */}
          <button
            className="w-full mt-6 py-3 rounded-lg text-white font-semibold shadow-md transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "#03373d" }}
          >
            Register
          </button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Have an account?
            <Link to="/login" className="text-blue-600 hover:underline ml-1">
              Login Now
            </Link>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
