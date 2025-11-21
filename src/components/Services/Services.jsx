import React from "react";
import img from "../../assets/service.png";

const Services = () => {
  const services = [
    {
      img: img,
      title: "Express  & Standard Delivery",
      des: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
    },
    {
      img: img,
      title: "Nationwide Delivery",
      des: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
    },
    {
      img: img,
      title: "Fulfillment Solution",
      des: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
    },
    {
      img: img,
      title: "Cash on Home Delivery",
      des: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
    },
    {
      img: img,
      title: "Corporate Service / Contract In Logistics",
      des: "Customized corporate services which includes warehouse and inventory management support.",
    },
    {
      img: img,
      title: "Parcel Return",
      des: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
    },
  ];
  return (
    <div className="bg-secondary text-white p-10 px-15 mt-10 rounded-2xl">
      <h1 className="text-center font-bold text-3xl">Our Services</h1>
      <p className="text-center mb-10">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — <br /> we deliver
        on time, every time.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  gap-4 ">
        {services.map((s, i) => (
          <div
            key={i}
            className="bg-white text-secondary hover:bg-primary  transition ease-in-out flex flex-col justify-centerf items-center text-center p-5 rounded-2xl"
          >
            <img className="bg-gray-100 p-5 rounded-full" src={img} alt="" />
            <h3 className="text-2xl font-bold my-5">{s.title}</h3>
            <p className="text-lg font-medium">{s.des}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
