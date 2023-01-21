import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Performance = ({ user, userToken }) => {
  const navigate = useNavigate();

  const [performances, setPerformances] = useState([]);
  const [overallPerformance, setOverallPerformance] = useState({});

  const calculateOverallPerformance = () => {
    let wpm,
      cpm,
      accuracy,
      errors,
      time_taken = 0;

    performances.forEach((performance) => {
      console.log(performance);
      wpm += performance.wpm;
      cpm += performance.cpm;
      accuracy += performance.accuracy;
      errors += performance.errors;
      time_taken = performance.time_taken;
    });

    let final_data = {
      wpm: wpm / performances.length,
      cpm: cpm / performances.length,
      accuracy: accuracy / performance.length,
      errors: errors / performance.length,
      time_taken: time_taken / performance.length,
    };

    console.log(final_data);
    setOverallPerformance(final_data);
  };

  useEffect(() => {
    if (!userToken) navigate("/");
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user-auth/view-progress`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPerformances(data);
        calculateOverallPerformance();
      });
  }, []);

  return (
    <div className="w-full h-full p-2 flex flex-col justify-center items-center">
      {performances?.length > 0 ? (
        <>
          {" "}
          <div className="my-4 text-center">
            <h1 className="text-lg md:text-2xl font-semibold text-teal-500">
              Your overall performance
            </h1>
          </div>
          <div className="w-[80%] md:w-1/2 mx-auto rounded-lg shadow-md p-4 border-2 bg-gradient-to-r from-gray-50 to-gray-100 flex justify-center items-center">
            <div className="flex flex-col items-center space-y-3 w-full md:w-[60%] lg:w-[70%]">
              <div className="w-full md:[w-65%] lg:w-1/2 px-2 md:px-6 flex justify-between items-center">
                <p className="font-semibold">WPM</p>
                <p>{isNaN(overallPerformance.wpm) ? 0 : overallPerformance.wpm}</p>
              </div>

              <div className="w-full md:[w-65%] lg:w-1/2 px-2 md:px-6 flex justify-between items-center">
                <p className="font-semibold">CPM</p>
                <p>{isNaN(overallPerformance.cpm) ? 0 : overallPerformance.cpm}</p>
              </div>

              <div className="w-full md:[w-65%] lg:w-1/2 px-2 md:px-6 flex justify-between items-center">
                <p className="font-semibold">Accuracy</p>
                <p>{isNaN(overallPerformance.accuracy) ? 0 : overallPerformance.accuracy} %</p>
              </div>

              <div className="w-full md:[w-65%] lg:w-1/2 px-2 md:px-6 flex justify-between items-center">
                <p className="font-semibold">Errors</p>
                <p>{isNaN(overallPerformance.errors) ? 0 : overallPerformance.errors}</p>
              </div>

              <div className="w-full md:[w-65%] lg:w-1/2 px-2 md:px-6 flex justify-between items-center">
                <p className="font-semibold">Time Taken</p>
                <p>{isNaN(overallPerformance.time_taken) ? 0 : overallPerformance.time_taken} seconds</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center sm:w-full md:w-[70%] lg:w-1/2 mx-auto bg-gray-100 p-2 my-10">
          <h1 className="sm:text-sm md:text-2xl font-semibold text-teal-600">
            You haven't completed any test yet !
          </h1>
        </div>
      )}
    </div>
  );
};

export default Performance;
