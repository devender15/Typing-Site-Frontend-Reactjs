import React, { useState } from "react";
import { BsBookHalf } from "react-icons/bs";

import axios from "axios";

const AddExam = ({ userToken, setExamData }) => {
  const [examName, setExamName] = useState("");

  const postExam = async () => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/exams/add_exam`,
      { exam_name: examName },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + userToken,
        },
      }
    );

    if (resp.status === 201) {
      setExamName("");
      setExamData((prevElements) => {
        let newArr = prevElements;
        newArr.push({
          name: examName,
          icon: BsBookHalf,
          id: prevElements[-1]?.id + 1,
        });
        return newArr;
      });
    }
  };

  return (
    <div className="my-10">
      <div className="flex flex-col space-y-4 justify-center items-center">
        <h2 className="text-center font-semibold text-lg">Add a new exam</h2>
        <input
          type="text"
          placeholder="Exam name"
          name="exam_name"
          id="exam_name"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          className="border-2 border-gray-500 p-2 rounded-md w-1/2 focus:border-teal-500 focus:ring-teal-500 outline-none my-1"
        />
        <button
          onClick={postExam}
          className="rounded-lg text-white bg-green-500 px-2 py-1"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddExam;
