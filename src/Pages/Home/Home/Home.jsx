import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../../../components/HowItWorks/HowItWorks";
import Services from "../../../components/Services/Services";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";

const reviewsPromies = fetch("/reviews.json").then((res) => res.json());

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <Brands></Brands>
      <Reviews reviewsPromies={reviewsPromies}></Reviews>
    </div>
  );
};

export default Home;
