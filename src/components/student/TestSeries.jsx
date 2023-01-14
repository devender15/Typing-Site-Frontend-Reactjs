import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import fetchUser from "../../utils/FetchUser";
import Logout from "../../utils/Logout";

import { AiOutlineClockCircle } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { GiLevelTwo } from "react-icons/gi";
import { RiUser3Line } from "react-icons/ri";



const TestSeries = ({ user }) => {
  const { test_id } = useParams();
  const navigate = useNavigate();

  const [liveTests, setLiveTests] = useState([]);

  // fetching userToken from localStorage
  const userToken = fetchUser();


  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/exams/get_live_tests/${test_id}`)
      .then((res) => res.json())
      .then((data) => (data?.length === 0 ? navigate("/") : setLiveTests(data)));
  }, []);


  const handleJoinRoom = (roomCode, test_id) => {
    
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
          // saving room settings in localStorage
          // localStorage.setItem("roomSettings", JSON.stringify(roomSettings));
        } else {
          navigate(`/test-series/${test_id}`);
          console.log("Invalid Room Code!");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <header className="flex flex-col space-y-2 my-3">
        <h1 className="text-center text-2xl font-semibold uppercase">
          {" "}
          ⚡ {liveTests[0]?.test_name}
        </h1>
        <p className="text-center text-lg">
          You can select any test series according to your wish.
        </p>
      </header>

      <main className="my-2 p-2 border-1 border-gray-300 w-full bg-gray-100">
        <section className="h-[70rem] md:h-[35rem] grid grid-cols-1 md:grid-cols-2 gap-2 overflow-hidden px-4">
          <aside className="h-[80%] my-auto overflow-y-scroll flex flex-col space-y-3">
            {liveTests?.map((test) => {
              return (
                <motion.div
                  layout
                  key={test?.id}
                  className="p-4 rounded-md flex items-center justify-between bg-white"
                >
                  <div className="flex flex-col space-y-2">
                    <div className="rounded-lg bg-green-500 px-2 py-1 w-fit">
                      <p className="uppercase text-white text-sm font-semibold font-sans">
                        Free Test
                      </p>
                    </div>

                    <p className="font-sans text-sm font-semibold">
                      {test?.test_name} : {test?.created_at.slice(2, 10)} - {test?.id}
                    </p>

                    <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:items-center md:space-x-4">
                      <p className="flex space-x-2 items-center text-gray-500">
                        <AiOutlineClockCircle color="gray" size={15} title="Time limit"/>
                        <span className="text-sm">{test?.time} Seconds</span>
                      </p>

                      <p className="flex space-x-2 items-center text-gray-500">
                        <FaUserAlt color="gray" size={15} title="Host" />
                        <span className="text-sm">{test?.host}</span>
                      </p>

                      <p className="flex space-x-2 items-center text-gray-500">
                        <GiLevelTwo color="gray" size={15} title="Level"/>
                        <span className="text-sm">{test?.paragraph}</span>
                      </p>
                    </div>
                  </div>

                  <div>
                    <button className="bg-gradient-to-r from-green-400 to-green-500 text-white px-2 md:px-6 py-2 font-semibold rounded-md" onClick={() => handleJoinRoom(test?.code, test?.test_id)}>
                      Start Test
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </aside>

          <aside className="p-4">
            <div className="rounded-lg border-2 p-6 shadow-lg w-1/2 flex flex-col space-y-3">
              <RiUser3Line size={60} />
              <p className="font-semibold">{user?.fname}</p>
              <hr />
              <button className="bg-gradient-to-r from-blue-400 to-blue-500 text-white px-2 py-1 rounded-md" onClick={Logout}>
                Log Out
              </button>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
};

export default TestSeries;
