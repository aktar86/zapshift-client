import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState();
  const sessionId = searchParams.get("session_id");
  // console.log(sessionId);
  console.log("paymentInfo:", paymentInfo);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          if (!paymentInfo) {
            setPaymentInfo({
              transactionId: res.data.transactionId,
              trackingId: res.data.trackingId,
            });
          }
        })
        .catch((error) => {
          console.error("Payment verification failed:", error);
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div className=" h-[calc(100vh-64px)] flex justify-center items-center">
      <div className="bg-white w-md p-10 rounded-lg text-center ">
        <h1 className="text-3xl font-bold text-green-500 mb-2">
          Payment Success
        </h1>
        {paymentInfo ? (
          <>
            <p>Tracking ID: {paymentInfo?.trackingId}</p>
            <p>Transaction ID: {paymentInfo?.transactionId}</p>
          </>
        ) : (
          <p>Please Confirm your payment...</p>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
