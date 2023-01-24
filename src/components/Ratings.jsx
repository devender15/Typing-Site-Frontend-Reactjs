import React from "react";

import FillStar from "../assets/filled-star.png";
import EmptyStar from "../assets/empty-star.png";

const Ratings = ({ rating, setRating }) => {

  const handleClick = (newRating) => {
    setRating(newRating);
  };

  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center space-x-2 my-2 justify-center">
      {stars.map((star) => (
        <img
          key={star}
          src={star <= rating ? FillStar : EmptyStar}
          alt="star"
          loading="lazy"
          onClick={() => handleClick(star)}
          className="cursor-pointer w-8 h-8"
        />
      ))}
    </div>
  );
};

export default Ratings;
