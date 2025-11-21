import {
  faQuoteLeft,
  faStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const ReviewsCard = ({ review }) => {
  const {
    user_email,
    userName,
    review: testimonial,
    user_photoURL,
    ratings,
  } = review;

  const fullStars = Math.floor(ratings);
  const halfStar = ratings % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="max-w-sm p-6 rounded-2xl shadow-md bg-white ">
      {/* Quote Icon */}
      <FontAwesomeIcon
        className="text-5xl text-primary opacity-50 mb-3 "
        icon={faQuoteLeft}
      />

      {/* Testimonial */}
      <p className="text-gray-700 text-lg mb-4 italic">{testimonial}</p>

      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className="text-yellow-400 text-xl"
          />
        ))}
        {halfStar && (
          <FontAwesomeIcon
            icon={faStarHalfAlt}
            className="text-yellow-400 text-xl"
          />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            className="text-gray-300 text-xl"
          />
        ))}
      </div>

      <div className="my-5">
        <hr className="border-t-2 border-dashed border-gray-300" />
      </div>

      {/* Name + Photo */}
      <div className="flex items-center gap-3">
        <img
          src={user_photoURL}
          alt={userName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h2 className="font-bold text-gray-900">{userName}</h2>
          <p className="text-gray-500 text-sm">{user_email}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
