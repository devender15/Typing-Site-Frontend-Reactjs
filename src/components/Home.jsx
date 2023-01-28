import React, { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import notify from "../utils/toast";

import fetchUser from "../utils/FetchUser";

// importing required components
import { Teacher, Student, Navbar } from "./";
import Spinner from "./Spinner";
import MainHome from "./student/MainHome";
import ProfileSettings from "./userSettings/ProfileSettings";

const Home = () => {

  const userToken = fetchUser();
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [roomCode, setRoomCode] = useState(null);
  const [joinedToggle, setJoinedToggle] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const fetchUserData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      };

      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/user-auth/get-user`,
        { headers: headers }
      );
      setUserData(resp.data);
      setLoggedIn(true);
      setLoading(false);
    } catch {
      localStorage.removeItem("user");
      setLoggedIn(false);
      setLoading(false);
      notify(toast, "Logged out !", "warning");
    }
  };

  const clearRoomCode = () => {
    if (localStorage.getItem("currentProgress"))
      localStorage.removeItem("currentProgress");
    setRoomCode(null);
  };

  // checking if the user is already in a room or not
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/room/user-in-room`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    })
      .then((response) => response.json())
      .then((data) => setRoomCode(data.code));
  }, []);

  useEffect(() => {
    // if use is not logged in then redirect to login page
    if (!userToken) setLoggedIn(false);
    setLoading(true);
    // fetching user data from server
    fetchUserData();
    // eslint-disable-next-line
  }, [userToken]);

  return (
    <>
      <div>
        <Navbar
          role={
            userData?.is_superuser
              ? "Admin"
              : !userData?.is_superuser && userData?.is_staff
              ? "Teacher"
              : userData?.is_active
              ? "Student"
              : ""
          }
          loggedIn={loggedIn}
          setLoggedIn={setLoggedIn}
          setUserData={setUserData}
          className="mb-10"
        />

        {loading && <Spinner />}

        {!userData ? (
          <MainHome loggedIn={loggedIn} />
        ) : userData?.is_staff ? (
          <Teacher
            user={userData}
            roomCode={roomCode}
            clearRoomCode={clearRoomCode}
            joinedToggle={joinedToggle}
            setLoggedIn={setLoggedIn}
          />
        ) : (
          <Student
            user={userData}
            joinedToggle={joinedToggle}
            setJoinedToggle={setJoinedToggle}
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
          />
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
