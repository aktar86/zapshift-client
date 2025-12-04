import { timeoutManager, useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { Trash2, UserCheck, UserRoundMinus } from "lucide-react";
import Swal from "sweetalert2";
import { tileLayer } from "leaflet";

const ApproveRider = () => {
  const axiosSecure = useAxiosSecure();

  const { data: riders = [], refetch } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (id, status) => {
    const updateInfo = { status: status };
    axiosSecure.patch(`/riders/${id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `Rider status is set to ${status}`,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };

  const handleRiderApprove = (id) => {
    updateRiderStatus(id, "approved");
  };

  const handleRejection = (id) => {
    updateRiderStatus(id, "rejected");
  };

  return (
    <div>
      <h1 className="text-5xl">Approve Riders : {riders.length}</h1>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>SL</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>District</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {riders.map((rider, index) => (
              <tr key={index} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>
                  <p
                    className={`${
                      rider.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {rider.status}
                  </p>
                </td>
                <td>{rider.riderWireHouse}</td>
                <td>
                  <button
                    onClick={() => handleRiderApprove(rider._id)}
                    className="btn btn-square"
                  >
                    <UserCheck></UserCheck>
                  </button>
                  <button className="btn btn-square ml-2">
                    <UserRoundMinus />
                  </button>

                  <button
                    onClick={() => handleRejection(rider._id)}
                    className="btn btn-square ml-2"
                  >
                    <Trash2 />
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

export default ApproveRider;
