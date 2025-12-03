import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hook/useAuth";
import SocialLogin from "../../../socialLogin/socialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const Register = () => {
  const { registerUser, updateUserProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    console.log("Form Data:", data);
    const profileImage = data.photo[0];

    registerUser(data.email, data.password)
      .then(() => {
        //1. store the image and get the photo URL
        const formData = new FormData();
        formData.append("image", profileImage);

        //2. sent the photo to store and get the ul
        const image_API_Url = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host
        }`;

        axios.post(image_API_Url, formData).then((res) => {
          const photoURl = res.data.data.url;

          const userInfo = {
            email: data.email,
            displayName: data.name,
            photoURl: photoURl,
          };
          //create user in the database
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user created in the database");
            }
          });

          //update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURl,
          };
          updateUserProfile(userProfile)
            .then(() => {
              //navigate path
              navigate(location?.state || "/");
            })
            .catch((err) => {
              console.log(err.message);
            });
        });
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

          <div className="space-y-2">
            {/* Name */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#03373d]/60"
                placeholder="Enter Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Name is required</p>
              )}
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Photo
              </label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className=" file-input outline-0 w-full border border-gray-300 rounded-lg"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Photo is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#03373d]/60"
                placeholder="Enter your email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
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
            </div>

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
          </div>
        </form>
        <p className="text-center mt-4 text-sm text-gray-600">
          Have an account?
          <Link
            state={location?.state}
            to="/login"
            className="text-blue-600 hover:underline ml-1"
          >
            Login Now
          </Link>
        </p>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
