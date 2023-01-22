import React from "react";
import { useNavigate } from "react-router-dom";

import Bg from "../assets/options.jpg";

const LoginOption = () => {
  const navigate = useNavigate();
  document.title = "Select Login Option | Typing Site";

  localStorage.clear();

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <img src={Bg} alt="background" className="w-full h-full object-cover" />
      </div>

      <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <h1 className="text-3xl text-white text-center font-semibold my-4">
          Login as a
        </h1>
        <div className="my-4 flex flex-col md:flex-row space-y-4 md:space-x-4 md:space-y-0 md:items-center md:justify-center">
          <button
            className="px-4 py-2 text-white font-semibold rounded-lg transition-all duration-300 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:ring hover:ring-yellow-400"
            onClick={() => navigate("/login/teacher")}
          >
            Teacher
          </button>
          <button
            className="px-4 py-2 text-white font-semibold rounded-lg transition-all duration-300 bg-gradient-to-r from-[#cc2b5e] to-[#753a88] hover:ring hover:ring-pink-600"
            onClick={() => navigate("/login/student")}
          >
            Student
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginOption;
