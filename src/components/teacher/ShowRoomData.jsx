import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import fetchUser from "../../utils/FetchUser";

const ShowRoomData = (props) => {

    const [roomData, setRoomData] = useState([]);
    const userToken = fetchUser(); // fetching user access token from localStorage

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/room/view-scores/${props.roomId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + userToken
          }
        })
        .then(res => res.json())
        .then(data => setRoomData(data));
    }, [])


  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton className="modal-xl">
        <Modal.Title id="contained-modal-title-vcenter">
          {props.heading}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <div className="grid grid-cols-12 gap-1 text-sm">
              <p>S.no</p>
              <p>Student Name</p>
              <p>Student Email</p>
              <p>Student Phone</p>
              <p>Student Institute</p>
              <p>Student Board</p>
              <p>Rank</p>
              <p>WPM</p>
              <p>CPM</p>
              <p>Accuracy</p>
              <p>Errors</p>
              <p>Half Mistakes</p>
              <p>Full Mistakes</p>
              <p>Time Taken</p>
          </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={props.onHide}
          className="bg-blue-600 text-white font-semibold"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowRoomData;
