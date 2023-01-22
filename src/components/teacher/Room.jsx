import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FcInfo } from "react-icons/fc";

import { Typing } from "../";

const Room = ({ userToken, leaveRoomCallback, user, joinedToggle }) => {
  // reading old data from localStorage
  let cachedData = localStorage.getItem("currentProgress")
    ? JSON.parse(localStorage.getItem("currentProgress"))
    : null;

  const [roomDetails, setRoomDetails] = useState({});
  const [showInstructions, setShowInstructions] = useState(
    cachedData ? false : true
  );
  const { roomCode } = useParams();
  const navigate = useNavigate();

  // room settings states
  const [highlight, setHighlight] = useState(true);
  const [backspace, setBackspace] = useState(true);
  const [autoScrolling, setAutoScrolling] = useState(true);
  const [fontSize, setFontSize] = useState(20);
  const [paragraph, setParagraph] = useState("");

  let roomSettings = {
    highlight,
    backspace,
    autoScrolling,
    fontSize,
    paragraph,
  };

  document.title = "Typing Test Room | Typing site";

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
      .then((data) => {
        if (data.code === null && !roomDetails?.isExpired) {
          leaveRoomCallback();
          navigate("/");
        }
      });
    // eslint-disable-next-line
  }, [userToken]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/room/get-room?code=${roomCode}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => {
        if (!response.ok) navigate("/");
        return response.json();
      })
      .then((data) => {
        if (data?.isExpired) {
          leaveRoomCallback();
          navigate("/");
        }
        setRoomDetails(data);
      });
    // eslint-disable-next-line
  }, [roomCode, joinedToggle]);

  const handleLeaveRoom = () => {
    if (localStorage.getItem("currentProgress"))
      localStorage.removeItem("currentProgress");

    if (localStorage.getItem("roomSettings"))
      localStorage.removeItem("roomSettings");

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    };

    fetch(`${process.env.REACT_APP_API_URL}/room/leave-room`, request).then(
      (response) => {
        leaveRoomCallback();
        navigate("/");
      }
    );
  };

  const renderInstructions = () => {
    return (
      <div className="flex flex-col space-y-2 justify-center p-2 mx-auto shadow-md rounded-md items-center border-2 border-teal-400 w-[75%] max-h-[60%] my-10 overflow-y-scroll break-words">
        <h2 className="text-center text-xl font-bold">General Instructions</h2>
        <p className="font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut nemo
          beatae aspernatur ratione neque sequi aperiam nostrum minus sit earum
          accusantium, harum esse magni voluptas, consequuntur ipsam maxime qui.
          Totam minima deleniti iusto. Id in voluptatem similique, ullam
          explicabo nesciunt dolore natus et vel harum iusto earum veniam?
          Adipisci perferendis, enim illum veritatis sunt optio molestiae quam
          aspernatur sint eos ab voluptas culpa ipsam? Rerum cum omnis
          praesentium enim repellat iste dignissimos iusto veniam doloribus
          autem aperiam assumenda, quo recusandae. Sit tenetur atque quam
          consequuntur sed accusantium nemo, distinctio fuga suscipit
          consectetur perferendis veritatis cupiditate quaerat nisi eum harum
          ipsam voluptate magnam? Ducimus maiores sint asperiores aperiam,
          itaque reiciendis sed delectus est ipsa adipisci amet, at ipsum fugit
          ut nam excepturi rem saepe iste a inventore repellendus ex? Sed
          cupiditate esse amet deleniti ab itaque perferendis impedit eum
          provident id molestiae dolorum animi eaque aliquam exercitationem,
          reprehenderit pariatur fugit officia consequuntur sed accusantium
          nemo, distinctio fuga suscipit consectetur perferendis veritatis
          cupiditate quaerat nisi eum harum ipsam voluptate magnam? Ducimus
          maiores sint asperiores aperiam, itaque reiciendis sed delectus est
          ipsa adipisci amet, at ipsum fugit ut nam excepturi rem saepe iste a
          inventore repellendus ex? Sed cupiditate esse amet deleniti ab itaque
          perferendis impedit eum provident id molestiae dolorum animi eaque
          aliquam exercitationem, reprehenderit pariatur fugit officia.
          consequuntur sed accusantium nemo, distinctio fuga suscipit
          consectetur perferendis veritatis cupiditate quaerat nisi eum harum
          ipsam voluptate magnam? Ducimus maiores sint asperiores aperiam,
          itaque reiciendis sed delectus est ipsa adipisci amet, at ipsum fugit
          ut nam excepturi rem saepe iste a inventore repellendus ex? Sed
          cupiditate esse amet deleniti ab itaque perferendis impedit eum
          provident id molestiae dolorum animi eaque aliquam exercitationem,
          reprehenderit pariatur fugit officia.
        </p>

        <div className="flex flex-col w-[85%] space-y-2">
          <form className="my-1 px-16 w-full md:mx-auto rounded-md bg-teal-200 flex flex-col space-y-1 text-sm py-2">
            <h1 className="text-center text-lg mb-4">Test settings</h1>

            <div className="flex justify-between items-center px-4">
              <label htmlFor="highlight">Highlight the words ?</label>
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
              <label htmlFor="backspace">Allow Backspace ?</label>
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
              <label htmlFor="autoscroll">Autoscrolling ?</label>
              <input
                type="checkbox"
                name="autoscroll"
                id="autoscroll"
                checked={autoScrolling}
                onChange={(e) => setAutoScrolling(e.target.checked)}
                className="rounded-lg p-1 border-2 border-yellow-500 text-center outline-none uppercase focus:shadow-lg transition-shadow duration-100 cursor-pointer"
              />
            </div>

            <div className="flex justify-between items-center px-4">
              <label htmlFor="font">Font Size ( in pixels )</label>
              <input
                type="number"
                name="font"
                id="font"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="rounded-lg p-1 border-2 border-teal-500 text-center outline-none uppercase focus:shadow-lg transition-shadow duration-100"
              />
            </div>

            <div className="flex flex-col space-y-2 justify-between items-center px-4">
              <label htmlFor="paragraph">Add your own paragraph</label>
              <textarea
                name="paragraph"
                id="paragraph"
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                className="w-full rounded-lg p-2 outline-none text-sm font-semibold"
              ></textarea>
            </div>
          </form>
        </div>

        <button
          className="rounded-md px-2 py-1 text-white my-2 bg-teal-500 hover:bg-teal-600"
          onClick={() => {
            setShowInstructions(false);
            localStorage.setItem("roomSettings", JSON.stringify(roomSettings));
          }}
        >
          I understand
        </button>
      </div>
    );
  };

  return (
    <div className="h-screen overflow-hidden">
      {showInstructions ? (
        renderInstructions()
      ) : (
        <>
          <header className="p-2">
            <h1 className="text-2xl text-center font-bold tracking-widest">
              Typing Contest
            </h1>
            <p className="font-semibold text-center italic">
              organized by{" "}
              <span className="font-bold">{roomDetails?.host}</span>.
            </p>
          </header>

          <main className="my-2">
            <section className="text-center">
              {user.is_staff && roomDetails?.is_host && (
                <>
                  <h2 className="text-lg">
                    Participants Joined:{" "}
                    <span className="font-semibold text-red-600">
                      {roomDetails?.participants}
                    </span>
                  </h2>

                  <button
                    className="bg-gradient-to-r from-red-500 to-red-600 px-2 py-1 my-2 rounded-md text-white"
                    onClick={handleLeaveRoom}
                  >
                    End Room
                  </button>
                </>
              )}
            </section>

            <div className="bg-gray-700 px-2 py-1 flex items-center w-full justify-between">
              <p className="text-yellow-400">Typing Test</p>

              <div className="flex items-center space-x-1">
                <FcInfo size={20} />
                <p
                  className="text-white my-1 font-semibold cursor-pointer"
                  onClick={() => setShowInstructions(true)}
                >
                  View Instruction
                </p>
              </div>
            </div>

            {!user?.is_superuser &&
              !user?.is_staff &&
              !roomDetails?.is_host && (
                <section className="my-0">
                  <Typing
                    user={user && user}
                    cachedData={cachedData && cachedData}
                    time={roomDetails?.time}
                    roomDetails={roomDetails}
                    leaveRoomCallback={leaveRoomCallback}
                  />
                </section>
              )}
          </main>
        </>
      )}
    </div>
  );
};

export default Room;
