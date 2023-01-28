import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { motion } from "framer-motion";
import Confetti from "react-confetti";

import { TwitterShareButton } from "react-twitter-embed";

// importing social media icons
import {
  BsFacebook,
  BsWhatsapp,
  BsTelegram,
  BsInstagram,
  BsTwitter,
  BsYoutube,
} from "react-icons/bs";

const ModalComponent = (props) => {
  const score = localStorage.getItem("currentProgress")
    ? JSON.parse(localStorage.getItem("currentProgress"))
    : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-fit"
    >
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">{props.paragraph}</p>

          <div className="flex flex-col md:flex-row justify-between items-center my-2 w-1/2 mx-auto">
            <div className="my-2">
              <h2 className="text-xl font-semibold">Your score</h2>
              <div className="flex flex-col items-start mt-2">
                <p>
                  <b>WPM </b>: {score?.speed} WPM
                </p>
                <p>
                  <b>CPM </b>: {score?.cpmSpeed?.toFixed(2)} CPM
                </p>
                <p>
                  <b>Accuracy </b>: {score?.accuracy} %
                </p>
                <p>
                  <b>Errors </b>: {score?.errorCount}
                </p>
              </div>
            </div>

            {props?.topper ? (
              <>
                {" "}
                <div className="my-2">
                  <h2 className="text-xl font-semibold">Topper's score</h2>
                  <div className="flex flex-col items-start mt-2">
                    <p>
                      <b>WPM </b>: {props?.topper?.wpm}
                    </p>
                    <p>
                      <b>Accuracy </b>: {props?.topper?.accuracy} %
                    </p>
                    <p>
                      <b>Errors </b>: {props?.topper?.errors}
                    </p>
                    <p>
                      <b>Time Taken </b>: {props?.topper?.time_taken} seconds
                    </p>
                  </div>
                </div>
              </>
            ) : null}
          </div>

          <div className="grid place-items-center my-2">
            <h2 className="text-xl font-semibold my-1">
              Share with your friends on : 😄
            </h2>
            <div className="flex space-x-4 items-center">
              <BsWhatsapp
                className="cursor-pointer"
                size={30}
                title="Whatsapp"
              />
              <BsTelegram
                className="cursor-pointer"
                size={30}
                title="Telegram"
              />
              <BsInstagram
                className="cursor-pointer"
                size={30}
                title="Instagram"
              />
              <BsFacebook
                className="cursor-pointer"
                size={30}
                title="Facebook"
              />
              {/* <BsTwitter className="cursor-pointer" size={30} title="Twitter" /> */}
              <button
                onClick={() => (
                  <TwitterShareButton
                    url="https://twitter.com/intent/tweet"
                    text="it is working!!!!"
                  />
                )}
              >
                Share on Twitter
              </button>
              <BsYoutube className="cursor-pointer" size={30} title="Youtube" />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={props.onHide}
            className="bg-blue-600 text-white font-semibold"
          >
            Okay
          </Button>
        </Modal.Footer>
        <Confetti gravity={0.2} width="800%" />
      </Modal>
    </motion.div>
  );
};

export default ModalComponent;
