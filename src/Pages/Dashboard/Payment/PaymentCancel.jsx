import { Link } from "react-router";
import React from "react";

const PaymentCancel = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold">Payment Cancelled</h2>

      <Link to="/dashboard/my-parcels">
        <button
          className="
        btn btn-primary text-black"
        >
          Try Again
        </button>
      </Link>
    </div>
  );
};

export default PaymentCancel;
