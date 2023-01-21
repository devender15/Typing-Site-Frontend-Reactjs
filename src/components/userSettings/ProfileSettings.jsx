import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { FiSettings } from "react-icons/fi";
import { GrDocumentPerformance } from "react-icons/gr";


const ProfileSettings = ({ userToken }) => {
  const navigate = useNavigate();

  // if user is not logged in then redirect to home page
  useEffect(() => {
    if (!userToken) navigate("/");
  }, []);

  return (
    <div className="py-20 md:py-0 grid place-items-center grid-cols-1 md:!px-20 md:absolute md:top-1/2 md:transform md:-translate-y-1/2 w-full md:grid-cols-2 gap-10 md:gap-0">
      <Link to="account">
        <div className="rounded-lg p-10 text-xl shadow-md cursor-pointer flex flex-col justify-center items-center space-y-4 hover:shadow-xl transition-all duration-100">
          <FiSettings size={50} />
          <p>Account Settings</p>
        </div>
      </Link>

      <Link to="performance">
        <div className="rounded-lg p-10 text-xl shadow-md cursor-pointer flex flex-col justify-center items-center space-y-4 hover:shadow-xl transition-all duration-100">
          <GrDocumentPerformance size={50} />
          <p>Show Performance</p>
        </div>
      </Link>
    </div>
  );
};

export default ProfileSettings;
