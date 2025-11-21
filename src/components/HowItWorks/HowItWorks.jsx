import React from "react";
import img from "../../assets/bookingIcon.png";

const HowItWorks = () => {
  const cards = [
    {
      img: img,
      title: "Express Delivery",
      descrip:
        "Urgent parcels delivered in hours, not days. Perfect for time-sensitive documents and items.",
    },
    {
      img: img,
      title: "Cold Chain Logistics",
      descrip:
        "Temperature-controlled shipping for pharmaceuticals, food, and perishable goods.",
    },
    {
      img: img,
      title: "Warehouse Storage",
      descrip:
        "Secure, scalable storage solutions with integrated inventory management for your business.",
    },
    {
      img: img,
      title: "International Shipping",
      descrip:
        "Seamless global logistics with customs clearance handled by our expert team.",
    },
  ];

  return (
    <div className="px-10 py-10">
      <h3 className="text-2xl font-bold">How it works</h3>
      <div className="grid  grid-cols-4 gap-4 mt-5">
        {cards.map((card, index) => (
          <div key={index} className="bg-white py-5 px-5 rounded-2xl">
            <img src={card.img} alt="" />
            <h3 className="font-bold text-xl my-2">{card.title}</h3>
            <p className="text-lg font-medium">{card.descrip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
