import React from "react";
import useAuth from "../../../hook/useAuth";
import useAxiosSecure from "../../../hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistry = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-5xl">Payment History: {payments.length}</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>

              <th>Amount</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {payments.map((payment, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>Cy Ganderton</td>
                <td>{payment.amount}</td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistry;

// {
// _id: "692df17805c617e7c7adddb5"
// amount: 300
// currency: "usd"
// customerEmail: "amdaktar86@gmail.com"
// parcelId: "692b28b62a45a992e67ecd88"
// parcelName: "Small Speaker"
// transactionId: "pi_3SZd6tRbLoOft1nu0z7d0Iit"
// paymentStatus: "paid"
// paidAt: "2025-12-01T19:50:16.856Z"
// }
