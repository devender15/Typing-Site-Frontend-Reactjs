import React, { useEffect, useState, memo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { BsBookHalf } from "react-icons/bs";

import { AddExam } from "../";

function Card({ data, setSelectedExam }) {
  return (
    <div
      className="p-4 rounded-md shadow-md cursor-pointer flex flex-col md:flex-row space-y-4 items-center md:space-y-0  md:space-x-10"
      onClick={() => setSelectedExam(data.id)}
    >
      <data.icon size={25} />
      <p className="font-semibold text-center">{data.name}</p>
    </div>
  );
}

function CardContainer({ data, setSelectedExam }) {
  return (
    <div className="grid grid-cols-2 gap-4 px-2 md:px-10">
      {data?.map((item, idx) => {
        return <Card key={idx} data={item} setSelectedExam={setSelectedExam} />;
      })}
    </div>
  );
}

function AddTest({ userToken, exam }) {
  const [testName, setTestName] = useState("");
  const [language, setLanguage] = useState("English");

  const postTest = async () => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/exams/add_test`,
      { test_name: testName, exam_id: exam, language: language},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    );

    setTestName("");
  };

  return (
    <div className="my-10">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <h2 className="text-center font-semibold text-lg">Add new test</h2>
        <input
          type="text"
          placeholder="Test name"
          name="test_name"
          id="test_name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500 outline-none my-1"
        />
        <input
          type="text"
          placeholder="Language"
          name="language"
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500 outline-none my-1"
        />
        <button
          onClick={postTest}
          className="rounded-lg text-white bg-green-500 px-2 py-1"
        >
          Add
        </button>
      </div>
    </div>
  );
}


// memoizing repeating components
CardContainer = memo(CardContainer);
Card = memo(Card);

const ExamList = ({ userToken, user }) => {
  const navigate = useNavigate();
  const [examData, setExamData] = useState([]);
  const [showAddExam, setShowAddExam] = useState(false);
  const [selectedExam, setSelectedExam] = useState(0);
  const [showExam, setShowExam] = useState(false);
  const [tests, setTests] = useState([]);
  const [showAddTest, setShowAddTest] = useState(false);

  let data = [];
  // let exams = [...examData];
  // console.log(exams);

  useEffect(() => {
    if (!userToken) navigate("/options");
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/exams/list_all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((resdata) => {
        resdata?.forEach((element) => {
          data.push({
            id: element.id,
            name: element.name,
            icon: BsBookHalf,
          });
        });
        setExamData(data);
      });
  }, []);

  useEffect(() => {
    setShowExam(true);

    fetch(`${process.env.REACT_APP_API_URL}/exams/tests`)
      .then((res) => res.json())
      .then((data) =>
        setTests(data?.filter((test) => test.exam === selectedExam))
      );
  }, [selectedExam]);

  return (
    <div>
      <div className="my-10">
        <h2 className="text-center font-bold text-2xl">
          Typing Exams {showAddExam && "/ Add Exam "}
        </h2>
      </div>

      <div className="w-full my-6 flex justify-end px-8">
        <button
          className="px-2 py-1 text-white rounded-lg bg-purple-600 hover:bg-purple-800 transition-all duration-100"
          onClick={() => setShowAddExam(!showAddExam)}
        >
          {showAddExam ? "Close" : "Add a new exam"}
        </button>
      </div>

      {showAddExam && <AddExam userToken={userToken} user={user} exams={examData} setExamData={setExamData}/>}

      <div>
        <CardContainer data={examData} setSelectedExam={setSelectedExam} />
      </div>

      {showExam && (
        <div className="my-6 p-2">
          <h1 className="text-center text-xl font-semibold">
            Tests in this exam {showAddTest && "/ Add Test"}
          </h1>

          <div className="w-full my-6 flex justify-end px-8">
            <button
              className="px-2 py-1 text-white rounded-lg bg-purple-600 hover:bg-purple-800 transition-all duration-100"
              onClick={() => setShowAddTest(!showAddTest)}
            >
              {showAddTest ? "Close" : "Add new test "}
            </button>
          </div>

          {showAddTest && <AddTest userToken={userToken} exam={selectedExam} />}

          <div className="my-3 grid grid-cols-2 gap-4 px-2 md:px-10">
            {tests?.map((test, idx) => {
              return (
                <div
                  key={idx}
                  className="p-4 rounded-md shadow-md cursor-pointer flex flex-col md:flex-row space-y-4 items-center md:space-y-0  md:space-x-10"
                >
                  <p className="font-semibold text-center">{test.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(ExamList);
