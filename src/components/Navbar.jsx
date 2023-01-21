import React from "react";
import { useNavigate } from "react-router-dom";

import { AiFillHome } from "react-icons/ai";
import { FaUserCog } from "react-icons/fa";

const Navbar = ({ role, loggedIn, setLoggedIn, setUserData }) => {
  const navigate = useNavigate();

  const logOut = () => {
    setLoggedIn(false);
    localStorage.clear();

    // clearning user data from the state object
    setUserData((prev) => {
      let newObj = { ...prev };
      Object.keys(newObj).forEach((key) => {
        delete newObj[key];
      });

      return newObj;
    });

    navigate("/");
  };

  const handleLogin = () => {
    navigate("/options");
  };

  return (
    <div className="px-4 py-2 shadow-md flex justify-between items-center">
      <AiFillHome
        size={25}
        title="Home"
        className="cursor-pointer"
        onClick={() => navigate("/")}
      />
      <p>
        {role}
        {loggedIn ? "'s panel" : ""}
      </p>

      <div className="flex space-x-6 items-center">
        {loggedIn ? (
          <FaUserCog
            size={25}
            title="Profile"
            className="cursor-pointer"
            onClick={() => navigate("/profile-settings")}
          />
        ) : null}

        <button
          className={`rounded-lg text-white  px-2 py-1 font-semibold cursor-pointer ${
            loggedIn ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
          onClick={loggedIn ? logOut : handleLogin}
        >
          {loggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
