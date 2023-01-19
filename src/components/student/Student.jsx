import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";

import JoinRoom from "./JoinRoom";
import Room from "../teacher/Room";
import MainHome from "./MainHome";
import TestSeries from "./TestSeries";
import ProfileSettings from "../ProfileSettings";

import fetchUser from "../../utils/FetchUser";

const Student = ({
  user,
  joinedToggle,
  setJoinedToggle,
  setLoggedIn,
  loggedIn,
}) => {
  document.title = "Student Panel | Typing site";
  const userToken = fetchUser();

  const [roomCode, setRoomCode] = useState(null);

  // checking if the user is already in a room or not
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/room/user-in-room`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setRoomCode(data.code));
  }, [user]);

  const clearRoomCode = () => {
    if (localStorage.getItem("currentProgress"))
      localStorage.removeItem("currentProgress");

    if (localStorage.getItem("roomSettings"))
      localStorage.removeItem("roomSettings");
    setRoomCode(null);
  };

  useEffect(() => {
    if (!userToken) setLoggedIn(false);
    // checking if the usertoken is valid or not
    if (user?.errors) localStorage.clear();
  }, []);

  return (
    <div>
      {/* adding further routing */}
      <Routes>
        <Route path="/*" element={<MainHome loggedIn={loggedIn} />} />
        <Route
          path="/test-series/:test_id"
          element={<TestSeries user={user && user} />}
        />
        <Route
          path="/join-test"
          element={
            roomCode ? (
              <Navigate replace to={`/room/${roomCode}`} />
            ) : (
              <JoinRoom
                user={user && user}
                userToken={userToken}
                joinedToggle={joinedToggle}
                setJoinedToggle={setJoinedToggle}
              />
            )
          }
        />
        <Route
          path="/room/:roomCode"
          element={
            <Room
              userToken={userToken}
              user={user}
              leaveRoomCallback={clearRoomCode}
            />
          }
        />
        <Route
          path="/profile-settings"
          element={
            <ProfileSettings user={user && user} userToken={userToken} />
          }
        />
      </Routes>
    </div>
  );
};

export default Student;
