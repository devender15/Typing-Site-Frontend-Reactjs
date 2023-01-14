import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

import { useFormik } from "formik";
import * as Yup from "yup";

import LoginBg from "../assets/login.jpg";

const Login = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const [showNotify, setShowNotify] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  document.title = `Login as  ${type} | Typing Site`;

  // formik logics
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    // validate form

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("Please make sure that the password is correct")
        .required("Password is required"),
    }),

    // submit form
    onSubmit: (values) => {
      // console.log(values);
      sendData(values);
    },
  });

  const sendData = async (values) => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/user-auth/login`,
        { ...values, role: type }
      );

      localStorage.setItem("user", JSON.stringify(resp.data.token.access));

      // navigating to home
      navigate("/");
    } catch {
      setShowNotify(true);
      setErrorMessage("Invalid credentials!");
    }
  };

  const notify = (varient, message) => {
    return (
      <Alert variant={varient} onClose={() => setShowNotify(false)} dismissible>
        <p className="text-red-600">{message}</p>
      </Alert>
    );
  };

  return (
    <div className="h-screen overflow-hidden">
      <header className="p-2 my-2">
        <h1 className="font-semibold text-center py-2 text-xl">
          Login as {type}
        </h1>
      </header>

      {showNotify && notify("primary", errorMessage)}

      <section className="my-2 p-2 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
        <aside className="h-[55%] hidden md:block">
          <img
            src={LoginBg}
            alt="login-background"
            className="w-full h-full object-cover"
          />
        </aside>

        <main>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white flex rounded-lg w-full font-latoRegular"
          >
            <div className="flex-1 text-gray-700 p-20">
              <div className="mt-6">
                <div className="pb-4">
                  <label
                    className={`block font-latoBold text-sm pb-2 ${
                      formik.touched.email && formik.errors.email
                        ? "text-red-400"
                        : ""
                    }`}
                    htmlFor="email"
                  >
                    {formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : "Email"}
                  </label>
                  <input
                    className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                    type="email"
                    name="email"
                    id="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    placeholder="Enter your email"
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="pb-4 w-full">
                  <label
                    className={`block font-latoBold text-sm pb-2 ${
                      formik.touched.password && formik.errors.password
                        ? "text-red-400"
                        : ""
                    }`}
                    htmlFor="password"
                  >
                    {formik.touched.password && formik.errors.password
                      ? formik.errors.password
                      : "Password"}
                  </label>
                  <input
                    className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                    type="password"
                    name="password"
                    id="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder="Enter password"
                    onBlur={formik.handleBlur}
                  />
                </div>

                <button
                  type="submit"
                  className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full"
                >
                  Login
                </button>
              </div>
            </div>
          </form>

          <div className="my-2 p-2">
            <p className="text-center">
              Not have any account?{" "}
              <span
                className="text-blue-700 underline underline-offset-1 cursor-pointer"
                onClick={() => navigate(`/register/${type}`)}
              >
                Register
              </span>{" "}
              here
            </p>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Login;
