import React, { useEffect, useState } from "react";
import fetchUser from "../../utils/FetchUser";
import { TbHourglassEmpty } from "react-icons/tb";

import Spinner from "../Spinner";

const PendingRequests = () => {
  const userToken = fetchUser();
  const [requests, setRequests] = useState([]);
  const [actionRequest, setActionRequest] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/request/pending`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setRequests(data.data))
      .then(setLoading(false));
  }, [actionRequest]);

  const handleRequest = (type, id) => {
    setActionRequest(!actionRequest); // toggle the action request value
    fetch(`${process.env.REACT_APP_API_URL}/request/${type}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + userToken
      }
    })
  }

  return (
    <div className="mt-4">
      <h1 className="text-center text-xl font-semibold">
        Pending requests of teachers
      </h1>

      {loading && <Spinner />}

      {requests?.length !== 0 ? (
        <div className="p-2 border-2 my-4 flex flex-col space-y-3">
          {requests?.map((request) => {
            return (
              <div key={request.id} className="flex p-2 flex-col md:flex-row shadow-lg rounded-md justify-center md:justify-between items-center space-y-2 md:space-y-0 md:space-x-2">
                <h2 className="font-semibold">{request?.teacher_name}</h2>
                <p className="cursor-pointer hover:font-bold">
                  {request?.text?.length > 20
                    ? request?.text.slice(0, 20) + "..."
                    : request?.text}
                </p>
                <div className="flex items-center space-x-2">
                  <button className="px-2 py-1 text-white rounded-md bg-green-600" onClick={() => handleRequest("approved", request?.id)}>
                    Approve
                  </button>
                  <button className="px-2 py-1 text-white rounded-md bg-red-600" onClick={() => handleRequest("rejected", request?.id)}>
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center my-10">
          <TbHourglassEmpty fontSize={50}/>
          <p className="italic">No pending requests!</p>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
