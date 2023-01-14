import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaUserAlt } from "react-icons/fa";

const JoinRoom = ({ user, userToken, joinedToggle, setJoinedToggle }) => {
  const [roomCode, setRoomCode] = useState("");
  const [highlight, setHighlight] = useState(true);
  const [backspace, setBackspace] = useState(true);
  const [autoScrolling, setAutoScrolling] = useState(true);

  let roomSettings = {
    highlight,
    backspace,
    autoScrolling,
  };

  const navigate = useNavigate();

  const handleJoinRoom = (e) => {
    e.preventDefault();

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        code: roomCode,
      }),
    };

    fetch(`${process.env.REACT_APP_API_URL}/room/join-room`, request)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`);
          setJoinedToggle(!joinedToggle);
          // saving room settings in localStorage
          localStorage.setItem("roomSettings", JSON.stringify(roomSettings));
        } else {
          navigate("/join-test");
          console.log("Invalid Room Code!");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-2">
      <header className="my-4 p-2 w-full bg-blue-500 rounded-md text-center flex items-center justify-center space-x-6">
        <FaUserAlt size={60} />
        <div>
          <p>
            <b>Student name </b>: {user?.fname}
          </p>
          <p>
            <b>Institute </b>: {user?.institute}
          </p>
          <p>
            <b>Grade </b>: {user?.grade}
          </p>
        </div>
      </header>

      <div className="text-center my-4">
        <h1 className="font-semibold text-2xl">Join Room </h1>
      </div>

      <form className="p-2 my-4 w-full md:w-[50%] md:mx-auto rounded-md bg-yellow-300 flex flex-col space-y-3">
        <div className="w-full flex justify-center items-center px-4 my-4">
          <input
            type="text"
            name="code"
            id="code"
            placeholder="room code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            className="rounded-lg p-1 border-2 border-yellow-500 text-center outline-none uppercase focus:shadow-lg transition-shadow duration-100"
          />
        </div>

        <div className="my-4">
          <h1 className="text-center text-lg mb-4">Room settings</h1>

          <div className="flex justify-between items-center px-4">
            <label htmlFor="code">Highlight the words ?</label>
            <input
              type="checkbox"
              name="highlight"
              id="highlight"
              checked={highlight}
              onChange={(e) => setHighlight(e.target.checked)}
              className="rounded-lg p-1 border-2 border-yellow-500 text-center outline-none uppercase focus:shadow-lg transition-shadow duration-100 cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center px-4">
            <label htmlFor="code">Allow Backspace ?</label>
            <input
              type="checkbox"
              name="backspace"
              id="backspace"
              checked={backspace}
              onChange={(e) => setBackspace(e.target.checked)}
              className="rounded-lg p-1 border-2 border-yellow-500 text-center outline-none uppercase focus:shadow-lg transition-shadow duration-100 cursor-pointer"
            />
          </div>

          <div className="flex justify-between items-center px-4">
            <label htmlFor="code">Autoscrolling ?</label>
            <input
              type="checkbox"
              name="scrolling"
              id="scrolling"
              checked={autoScrolling}
              onChange={(e) => setAutoScrolling(e.target.checked)}
              className="rounded-lg p-1 border-2 border-yellow-500 text-center outline-none uppercase focus:shadow-lg transition-shadow duration-100 cursor-pointer"
            />
          </div>
        </div>

        <div className="w-full py-4 flex items-center justify-center">
          <button
            className="rounded-lg text-white bg-green-600 px-2 py-1 disabled:bg-gray-400  transition-all duration-100"
            disabled={roomCode.length === 0}
            onClick={handleJoinRoom}
          >
            Join Room
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinRoom;
