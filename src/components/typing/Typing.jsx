import React, { useState, memo } from "react";
// import axios from "axios";
import { FaUserTie } from "react-icons/fa";
import { IoCaretBack } from "react-icons/io5";

import Sidebar from "./Sidebar";
import Timer from "./Timer";

// importing utility functions
import ModalComponent from "../../utils/Modal";
import paragraph from "../../utils/paragraph";

function Word({ text, active, correct, roomSettings }) {
  if (correct === true) {
    return (
      <span
        className="text-green-700"
        style={{ fontSize: Number(roomSettings?.fontSize) }}
      >
        {text}{" "}
      </span>
    );
  }

  if (correct === false) {
    return (
      <span
        className="text-red-600"
        style={{ fontSize: Number(roomSettings?.fontSize) }}
      >
        {text}{" "}
      </span>
    );
  }

  if (active === true) {
    return (
      <span
        className={
          roomSettings?.highlight
            ? "font-semibold bg-yellow-300"
            : "font-normal"
        }
        style={{ fontSize: Number(roomSettings?.fontSize) + "px" }}
      >
        {text}{" "}
      </span>
    );
  }

  return (
    <span style={{ fontSize: Number(roomSettings?.fontSize) }}>{text} </span>
  );
}

// avoiding excess re-rendering
Word = memo(Word);

const Typing = ({ user, cachedData, time, roomDetails, leaveRoomCallback }) => {
  // reading room settings from localStorage
  let roomSettings = localStorage.getItem("roomSettings")
    ? JSON.parse(localStorage.getItem("roomSettings"))
    : null;

  const [showModal, setShowModal] = useState(false);
  const [finished, setFinished] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [correctWordArray, setCorrectWordArray] = useState(
    cachedData ? cachedData.correctIndices : []
  );
  const [incorrectWordArray, setIncorrectWordArray] = useState(
    cachedData ? cachedData.incorrectIndices : []
  );
  const [activeWordIndex, setActiveWordIndex] = useState(
    cachedData ? cachedData.activeIndex : 0
  );
  const [startCounting, setStartCounting] = useState(false);
  const [currentProgress, setCurrentProgress] = useState({
    activeIndex: 0,
    correctIndices: [],
    incorrectIndices: [],
    keystrokes: 0,
    backspaceCount: 0,
    errorCount: 0,
    typedWords: 0,
    accuracy: 0,
    speed: 0,
    cpmSpeed: 0,
  });
  const [keystrokes, setKeystrokes] = useState(
    cachedData ? cachedData.keystrokes : 0
  );
  const [backspaceKeyCount, setBackspaceKeyCount] = useState(
    cachedData ? cachedData.backspaceCount : 0
  );

  // perfomance states
  const [userRank, setUserRank] = useState(0);
  const [topper, setTopper] = useState({});

  // typing paragraph
  const getCloud = paragraph(roomSettings, roomDetails);

  // here goes our functins and hooks
  const eventHandler = (e) => {
    if (e.key === "Backspace") {
      if (roomSettings?.backspace) {
        setBackspaceKeyCount((prev) => prev + 1);
        setKeystrokes(keystrokes - 1);
      }

      e.stopPropagation();
    }
  };

  const processInput = (value) => {
    if (activeWordIndex === getCloud.length) {
      return;
    }

    // increamenting the keystrokes value
    setKeystrokes((prev) => prev + 1);

    if (!startCounting) {
      setStartCounting(true);
    }

    if (value.endsWith(" ")) {
      // user has finished the word

      if (activeWordIndex === getCloud.length - 1) {
        // overflow
        setStartCounting(false);
        setShowModal(true);
        setFinished(true);
        setUserInput("Finished !");
      } else {
        setUserInput("");
      }

      setActiveWordIndex((prev) => prev + 1);

      // correct word
      setCorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word === getCloud[activeWordIndex];

        // saving the indices of all correct words
        setCurrentProgress((prev) => {
          return { ...prev, correctIndices: newResult };
        });

        return newResult;
      });

      // incorrect word
      setIncorrectWordArray((data) => {
        const word = value.trim();
        const newResult = [...data];
        newResult[activeWordIndex] = word !== getCloud[activeWordIndex];

        // saving the indices of all incorrect words
        setCurrentProgress((prev) => {
          return { ...prev, incorrectIndices: newResult };
        });

        return newResult;
      });
    } else {
      setUserInput(value);
    }

    // localStorage.setItem("currentProgress", JSON.stringify(currentProgress));
  };

  return (
    <div className="h-fit w-full overflow-hidden">
      <div className="flex w-full">
        <div className="w-full">
          <div className="flex items-start w-full h-fit justify-between px-2 py-1 border border-1 border-gray-500">
            <p className="text-sm text-gray-700 font-semibold">Sections</p>
            {/* showing the time left counter */}
            <Timer
              duration={time}
              startCounting={startCounting}
              setStartCounting={setStartCounting}
            />
          </div>
          <div className="flex w-full items-center space-x-1">
            <IoCaretBack size={25} color="gray" />
            <button className="text-white font-semibold bg-blue-500 p-2">
              Section A
            </button>
          </div>
        </div>

        <div className="w-[25%] mx-auto flex space-x-4 items-center justify-center py-1 border border-1 border-gray-500">
          <FaUserTie size={60} title="user" />
          <p>{user?.fname}</p>
        </div>
      </div>

      {/* modal pop-up */}
      <ModalComponent
        show={showModal}
        onHide={() => setShowModal(false)}
        heading="Test finished! 🎉"
        paragraph={`Hey ${user?.fname}, you finished #${userRank}!`}
        topper={userRank !== 1 ? topper : null}
      />

      <div className="flex items-start justify-between w-full h-full">
        <div className="w-full max-h-[80%] overflow-hidden">
          <div className="w-full p-2 bg-blue-500">
            <p className="text-white font-bold">Keyboard Layout: QWERTY</p>
          </div>

          <div className="h-[40%] overflow-hidden">
            <div className="mt-4 mb-2 border-2 overflow-y-scroll h-[9rem] w-[50%] break-words p-1">
              <p className="h-full">
                {getCloud.map((word, index) => {
                  return (
                    <Word
                      key={index}
                      text={word}
                      active={index === activeWordIndex}
                      correct={correctWordArray[index]}
                      roomSettings={roomSettings && roomSettings}
                    />
                  );
                })}
              </p>
            </div>
          </div>

          <div className="border-2 w-[50%] h-[9rem]">
            <textarea
              value={userInput}
              id="text-box"
              onChange={(e) => {
                processInput(e.target.value);
              }}
              disabled={finished}
              onKeyDown={(e) => eventHandler(e)}
              className="h-full w-full text-start resize-none font-semibold p-1 border-2 border-gray-400"
            ></textarea>
          </div>
        </div>

        <Sidebar
          correctWords={correctWordArray.filter(Boolean).length}
          incorrectWords={incorrectWordArray.filter(Boolean).length}
          startCounting={startCounting}
          setStartCounting={setStartCounting}
          leaveRoomCallback={leaveRoomCallback}
          totalwords={getCloud.length}
          backspaceKeyCount={backspaceKeyCount}
          keystrokes={keystrokes}
          time={time}
          setShowModal={setShowModal}
          setFinished={setFinished}
          roomDetails={roomDetails}
          activeWordIndex={activeWordIndex}
          currentProgress={currentProgress}
          setCurrentProgress={setCurrentProgress}
          setUserRank={setUserRank}
          setTopper={setTopper}
          finished={finished}
        />
      </div>
    </div>
  );
};

export default Typing;
