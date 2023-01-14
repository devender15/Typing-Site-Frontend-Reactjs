import React, { useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { MdPendingActions } from "react-icons/md";
import { BsBookFill } from "react-icons/bs";


import fetchUser from "../../utils/FetchUser";

import { CardContainer, PendingRequests } from "..";
import ExamList from "./ExamList";

const Admin = ({ user }) => {
  document.title = "Admin Panel | Typing site";

  const userToken = fetchUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) navigate("/options");
    // checking if the user toke is valid or not
    if (user?.errors) localStorage.clear();
  }, []);

  const adminOptions = [
    {
      name: "Teacher Pending requests",
      icon: MdPendingActions,
    },
    {
      name: "See all exams",
      icon: BsBookFill,
    },
  ];

  return (
    <div className="p-2">
      <h1 className="text-xl font-semibold text-center my-6">{user?.fname}</h1>

      <div className="my-6 flex flex-col items-center">
        <p>
          Institute: <span className="font-semibold">{user?.institute}</span>
        </p>
        <p>
          Board: <span className="font-semibold">{user?.board}</span>
        </p>
      </div>

      {/* adding further routing */}
      <Routes>
        <Route exact path="/*" element={<CardContainer data={adminOptions} />} />
        <Route
          path="/teacher-pending-requests/"
          element={<PendingRequests />}
        />
        <Route
          path="/see-all-exams/"
          element={<ExamList userToken={userToken} />}
        />
        {/* <Route path="/exam/:slug" element={<Exam />}/> */}
      </Routes>
    </div>
  );
};

export default Admin;
