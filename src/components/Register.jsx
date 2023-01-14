import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import schoolBoards from "../utils/data";

import { useFormik } from "formik";
import * as Yup from "yup";

import RegisterBg from "../assets/register.jpg";

const Register = () => {
  const { type } = useParams();
  const navigate = useNavigate();

  document.title = `Register as  ${type} | Typing Site`;

  const boardsName = schoolBoards();

  const checkTeacher = type === "teacher" ? true : false;

  // formik logics
  const formik = useFormik({
    initialValues: {
      fname: "",
      board: "",
      phone: "",
      institute: "",
      grade: type === "student" ? "" : "default",
      email: "",
      password: "",
      instagramURL: "",
      websiteURL: "",
      youtubeURL: "",
      telegramURL: "",
      facebookURL: "",
    },

    // validate form
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string().required("Password is required"),
      fname: Yup.string()
        .required("Name is required")
        .min(5, "Make sure that you have atleast 5 letters in your name"),
      grade: type === "student" ? Yup.string() : "",
      phone:
        type !== "student"
          ? Yup.string()
              .required("Phone number is required")
              .min(10, "It should be a 10 digits number !")
              .max(10, "It should be a 10 digits number max !")
          : "",
      board: type !== "student" ? Yup.string() : "",
      institute: type !== "student" ? Yup.string() : "",
      // social media urls validation
      websiteURL: Yup.string(),
      youtubeURL: Yup.string(),
      telegramURL: Yup.string(),
      instagramURL: Yup.string(),
      facebookURL: Yup.string(),
    }),

    // submit form
    onSubmit: (values) => {
      // sending data to the api
      sendData(values);
    },
  });

  const sendData = async (values) => {
    const resp = await axios.post(
      `${process.env.REACT_APP_API_URL}/user-auth/register`,
      {
        ...values,
        is_superuser: false,
        is_staff: checkTeacher,
      }
    );

    localStorage.setItem("user", JSON.stringify(resp.data.token.access));

    // navigating to home
    navigate("/");
  };

  return (
    <div>
      <header className="p-2 my-2">
        <h1 className="font-semibold text-center py-2 text-xl">
          Register as {type}
        </h1>
      </header>

      <section className="my-2 p-2 grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-2">
        <main>
          <form
            onSubmit={formik.handleSubmit}
            className="bg-white flex rounded-lg w-full font-latoRegular"
          >
            <div className="flex-1 text-gray-700 p-20">
              <div className="mt-6">
                {type === "teacher" ? (
                  <div className="pb-4">
                    <label
                      className={`block font-latoBold text-sm pb-2 ${
                        formik.touched.institute && formik.errors.institute
                          ? "text-red-400"
                          : ""
                      }`}
                      htmlFor="institute"
                    >
                      {formik.touched.institute && formik.errors.institute
                        ? formik.errors.institute
                        : "Institute / Channel Name"}
                    </label>
                    <input
                      className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                      type="text"
                      name="institute"
                      id="institute"
                      value={formik.values.institute}
                      onChange={formik.handleChange}
                      placeholder="Enter institute / channel name"
                      onBlur={formik.handleBlur}
                    />
                  </div>
                ) : null}

                <div className="pb-4">
                  <label
                    className={`block font-latoBold text-sm pb-2 ${
                      formik.touched.board && formik.errors.board
                        ? "text-red-400"
                        : ""
                    }`}
                    htmlFor="board"
                  >
                    {formik.touched.board && formik.errors.board
                      ? formik.errors.board
                      : "Board"}
                  </label>
                  <select
                    name="board"
                    id="board"
                    className="border-2 border-gray-500 p-2 rounded-md text-sm w-full focus:border-teal-500 focus:ring-teal-500 outline-none"
                    value={formik.values.board}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {boardsName?.map((name, idx) => {
                      return (
                        <option key={idx} value={name} className="text-sm">
                          {name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="pb-4">
                  <label
                    className={`block font-latoBold text-sm pb-2 ${
                      formik.touched.fname && formik.errors.fname
                        ? "text-red-400"
                        : ""
                    }`}
                    htmlFor="fname"
                  >
                    {formik.touched.fname && formik.errors.fname
                      ? formik.errors.fname
                      : "Full Name"}
                  </label>
                  <input
                    className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                    type="text"
                    name="fname"
                    id="fname"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    placeholder="Enter your full name"
                    onBlur={formik.handleBlur}
                  />
                </div>
                {type !== "student" && (
                  <div className="pb-4">
                    <label
                      className={`block font-latoBold text-sm pb-2 ${
                        formik.touched.phone && formik.errors.phone
                          ? "text-red-400"
                          : ""
                      }`}
                      htmlFor="phone"
                    >
                      {formik.touched.phone && formik.errors.phone
                        ? formik.errors.phone
                        : "Phone number"}
                    </label>
                    <input
                      className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                      type="text"
                      name="phone"
                      id="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      placeholder="Enter phone number"
                      onBlur={formik.handleBlur}
                    />
                  </div>
                )}
                {type === "student" && (
                  <div className="pb-4">
                    <label
                      className={`block font-latoBold text-sm pb-2 ${
                        formik.touched.grade && formik.errors.grade
                          ? "text-red-400"
                          : ""
                      }`}
                      htmlFor="grade"
                    >
                      {formik.touched.grade && formik.errors.grade
                        ? formik.errors.grade
                        : "Exam you are targeting"}
                    </label>
                    <input
                      className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                      type="text"
                      name="grade"
                      id="grade"
                      value={formik.values.grade}
                      onChange={formik.handleChange}
                      placeholder="Enter exam name"
                      onBlur={formik.handleBlur}
                    />
                  </div>
                )}
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

                {type === "teacher" ? (
                  <>
                    <div className="pb-4">
                      <label
                        className={`block font-latoBold text-sm pb-2 ${
                          formik.touched.websiteURL && formik.errors.websiteURL
                            ? "text-red-400"
                            : ""
                        }`}
                        htmlFor="websiteURL"
                      >
                        {formik.touched.websiteURL && formik.errors.websiteURL
                          ? formik.errors.websiteURL
                          : "Website link"}
                      </label>
                      <input
                        className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                        type="url"
                        name="websiteURL"
                        id="websiteURL"
                        value={formik.values.websiteURL}
                        onChange={formik.handleChange}
                        placeholder="Enter your website url here"
                        onBlur={formik.handleBlur}
                      />
                    </div>

                    <div className="pb-4">
                      <label
                        className={`block font-latoBold text-sm pb-2 ${
                          formik.touched.instagramURL &&
                          formik.errors.instagramURL
                            ? "text-red-400"
                            : ""
                        }`}
                        htmlFor="instagramURL"
                      >
                        {formik.touched.instagramURL &&
                        formik.errors.instagramURL
                          ? formik.errors.instagramURL
                          : "Instagram link"}
                      </label>
                      <input
                        className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                        type="url"
                        name="instagramURL"
                        id="instagramURL"
                        value={formik.values.instagramURL}
                        onChange={formik.handleChange}
                        placeholder="Enter your instagram url here"
                        onBlur={formik.handleBlur}
                      />
                    </div>

                    <div className="pb-4">
                      <label
                        className={`block font-latoBold text-sm pb-2 ${
                          formik.touched.telegramURL &&
                          formik.errors.telegramURL
                            ? "text-red-400"
                            : ""
                        }`}
                        htmlFor="telegramURL"
                      >
                        {formik.touched.telegramURL && formik.errors.telegramURL
                          ? formik.errors.telegramURL
                          : "Telegram link"}
                      </label>
                      <input
                        className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                        type="url"
                        name="telegramURL"
                        id="telegramURL"
                        value={formik.values.telegramURL}
                        onChange={formik.handleChange}
                        placeholder="Enter your telegram url here"
                        onBlur={formik.handleBlur}
                      />
                    </div>

                    <div className="pb-4">
                      <label
                        className={`block font-latoBold text-sm pb-2 ${
                          formik.touched.youtubeURL && formik.errors.youtubeURL
                            ? "text-red-400"
                            : ""
                        }`}
                        htmlFor="youtubeURL"
                      >
                        {formik.touched.youtubeURL && formik.errors.youtubeURL
                          ? formik.errors.youtubeURL
                          : "YouTube link"}
                      </label>
                      <input
                        className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                        type="url"
                        name="youtubeURL"
                        id="youtubeURL"
                        value={formik.values.youtubeURL}
                        onChange={formik.handleChange}
                        placeholder="Enter your youtube url here"
                        onBlur={formik.handleBlur}
                      />
                    </div>

                    <div className="pb-4">
                      <label
                        className={`block font-latoBold text-sm pb-2 ${
                          formik.touched.facebookURL &&
                          formik.errors.facebookURL
                            ? "text-red-400"
                            : ""
                        }`}
                        htmlFor="facebookURL"
                      >
                        {formik.touched.facebookURL && formik.errors.facebookURL
                          ? formik.errors.facebookURL
                          : "Facebook link"}
                      </label>
                      <input
                        className="border-2 border-gray-500 p-2 rounded-md w-full focus:border-teal-500 focus:ring-teal-500"
                        type="url"
                        name="facebookURL"
                        id="facebookURL"
                        value={formik.values.facebookURL}
                        onChange={formik.handleChange}
                        placeholder="Enter your facebook url here"
                        onBlur={formik.handleBlur}
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}

                <button
                  type="submit"
                  className="bg-teal-500 font-latoBold text-sm text-white py-3 mt-6 rounded-lg w-full"
                >
                  Create account
                </button>
              </div>
            </div>
          </form>

          <div className="my-2 p-2">
            <p className="text-center">
              Already have an account?{" "}
              <span
                className="text-blue-700 underline underline-offset-1 cursor-pointer"
                onClick={() => navigate(`/login/${type}`)}
              >
                Login
              </span>{" "}
              here
            </p>
          </div>
        </main>

        <aside className="h-[85%] hidden md:block">
          <img
            src={RegisterBg}
            alt="register-background"
            className="w-full h-full object-cover"
          />
        </aside>
      </section>
    </div>
  );
};

export default Register;
