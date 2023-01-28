import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BsFillKeyboardFill } from "react-icons/bs";

import Form from "react-bootstrap/Form";

import fetchUser from "../../utils/FetchUser";
import { GiTeacher } from "react-icons/gi";

const MainHome = ({ loggedIn }) => {
  const [exams, setExams] = useState([]);
  const [examsCopy, setExamsCopy] = useState([]);
  const [tests, setTests] = useState([]);
  const [filter, setFilter] = useState("default");
  const [subFilter, setSubFilter] = useState("");
  const [teachersList, setTeachersList] = useState([]);
  const navigate = useNavigate();

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedSubOption, setSelectedSubOption] = useState("");

  const userToken = fetchUser();

  const options = [
    {
      value: "option1",
      label: "Option 1",
      subOptions: [
        { value: "subOption1", label: "Sub Option 1" },
        { value: "subOption2", label: "Sub Option 2" },
      ],
    },
    {
      value: "option2",
      label: "Option 2",
      subOptions: [
        { value: "subOption3", label: "Sub Option 3" },
        { value: "subOption4", label: "Sub Option 4" },
      ],
    },
  ];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/exams/list_all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setExams(data);
        setExamsCopy(data);
      });
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/exams/tests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTests(data);
      });
  }, []);

  useEffect(() => {
    switch (filter) {
      case "highAttempt":
        setExams((prev) => {
          let arr = [...examsCopy];
          arr.sort((a, b) => (a.attempts > b.attempts ? -1 : 1));
          return arr;
        });
        break;

      case "highRated":
        setExams((prev) => {
          let arr = [...examsCopy];
          arr.sort((a, b) => (a.rating > b.rating ? -1 : 1));
          return arr;
        });
        break;

      case "ssc":
        setExams((prev) => {
          let arr = [...examsCopy];
          return arr?.filter((exam) => exam.name.toLowerCase() === "ssc");
        });
        break;

      case "rrb":
        setExams((prev) => {
          let arr = [...examsCopy];
          return arr?.filter((exam) => exam.name.toLowerCase() === "rrb");
        });
        break;

      case "uppcl":
        setExams((prev) => {
          let arr = [...examsCopy];
          return arr?.filter((exam) => exam.name.toLowerCase() === "uppcl");
        });
        break;

      case "teachers":
        fetchTeachers();
        break;

      default:
        setExams((prev) => {
          let arr = [...examsCopy];
          arr.sort((a, b) => (a.id < b.id ? -1 : 1));
          return arr;
        });
        setTeachersList((prev) => {
          let arr = [...prev];
          arr = [];
          return arr;
        });
    }
  }, [filter]);

  useEffect(() => {
    setExams((prev) => {
      let arr = [...examsCopy];
      return arr?.filter((exam) => exam?.teacher === subFilter);
    });
  }, [subFilter]);

  const fetchTeachers = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/user-auth/teachers-list`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    );

    const data = await res.json();

    setTeachersList(data);
  };

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
        <div className="flex items-center w-full">
          <div className="my-3 p-2 basis-1/2">
            <Form.Select
              aria-label="filter"
              className="cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="default">None</option>
              <option value="highAttempt" className="cursor-pointer">
                Highest attempted exam
              </option>
              <option value="highRated" className="cursor-pointer">
                Highest rated exam
              </option>
              <option value="teachers" className="cursor-pointer">
                Teachers ▶
              </option>
              <option value="ssc" className="cursor-pointer">
                SSC
              </option>
              <option value="rrb" className="cursor-pointer">
                RRB
              </option>
              <option value="uppcl" className="cursor-pointer">
                UPPCL
              </option>
            </Form.Select>
          </div>

          <div className="basis-1/2">
            {filter && (
              <Form.Select
                value={subFilter}
                onChange={(e) => setSubFilter(e.target.value)}
              >
                {teachersList?.map((teacher) => {
                  return (
                    <option key={teacher?.id} value={teacher?.fname}>
                      {teacher?.fname}
                    </option>
                  );
                })}
              </Form.Select>
            )}
          </div>
        </div>

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

                        <button
                          className="bg-blue-500 hover:bg-blue-600 transition-all duration-100 rounded-md text-white px-2 py-1 font-bold disabled:bg-gray-500"
                          onClick={() => {
                            if (loggedIn) {
                              navigate(`/test-series/${test?.id}`);
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
