import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import fetchUser from "../../utils/FetchUser";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import notify from "../../utils/toast";

import { FaUsers } from "react-icons/fa";
import { GrPersonalComputer } from "react-icons/gr";
import { BsBookFill } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

import { CardContainer, ExamList } from "../";

// importing required components
import CreateRoom from "./CreateRoom";
import Room from "./Room";
import PreviousContests from "./PreviousContests";
import LiveTests from "./LiveTests";
import RoomDetails from "./RoomDetails";
import Settings from "../userSettings/Settings";

const Teacher = ({
  user,
  roomCode,
  clearRoomCode,
  joinedToggle,
  setJoinedToggle,
  setLoggedIn,
}) => {
  document.title = "Teacher Panel | Typing site";
  const userToken = fetchUser();
  const [text, setText] = useState("");

  const teacherOptions = [
    {
      name: "Start test",
      icon: FaUsers,
    },
    {
      name: "See all exams",
      icon: BsBookFill,
    },
    {
      name: "See all previous contests",
      icon: GrPersonalComputer,
    },
    {
      name: "Live contests",
      icon: FiUsers,
    },
  ];

  useEffect(() => {
    if (!userToken) setLoggedIn(false);
    // checking if the usertoken is valid or not
    if (user?.errors) localStorage.clear();
  }, []);

  const sendRequest = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + userToken,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/request/propose`,
      { text: text },
      { headers: headers }
    );

    setText("");

    notify(toast, response.data.success, "success");
  };

  return (
    <div className="p-2">
      <header className="flex flex-col items-center justify-center my-4">
        <div className="flex items-center space-x-2 my-4">
          <h2 className="font-semibold">Status: </h2>
          {!user?.approved ? (
            <p className="bg-red-600 p-2 rounded-md text-white">
              You are not approved by admin!
            </p>
          ) : (
            <p className="bg-green-600 p-2 rounded-md text-white">
              You are approved by admin!
            </p>
          )}
        </div>

        <div className="my-2 flex flex-col space-y-2 items-center p-2 border-2 rounded-md bg-gray-300">
          <h2>
            Teacher name: <span className="font-semibold">{user?.fname}</span>
          </h2>

          <h2>
            Teacher's email:{" "}
            <span className="font-semibold">{user?.email}</span>
          </h2>

          <h2>
            Institute: <span className="font-semibold">{user?.institute}</span>
          </h2>
        </div>
      </header>

      <main>
        {!user?.approved && (
          <section className="flex flex-col space-y-2 items-center">
            <h1 className="font-semibold text-lg">Send an approval request</h1>

            <textarea
              name="text"
              id="text"
              className="bg-gray-100 border-2 rounded-md outline-none border-teal-800 p-2 text-sm w-full lg:w-[60%]"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your Youtube/ Telegram channel link. Also Share your achievements, experience etc. This helps us in avoiding spammers."
            ></textarea>

            <button
              className="px-2 py-1 text-white rounded-lg bg-purple-700"
              onClick={sendRequest}
            >
              Send Request
            </button>
          </section>
        )}
      </main>

      {/* adding further routing */}
      <Routes>
        <Route
          path="/*"
          element={user?.approved && <CardContainer data={teacherOptions} />}
        />
        <Route
          path="/start-test"
          element={
            user?.approved &&
            (roomCode ? (
              <Navigate replace to={`/room/${roomCode}`} />
            ) : (
              <CreateRoom userToken={userToken} />
            ))
          }
        />
        <Route
          path="/room/:roomCode"
          element={
            user?.approved && (
              <Room
                userToken={userToken}
                user={user}
                leaveRoomCallback={clearRoomCode}
                joinedToggle={joinedToggle}
                setJoinedToggle={setJoinedToggle}
              />
            )
          }
        />
        <Route
          path="/see-all-exams"
          element={user?.approved && <ExamList userToken={userToken} />}
        />
        <Route
          path="/see-all-previous-contests/*"
          element={<PreviousContests user={user && user} />}
        />
        <Route
          path="/live-contests"
          element={<LiveTests user={user && user} />}
        />
        <Route path="/room-details/:roomId" element={<RoomDetails />} />
        <Route
          path="/profile-settings/*"
          element={<Settings user={user && user} userToken={userToken} />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default Teacher;
