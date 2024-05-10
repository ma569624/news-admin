import React, { useEffect, useState } from "react";
import ApiCalls from "./../../ApiCalls/ApiCalls";
import { NavLink } from "react-router-dom";

const Youtube = () => {
  const [data, setdata] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  const getdata = () => {
    ApiCalls(`youtube`)
      .then((response) => {
        console.warn(response);
        setdata(response.data);
      })
      .catch((error) => {
        // Handle error
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const time = (inputTime) => {
    // Check if inputTime is a valid Date object, if not, create one
    const timeObject = new Date(inputTime);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    // Convert the time to a readable format in Hindi
    const readableTime = timeObject.toLocaleDateString("hi-IN", options).replace('pm', "").replace("am", "");

    return readableTime;
  };
  const AddNewVideo = () => {
    ApiCalls(`addyoutubevideo`)
      .then((response) => {
        setdata(response.data);
        getdata()
        alert("latest video add successfully")
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="card">
          <div className="card-header text-center">
            <h3 className="card-title text-center">YouTube Video</h3>
            <button
              className="btn btn-light mx-auto "
              onClick={AddNewVideo}
            >
              New Video
            </button>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "1%" }}>#</th>
                  <th style={{ width: "2%" }}>Thumbnails</th>
                  <th style={{ width: "5%" }}>Time</th>
                  <th style={{ width: "10%" }}>Title</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>

                    <td>
                      {item.snippet[0].thumbnails ? (
                        <img
                          className="table-avatar"
                          width={75}
                          src={item.snippet[0].thumbnails.medium.url}
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                    <td className="project_progress">
                      <small>{time(item.snippet[0].publishTime)}</small>
                    </td>
                    <td className="project_progress">
                      <small>{item.snippet[0].title}</small>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Youtube;
