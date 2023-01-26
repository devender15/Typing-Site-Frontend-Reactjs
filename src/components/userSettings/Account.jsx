import React, { useState } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import notify from "../../utils/toast";

const Account = ({ user, userToken }) => {
  const [details, setDetails] = useState({
    fname: user?.fname,
    email: user?.email,
    phone: user?.phone,
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_API_URL}/user-auth/update-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
      body: JSON.stringify(details),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          notify(toast, data.msg, data.status);
        } catch {
          notify(toast, data.msg, data.status);
        }
      });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-center text-2xl font-semibold mt-2 mb-6">
        Account settings
      </h1>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4"
      >
        <TextField
          id="outlined-basic"
          label="First Name"
          variant="outlined"
          value={details?.fname}
          onChange={(e) => setDetails({ ...details, fname: e.target.value })}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={details?.email}
          onChange={(e) => setDetails({ ...details, email: e.target.value })}
        />
        {user?.is_staff ? (
          <TextField
            id="outlined-basic"
            label="Phone number"
            variant="outlined"
            value={details?.phone}
            onChange={(e) => setDetails({ ...details, phone: e.target.value })}
          />
        ) : null}

        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={details?.password}
          onChange={(e) => setDetails({ ...details, password: e.target.value })}
        />

        <Button
          variant="contained"
          type="submit"
          disabled={details?.password.length === 0}
          className="w-30 mx-auto"
        >
          Update
        </Button>
      </Box>
      <ToastContainer />
    </div>
  );
};

export default Account;
