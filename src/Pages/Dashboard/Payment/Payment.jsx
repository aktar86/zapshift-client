import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import Loader from "../../../components/Loader/Loader";

const Payment = () => {
  const axiosSecure = useAxiosSecure();
  const { parcelId } = useParams();
  console.log(parcelId);

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      sendarEmail: parcel.sendarEmail,
      parcelName: parcel.parcelName,
    };

    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <h2>
        Please pay ${parcel.cost} for: {parcel.parcelName}{" "}
      </h2>
      <button
        onClick={handlePayment}
        className="btn btn-primary text-secondary"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
