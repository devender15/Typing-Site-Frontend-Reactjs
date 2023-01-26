import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LiveTests = ({ userToken }) => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/room/live-room`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setRooms(data));
  });

  return (
    <div className="overflow-hidden">
      {rooms?.length !== 0 && (
        <h1 className="text-center font-semibold text-3xl my-4">
          Ongoing rooms created by you.
        </h1>
      )}
      <section className="h-full w-full overflow-hidden p-3">
        {rooms?.length !== 0 ? (
          <div className="h-[20rem] w-full md:w-[80%] lg:w-[60%] overflow-y-scroll rounded-md bg-white flex flex-col space-y-2 p-2 mx-auto">
            {rooms?.map((room, idx) => {
              return (
                <motion.div
                  layout
                  key={room?.id}
                  className="flex flex-col space-y-2 items-center md:flex-row md:items-center md:justify-between md:space-y-0 p-2 rounded-md bg-gradient-to-r from-[#D1913C] to-[#FFD194] outline-none text-white"
                >
                  <p>{idx + 1}.</p>
                  <p>{room?.test_name}</p>
                  <p>Participants: {room?.participants}</p>
                  <p className="capitalize">{room?.paragraph}</p>
                  <p>{room?.created_at.slice(2, 10)}</p>
                  <button
                    className="text-white bg-gradient-to-r from-[#fdc830] to-[#f37335] px-2 py-1 font-bold rounded-md  transition-all duration-100"
                    onClick={() => navigate(`/room/${room?.code}`)}
                  >
                    View
                  </button>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <p className="text-2xl text-center font-semibold">
            All rooms are closed!
          </p>
        )}
      </section>
    </div>
  );
};

export default LiveTests;
