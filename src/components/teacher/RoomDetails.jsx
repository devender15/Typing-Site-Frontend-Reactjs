import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// importing external libraries
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import Pagination from "react-custom-pagination";
import Table from "react-bootstrap/Table";

// importing utility function
import fetchUser from "../../utils/FetchUser";

const RoomDetails = () => {
  const [roomData, setRoomData] = useState([]);
  const { roomId } = useParams();
  const userToken = fetchUser(); // fetching user access token from localStorage
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  //get current Posts
  const indexOfLastPost = currentPage * dataPerPage;
  const indexOfFirstPost = indexOfLastPost - dataPerPage;
  const currentPosts = roomData.slice(indexOfFirstPost, indexOfLastPost);

  // when user clicks on number this function will execute
  const paginate = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/room/view-scores/${roomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setRoomData(data));
  }, []);

  return (
    <>
      <section className="w-full h-full">
        <h1 className="text-center my-3 font-semibold text-2xl">
          Room History
        </h1>

        {roomData?.length !== 0 && (
          <div className="w-full">
            <ReactHtmlTableToExcel
              id="table-xlsx-button"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-2 py-1 rounded-md hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-500 transition-all duration-100 ml-4"
              table="room-data-table"
              filename="room-details"
              sheet="room-details"
              buttonText="Export"
            />
          </div>
        )}

        <main>
          {roomData?.length !== 0 ? (
            <>
              <div className="h-[20rem] overflow-y-scroll p-2">
                <Table id="room-data-table" striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Student Name</th>
                      <th>Student Email</th>
                      <th>Student Phone</th>
                      <th>Rank</th>
                      <th>WPM</th>
                      <th>CPM</th>
                      <th>Accuracy ( % )</th>
                      <th>Errors</th>
                      <th>Half mistakes</th>
                      <th>Full mistakes</th>
                      <th>Time taken ( in seconds )</th>
                      <th>Submitted at</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roomData?.map((data, idx) => {
                      return (
                        <tr key={data?.id}>
                          <td>{idx + 1}</td>
                          <td>{data.student.name}</td>
                          <td>{data.student.email}</td>
                          <td>{data.student.phone}</td>
                          <td>{data.rank}</td>
                          <td>{isNaN(data.wpm) ? 0 : data.wpm}</td>
                          <td>{data.cpm}</td>
                          <td>{data.accuracy}</td>
                          <td>{data.errors}</td>
                          <td>{data.half_mistakes}</td>
                          <td>{data.full_mistakes}</td>
                          <td>{data.time_taken}</td>
                          <td>{new Date(data.recorded_at)[1]}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>

              <div style={{ width: "500px", margin: "1rem 0" }}>
                <Pagination
                  totalPosts={roomData.length}
                  postsPerPage={dataPerPage}
                  paginate={paginate}
                  view={5}
                  showLast={true}
                  showFirst={true}
                  showIndex={true}
                />
              </div>
            </>
          ) : (
            <p className="text-lg text-center font-normal">No data found !</p>
          )}
        </main>
      </section>
    </>
  );
};

export default RoomDetails;
