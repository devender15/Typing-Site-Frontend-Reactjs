import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoom = ({ userToken }) => {
  const [tests, setTests] = useState([]);
  const [filteredTests, setFilteredTests] = useState([]);
  const [exams, setExams] = useState([]);


  // room configs
  const [examSelected, setExamSelected] = useState(1);
  const [test, setTest] = useState("");
  const [time, setTime] = useState(60);
  const [paragraph, setParagraph] = useState("easy");
  const [criteria, setCriteria] = useState("");
  const [paragraphText, setParagraphText] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/exams/list_all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setExams(data));
  }, []);

  useEffect(() => {
    if (!userToken) {
      localStorage.clear();
      navigate("/options");
    }
  }, []);

  const filterTests = () => {
    const filteredArray = tests?.filter((test) => test.exam == examSelected);
    setFilteredTests(filteredArray);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/exams/tests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTests(data));
  }, []);

  useEffect(() => {
    filterTests();
  }, [examSelected]);

  const handleCreateRoom = () => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify({
        exam: examSelected,
        test_name: test,
        time,
        paragraph,
        criteria,
        paragraphText,
      }),
    };

    fetch(`${process.env.REACT_APP_API_URL}/room/create-room`, request)
      .then((response) => response.json())
      .then((data) => navigate(`/room/${data.code}`));
  };

  return (
    <div>
      <header>
        <h1 className="text-center text-xl font-semibold">Host a Test</h1>
      </header>

      <main className="my-2">
        <h2 className="text-center text-lg">Please configure the room</h2>

        <div className="p-2 my-4 w-full md:w-[50%] md:mx-auto rounded-md bg-yellow-300 flex flex-col space-y-3">
          <div className="flex justify-between items-center px-4">
            <label htmlFor="exam">Select Exam</label>
            <select
              className="p-1 rounded-lg border-2 border-yellow-500 cursor-pointer bg-white"
              name="exam"
              id="exam"
              value={examSelected}
              onChange={(e) => setExamSelected(e.target.value)}
            >
              {exams?.map((exam) => {
                return (
                  <option key={exam.id} value={exam.id}>
                    {exam.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-between items-center px-4">
            <label htmlFor="test">Select Test</label>
            <select
              className="p-1 rounded-lg border-2 border-yellow-500 cursor-pointer bg-white"
              name="test"
              id="test"
              value={test}
              onChange={(e) => setTest(e.target.value)}
            >
              {filteredTests?.map((test) => {
                return (
                  <option key={test.id} value={test.name}>
                    {test.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex justify-between items-center px-4">
            <label htmlFor="time">Time Limit</label>
            <input
              type="number"
              name="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="in seconds"
              className="rounded-lg p-1 border-2 border-yellow-500 text-center outline-none"
            />
          </div>

          <div className="flex justify-between items-center px-4">
            <label htmlFor="test">Paragraph level</label>
            <select
              className="p-1 rounded-lg border-2 border-yellow-500 cursor-pointer bg-white"
              name="test"
              id="test"
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Difficult">Difficult</option>
            </select>
          </div>

          <div className="flex flex-col space-y-2 justify-between items-center px-4">
            <label htmlFor="criteria">Test Criteria</label>
            <textarea
              name="criteria"
              id="criteria"
              value={criteria}
              onChange={(e) => setCriteria(e.target.value)}
              className="w-full rounded-lg p-2 outline-none text-sm font-semibold"
            ></textarea>
          </div>

          <div className="flex flex-col space-y-2 justify-between items-center px-4">
            <label htmlFor="paragraph">Add Paragraph</label>
            <textarea
              name="paragraph"
              id="paragraph"
              value={paragraphText}
              onChange={(e) => setParagraphText(e.target.value)}
              placeholder="Paragraph should not be less than 50 words"
              className="w-full rounded-lg p-2 outline-none text-sm font-semibold"
            ></textarea>
          </div>

          <div className="w-full py-4 flex items-center justify-center">
            <button
              className="rounded-lg text-white bg-green-600 px-2 py-1 disabled:bg-gray-400"
              disabled={criteria.length === 0 || paragraphText.length === 0 || paragraphText?.split(" ")?.length < 50}
              onClick={handleCreateRoom}
            >
              Create Room
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateRoom;
