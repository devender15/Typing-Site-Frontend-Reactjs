import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => {
  const navigate = useNavigate();

  const convertToSlug = (str) => {
    let wordsArray = str.split(" ");

    let newArray = [];

    wordsArray.forEach((element) => {
      newArray.push(element.charAt(0).toLowerCase() + element.slice(1));
    });

    return newArray.join("-");
  };

  return (
    <div
      className="p-4 rounded-md shadow-md cursor-pointer flex flex-col md:flex-row space-y-4 items-center md:space-y-0  md:space-x-10"
      onClick={() => navigate(convertToSlug(data?.name))}
    >
      <data.icon size={25} />
      <p className="font-semibold text-center">{data.name}</p>
    </div>
  );
};

export default Card;
