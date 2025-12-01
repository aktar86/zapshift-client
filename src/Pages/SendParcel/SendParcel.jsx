import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../hook/useAuth";
import useAxiosSecure from "../../hook/useAxiosSecure";

const SendParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  console.log(user);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const serviceCenters = useLoaderData();
  const regionsDuplicate = serviceCenters.map((center) => center.region);
  const regions = [...new Set(regionsDuplicate)];
  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtbyRegion = (region) => {
    const regionDistricts = serviceCenters.filter((r) => r.region === region);
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  const handleSendParcel = (data) => {
    console.log(data);

    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const isDocument = data.parcelType === "document";
    const parcelWeight = data.parcelWeight;

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }
    console.log(cost);
    data.cost = cost;

    Swal.fire({
      title: "Agree with the cost?",
      text: `You wll be charged ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Submit it",
    }).then((result) => {
      if (result.isConfirmed) {
        //save the data on database
        axiosSecure.post("/parcels", data).then((res) => {
          navigate("/dashboard/my-parcels");
          console.log(res.data);
          Swal.fire({
            title: "OK!",
            text: "Your placed, Please Pay now.",
            icon: "success",
          });
        });
      }
    });
  };

  return (
    <div className="bg-white p-10">
      <span className="space-y-1">
        {" "}
        <h2 className="font-bold text-3xl">Send A Parcel</h2>
        <h3 className="font-bold text-lg mb-5">Enter Your Parcel Details</h3>
      </span>

      <form
        onSubmit={handleSubmit(handleSendParcel)}
        className="border border-gray-100 p-5"
      >
        {/* document non document check */}
        <div className="flex items-center gap-8 my-5">
          {/* Document */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              {...register("parcelType")}
              value="document"
              className="radio hidden peer"
              defaultChecked
            />
            <span className="w-4 h-4 rounded-full border-2 border-gray-500 peer-checked:bg-green-500 peer-checked:border-green-500 flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full"></span>
            </span>
            <span className="text-gray-800 font-bold">Document</span>
          </label>

          {/* Not Document */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              {...register("parcelType")}
              value="non-document"
              className="hidden peer"
            />
            <span className="w-4 h-4 rounded-full border-2 border-gray-500 peer-checked:bg-green-500 peer-checked:border-green-500 flex items-center justify-center">
              <span className="w-2 h-2 bg-white rounded-full"></span>
            </span>
            <span className="text-gray-800 font-bold">Not-Document</span>
          </label>
        </div>

        {/* name and weight */}
        <div className="flex flex-col md:flex-row gap-4  mb-5 border-t-2 pt-3 border-gray-200 ">
          {/* name */}
          <fieldset className="flex-1">
            <legend className="text-sm font-bold">Parcel Name</legend>
            <input
              type="text"
              placeholder="Parcel Name"
              {...register("parcelName", { required: true })}
              className="w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
            />
            {errors.parcelName?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}
          </fieldset>
          {/* Parcel Weight (KG) */}
          <fieldset className="flex-1">
            <legend className="text-sm font-bold">Parcel Weight (KG)</legend>
            <input
              type="number"
              placeholder="Parcel Weight (KG)"
              {...register("parcelWeight", { required: true })}
              className="w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
            />
            {errors.parcelWeight?.type === "required" && (
              <p className="text-red-500">Weight is required</p>
            )}
          </fieldset>
        </div>

        {/* --Details-- */}
        <div className="flex gap-4 border-t-2 pt-3 border-gray-200">
          {/* sendar details */}
          <div className="flex-1 space-y-2">
            {/* sender name */}
            <fieldset className="flex-1">
              <legend className="text-sm font-bold">Sender Name</legend>
              <input
                type="text"
                placeholder="Sender Name"
                {...register("sendarName", { required: true })}
                defaultValue={`${user?.displayName}`}
                className="w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
              />
              {errors.sendarName?.type === "required" && (
                <p className="text-red-500">Name is required</p>
              )}
            </fieldset>

            {/* sender Email */}
            <fieldset className="flex-1">
              <legend className="text-sm font-bold">Sender Email</legend>
              <input
                type="email"
                placeholder="Sender Email"
                {...register("sendarEmail", { required: true })}
                defaultValue={`${user?.email}`}
                className="w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
              />
              {errors.sendarEmail?.type === "required" && (
                <p className="text-red-500">Mail is required</p>
              )}
            </fieldset>

            {/* sender region */}
            <fieldset>
              <legend className="font-bold">Sender Region</legend>
              <select
                defaultValue="Pick a Region"
                {...register("senderRegion", { required: true })}
                className=" select w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
              >
                <option disabled={true}>Pick a Region</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender district */}
            <fieldset>
              <legend className="font-bold">Sender District</legend>
              <select
                defaultValue="Pick a District"
                {...register("senderDistrict", { required: true })}
                className=" select w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
              >
                <option disabled={true}>Pick a District</option>
                {districtbyRegion(senderRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* sender address */}
            <fieldset className="flex-1">
              <legend className="text-sm font-bold"> Sender Address</legend>
              <input
                type="text"
                placeholder="Sender Address"
                {...register("sendarAddress", { required: true })}
                className="w-full  border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
              />
              {errors.sendarAddress?.type === "required" && (
                <p className="text-red-500">Sender Address is required</p>
              )}
            </fieldset>
          </div>

          {/* receiver details */}
          <div className="flex-1 space-y-2">
            {/* receiver name */}
            <fieldset className="flex-1">
              <legend className="text-sm font-bold">Receiver Name</legend>
              <input
                type="text"
                placeholder="Receiver Name"
                {...register("receiverName", { required: true })}
                className="w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
              />
              {errors.receiverName?.type === "required" && (
                <p className="text-red-500">Receiver Name is required</p>
              )}
            </fieldset>

            {/* Receiver Email */}
            <fieldset className="flex-1">
              <legend className="text-sm font-bold">Receiver Email</legend>
              <input
                type="email"
                placeholder="Receiver Email"
                {...register("receiverEmail", { required: true })}
                className="w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
              />
              {errors.receiverEmail?.type === "required" && (
                <p className="text-red-500">Mail is required</p>
              )}
            </fieldset>

            {/* Receiver district */}
            <fieldset>
              <legend className="font-bold">Receiver District</legend>
              <select
                defaultValue="Pick a District"
                {...register("receiverRegion", { required: true })}
                className=" select w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
              >
                <option disabled={true}>Pick a District</option>
                {regions.map((r, i) => (
                  <option key={i} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* Receiver district */}
            <fieldset>
              <legend className="font-bold">Receiver District</legend>
              <select
                defaultValue="Pick a District"
                {...register("receiverDistrict", { required: true })}
                className=" select w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
              >
                <option disabled={true}>Pick a District</option>
                {districtbyRegion(receiverRegion).map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </fieldset>

            {/* receiver address */}
            <fieldset className="flex-1">
              <legend className="text-sm font-bold"> Receiver Address</legend>
              <input
                type="text"
                placeholder="Receiver Address"
                {...register("receiverAddress", { required: true })}
                className="w-full border border-gray-300 outline-0 py-2 focus:ring focus:ring-green-600 px-2"
              />
              {errors.receiverAddress?.type === "required" && (
                <p className="text-red-500">Receiver Address is required</p>
              )}
            </fieldset>
          </div>
        </div>
        {/* button */}
        <input
          type="submit"
          value="Submit Parcel"
          className="px-5 py-2 bg-primary font-bold text-secondary mt-5 hover:opacity-80"
        />
      </form>
    </div>
  );
};

export default SendParcel;
