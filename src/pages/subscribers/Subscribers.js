import React, { useEffect, useState } from "react";
import ApiCalls from "./../../ApiCalls/ApiCalls";
import { NavLink } from "react-router-dom";

const Subscribers = () => {
  const [data, setdata] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  const toggleVisibility = async (id, status) => {
    // const formData = await new FormData();

    // formData.append("blocked", true);
    // let newres = await ApiCalls(`Subscribers/${id}`, "PUT", {blocked: !status}).then(() => {
    //   alert("data add successfully");
    //   getdata();
    // });
    const res = await fetch(`${API}/api/Subscribers/${id}`,{
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({blocked: !status})
    })
    if (res.ok) {
      alert("update succesfully")
      getdata()
    }
  };

  const getdata = () => {
    ApiCalls(`Subscribers`)
      .then((response) => {
        setdata(response);
      })
      .catch((error) => {
        // Handle error
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const Delethandler = (id) => {
    ApiCalls(`Subscribers/${id}`, "DELETE")
      .then((response) => {
        alert("sucessfully delete");
        getdata();
      })
      .catch((error) => {});
  };
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
            <h3 className="card-title">Subscribers</h3>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "1%" }}>#</th>

                  <th style={{ width: "7%" }}>Name</th>
                  <th style={{ width: "10%" }}>Email</th>
                  <th style={{ width: "10%" }}>Phone</th>
                  <th style={{ width: "10%" }}>Time</th>

                  <th style={{ width: "5%" }} className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, key) => (
                  <tr
                    key={key}
                    className={
                      item.blocked == false ? "table-light" : "table-primary"
                    }
                  >
                    <td>{key + 1}</td>

                    {/* <td>
                        
                           {
                            item.EmployeeImage ? <img
                              
                              className="table-avatar"
                              width={65}
                              src={`${API}${item.EmployeeImage}`}
                            /> : <></>
                           } 
                          
                      </td> */}
                    <td className="project_progress">
                      {item.name}
                    </td>
                    <td className="project_progress">
                      {item.email}
                    </td>
                    <td className="project_progress">
                      {item.Number}
                    </td>
                    <td className="project_progress">
                      {time(item.SubscriberDate)}
                    </td>

                    <td className="project-actions text-right">
                      <NavLink
                        to={""}
                        className={`btn me-3 fw-bold btn-sm ${
                          item.blocked == false ? "btn-primary" : "btn-success"
                        }`}
                        onClick={() => toggleVisibility(item._id, item.blocked)}
                      >
                        {item.blocked == false ? "blocked" : "unblocked"}
                      </NavLink>
                      <NavLink
                        className="btn btn-danger btn-sm ms-2 fw-bold"
                        onClick={() => Delethandler(item._id)}
                      >
                        Delete
                      </NavLink>
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

export default Subscribers;
