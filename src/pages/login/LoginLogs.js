import React, { useEffect, useState } from "react";
import ApiCalls from "./../../ApiCalls/ApiCalls";
import { NavLink } from "react-router-dom";

const LoginLogs = () => {
  const [bannerdata, setbannerdata] = useState([]);

  const getdata = () => {
    ApiCalls(`login`)
      .then((response) => {
        setbannerdata(response);
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
    const readableTime = timeObject
      .toLocaleDateString("hi-IN", options)
      .replace("pm", "")
      .replace("am", "");

    return readableTime;
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Login Logs</h3>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "1%" }}>#</th>

                  <th style={{ width: "7%" }}>User</th>
                  <th style={{ width: "10%" }}>Time</th>
                  <th style={{ width: "10%" }}>Ip Address</th>
                </tr>
              </thead>
              <tbody>
                {bannerdata.map((item, key) => (
                  <tr
                    key={key}
                    // className={
                    //   item.Status == true ? "table-light" : "table-primary"
                    // }
                  >
                    <td>{key + 1}</td>

                    <td className="project_progress">
                      {item.User_name}
                    </td>
                    <td className="project_progress">{time(item.logindate)}</td>
                    <td className="project_progress">
                      {item.ipaddres}
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

export default LoginLogs;
