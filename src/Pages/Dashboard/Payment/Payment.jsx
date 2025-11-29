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

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <h2>Plese Taka Poysha dao : {parcel.parcelName} </h2>
      <button className="btn btn-primary text-secondary">Pay Now</button>
    </div>
  );
};

export default Payment;
