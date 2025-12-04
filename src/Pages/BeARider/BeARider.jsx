import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDuplicate)];

  const riderDistrict = useWatch({ control, name: "riderDistrict" });

  const wireHouseByDistrict = (region) => {
    const regionDistricts = serviceCenters.filter((r) => r.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleRiderReg = (data) => {
    axiosSecure.post("/riders", data).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        console.log(res.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title:
            "Your application has been submitted. we will reach to you in 145 days",
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };
  return (
    <div className="bg-white p-10">
      <div className="border-b  mb-5">
        <h1 className="text-3xl  font-bold text-secondary">Be a Rider</h1>
        <p className="my-5 md:max-w-8/12">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      <div className="flex">
        {/* form */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-secondary">
            Tell us about yourself
          </h1>
          <form onSubmit={handleSubmit(handleRiderReg)}>
            <div className="grid grid-cols-2 gap-4">
              {/* name  */}
              <div>
                <label className="block">Name</label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="border border-gray-200 w-full outline-0 p-2 focus:border-green-200"
                  placeholder="Your Name"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500">Name is required</p>
                )}
              </div>

              {/* age  */}
              <div>
                <label className="block">Age</label>
                <input
                  type="number"
                  {...register("age", { required: true })}
                  className="border border-gray-200 w-full outline-0 p-2 focus:border-green-200"
                  placeholder="Your age"
                />
                {errors.name?.type === "required" && (
                  <p className="text-red-500">Name is required</p>
                )}
              </div>

              {/* email  */}
              <div>
                <label className="block">Email</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="border border-gray-200 w-full outline-0 p-2 focus:border-green-200"
                  placeholder="Your Email"
                />
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Name is required</p>
                )}
              </div>

              {/* District  */}
              <div>
                <label className="block"> Your District</label>
                <select
                  defaultValue="Pick a District"
                  {...register("riderDistrict", { required: true })}
                  className=" select w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-200 px-2"
                >
                  <option disabled={true}>Pick a District</option>
                  {regions.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* NID  */}
              <div>
                <label className="block">Your NID Number</label>
                <input
                  type="Number"
                  {...register("nid", { required: true })}
                  className="border border-gray-200 w-full outline-0 p-2 focus:border-green-200"
                  placeholder="Your NID"
                />
                {errors.nid?.type === "required" && (
                  <p className="text-red-500">NID is required</p>
                )}
              </div>

              {/* Contact  */}
              <div>
                <label className="block">Contact</label>
                <input
                  type="number"
                  {...register("contact", { required: true })}
                  className="border border-gray-200 w-full outline-0 p-2 focus:border-green-200"
                  placeholder="Your contact"
                />
                {errors.contact?.type === "required" && (
                  <p className="text-red-500">Contact is required</p>
                )}
              </div>
            </div>

            <div className="mt-2">
              {/* Rider wire-house*/}
              <label> Which wire-house you want to work?</label>
              <select
                defaultValue="Pick a District"
                {...register("riderWireHouse", { required: true })}
                className=" select w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
              >
                <option disabled={true}>Pick a District</option>
                {wireHouseByDistrict(riderDistrict).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="py-2">
              <input
                type="submit"
                value="Submit"
                className="bg-primary px-10 py-2 font-bold w-full mt-2"
              />
            </div>
          </form>
        </div>
        {/* img  */}
        <div className="flex-1 hidden lg:flex"></div>
      </div>
    </div>
  );
};

export default BeARider;
