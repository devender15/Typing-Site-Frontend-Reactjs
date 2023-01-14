import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsFillKeyboardFill } from "react-icons/bs";

const MainHome = ({ loggedIn }) => {
  const [exams, setExams] = useState([]);
  const [tests, setTests] = useState([]);
  const navigate = useNavigate();

  const [highlight, setHighlight] = useState(true);
  const [backspace, setBackspace] = useState(true);
  const [autoScrolling, setAutoScrolling] = useState(true);

  let roomSettings = {
    highlight,
    backspace,
    autoScrolling,
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/exams/list_all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setExams(data));
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/exams/tests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setTests(data));
  }, []);

  return (
    <>
      <header className="my-2">
        <h1 className="text-2xl text-center font-semibold">
          Browse Test Series
        </h1>
        <p className="text-center text-lg">
          Select any test series which you want to try
        </p>
      </header>

      <main className="bg-gray-100 p-4 w-full h-full flex flex-col space-y-4">
        {exams?.map((exam) => {
          return (
            <section key={exam?.id} className="flex flex-col space-y-2">
              <h1 className="text-center text-xl md:text-2xl font-semibold my-2 uppercase">
                ⚡ {exam?.name}
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {tests
                  ?.filter((test) => test?.exam === exam?.id)
                  ?.map((test) => {
                    return (
                      <motion.div
                        layout
                        key={test?.id}
                        className="p-2 flex flex-col space-y-3 w-fit border-2 border-gray-400 rounded-lg shadow-lg"
                      >
                        <BsFillKeyboardFill size={30} />
                        <div className="flex flex-col space-y-0">
                          <p className="font-semibold uppercase">
                            {test?.name}
                          </p>
                          <p className="font-semibold uppercase">
                            {test?.live} Total Tests |{" "}
                            <span className="text-green-600">
                              {" "}
                              Test Series{" "}
                            </span>
                          </p>
                        </div>
                        <hr />

                        <div className="flex flex-col space-y-2">
                          <form className="my-1 w-full md:mx-auto rounded-md bg-teal-200 flex flex-col space-y-1 text-sm p-1">
                            <h1 className="text-center text-lg mb-4">
                              Test settings
                            </h1>

                            <div className="flex justify-between items-center px-4">
                              <label htmlFor={`highlight${test?.id}`}>
                                Highlight the words ?
                              </label>
                              <input
                                type="checkbox"
                                name={`highlight${test?.id}`}
                                id={`highlight${test?.id}`}
                                checked={highlight}
                                onChange={(e) => setHighlight(e.target.checked)}
                                className="rounded-lg p-1 border-2 border-yellow-500 text-center outline-none uppercase focus:shadow-lg transition-shadow duration-100 cursor-pointer"
                              />
                            </div>

                            <div className="flex justify-between items-center px-4">
                              <label htmlFor={`backspace${test?.id}`}>
                                Allow Backspace ?
                              </label>
                              <input
                                type="checkbox"
                                name={`backspace${test?.id}`}
                                id={`backspace${test?.id}`}
                                checked={backspace}
                                onChange={(e) => setBackspace(e.target.checked)}
                                className="rounded-lg p-1 border-2 border-yellow-500 text-center outline-none uppercase focus:shadow-lg transition-shadow duration-100 cursor-pointer"
                              />
                            </div>

                            <div className="flex justify-between items-center px-4">
                              <label htmlFor={`scroll${test?.id}`}>
                                Autoscrolling ?
                              </label>
                              <input
                                type="checkbox"
                                name={`scroll${test?.id}`}
                                id={`scroll${test?.id}`}
                                checked={autoScrolling}
                                onChange={(e) =>
                                  setAutoScrolling(e.target.checked)
                                }
                                className="rounded-lg p-1 border-2 border-yellow-500 text-center outline-none uppercase focus:shadow-lg transition-shadow duration-100 cursor-pointer"
                              />
                            </div>
                          </form>
                        </div>

                        <button
                          className="bg-blue-500 hover:bg-blue-600 transition-all duration-100 rounded-md text-white px-2 py-1 font-bold disabled:bg-gray-500"
                          onClick={() => {
                            if (loggedIn) {
                              navigate(`/test-series/${test?.id}`);
                              localStorage.setItem(
                                "roomSettings",
                                JSON.stringify(roomSettings)
                              );
                            } else navigate("/options");
                          }}
                          disabled={test?.live === 0}
                        >
                          View Test Series
                        </button>
                      </motion.div>
                    );
                  })}
              </div>
            </section>
          );
        })}
      </main>
    </>
  );
};

export default React.memo(MainHome);
