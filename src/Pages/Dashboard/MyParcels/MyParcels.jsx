import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import "./MyParcel.css";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [] } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });
  return (
    <div>
      <h1>My Parcels: {parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Sendar Name</th>
              <th>Receiver Name</th>
              <th>Weight</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr className="bg-base-200">
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{`${(parcel.cost && parcel.cost) || "-"}`}</td>
                <td>{parcel.parcelWeight}</td>
                <td>Send</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
