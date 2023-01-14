import React, { useEffect, useState } from "react";

import { useNavigate, Routes, Route } from "react-router-dom";

import { motion } from "framer-motion";

const PreviousContests = ({ user }) => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/room/list_all`)
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        // filtering our room according to the host
        setRooms((prevRooms) => {
          return prevRooms.filter((room) => room.host === user.fname).reverse();
        });
      });
  }, []);

  return (
    <>
      <main className="bg-gray-100 w-full h-full">
        <section className="p-2 my-4">
          <h1 className="text-2xl text-center font-semibold">
            See previous rooms
          </h1>
          <p className="text-center text-sm font-normal">
            Visit all the rooms made by you.
          </p>
        </section>

        <section className="h-full w-full overflow-hidden p-3">
          {rooms?.length !== 0 ? (
            <div className="h-[20rem] w-full md:w-[80%] lg:w-[60%] overflow-y-scroll rounded-md bg-white flex flex-col space-y-2 p-2 mx-auto">
              {rooms?.map((room, idx) => {
                return (
                  <motion.div
                    layout
                    key={room?.id}
                    className="flex flex-col space-y-2 items-center md:flex-row md:items-center md:justify-between md:space-y-0 p-2 rounded-md bg-gradient-to-r from-[#cc2b5e] to-[#753a88] outline-none text-white"
                  >
                    <p>{idx + 1}.</p>
                    <p>{room?.test_name}</p>
                    <p>Participants: {room?.participants}</p>
                    <p className="capitalize">{room?.paragraph}</p>
                    <p>Ended: {room?.isExpired ? "Yes" : "No"}</p>
                    <p>{room?.created_at.slice(2, 10)}</p>
                    <button
                      className="text-white bg-gradient-to-r from-[#cc2b5e] to-[#dc2430] px-2 py-1 font-bold rounded-md  transition-all duration-100"
                      onClick={() => navigate(`/room-details/${room?.id}`)}
                    >
                      View
                    </button>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <p className="text-2xl text-center font-semibold">
              You have not created any room yet!
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default React.memo(PreviousContests);
