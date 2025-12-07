import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import "./MyParcel.css";
import { FaEdit } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { Link } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["my-parcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  console.log(parcels);
  const handleOnPagePayment = async (parcel) => {
    console.log("hello");

    const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      sendarEmail: parcel.sendarEmail,
      parcelName: parcel.parcelName,
    };
    console.log("paymentInfo:", paymentInfo);

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    console.log(res.data);
    window.location.assign(res.data.url);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // delete api call
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            // refresh the data in the UI
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Parcel Request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <h1>My Parcels: {parcels.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-center">
              <th>SL</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {parcels.map((parcel, index) => (
              <tr key={parcel._id} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>

                <td>
                  {parcel.paymentStatus === "Paid" ? (
                    <span className="text-green-500">
                      {parcel.paymentStatus}
                    </span>
                  ) : (
                    // btn for onpage payment
                    <button
                      onClick={() => handleOnPagePayment(parcel)}
                      className="bg-primary  btn"
                    >
                      Pay 2
                    </button>
                  )}
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td className="">
                  <button className="btn btn-square ">
                    <FaEdit />
                  </button>

                  <button className="btn btn-square mx-2">
                    <FaMagnifyingGlass />
                  </button>

                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-square "
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;

// <Link
//   to={`/dashboard/payment/${parcel._id}`}
//   className="bg-primary btn-square btn"
// >
//   Pay
// </Link>
