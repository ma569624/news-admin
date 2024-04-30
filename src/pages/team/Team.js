import React, { useEffect, useState } from "react";
import ApiCalls from "./../../ApiCalls/ApiCalls";
import { NavLink } from "react-router-dom";

const RashiFal = () => {
  const [bannerdata, setbannerdata] = useState([]);
  const [isVisible, setIsVisible] = useState('active');

  const toggleVisibility = async (id, status) => {
    if (status == "active") {
      setIsVisible("inactive");
    } else {
      setIsVisible("active");
    }
    const formData = await new FormData();
    console.warn(status);
    console.warn(isVisible);
    formData.append("Status", isVisible);
    let newres = await ApiCalls(`team/${id}`, "PUT", formData).then(
      () => {
        alert("data add successfully");
        getdata();
      }
    );
  };
  const getdata = () => {
    ApiCalls(`team`)
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

  const Delethandler = (id) => {
    ApiCalls(`team/${id}`, "DELETE")
      .then((response) => {
          alert("sucessfully delete");
        getdata();
      })
      .catch((error) => {});
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Hame Jane Manager</h3>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "1%" }}>#</th>
                  <th style={{ width: "10%" }}>Heading</th>
                  <th style={{ width: "7%" }}>Image</th>
                  <th style={{ width: "10%" }}>Name</th>

                  <th style={{ width: "5%" }} className="text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {bannerdata.map((item, key) => (
                  <tr key={key}
                  className={
                      item.Status == "active" ? "table-light" : "table-primary"
                    }>
                    <td>{key + 1}</td>
                    <td>
                      <small>{item.heading}</small>
                    </td>
                    <td>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <img
                            alt="Avatar"
                            className="table-avatar"
                            src={item.Image1}
                          />
                        </li>
                      </ul>
                    </td>
                    <td className="project_progress">
                      <small>{item.EmployeeName}</small>
                    </td>

                    <td className="project-actions text-right">
                      <NavLink
                        to={""}
                        className={`btn me-3 fw-bold btn-sm ${
                          item.Status == "active"
                            ? "btn-primary"
                            : "btn-success"
                        }`}
                        onClick={() => toggleVisibility(item._id, item.Status)}
                      >
                        {/* {isVisible ? 'Hide' : 'Show'} */}
                        {item.Status == "active" ? "Hide" : "Show"}
                      </NavLink>
                      <NavLink
                        to={`/edit-team/${item._id}`}
                        className="btn btn-info btn-sm fw-bold"
                      >
                        Edit
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

export default RashiFal;
