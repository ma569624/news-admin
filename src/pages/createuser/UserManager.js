import React, { useEffect, useState } from "react";
import ApiCalls from "./../../ApiCalls/ApiCalls";
import { NavLink } from "react-router-dom";
const UserManager = () => {
  const [data, setdata] = useState([]);
  const API = process.env.REACT_APP_API_URL;

  const toggleVisibility = async (id, status) => {
    const formData = await new FormData();

    formData.append("user_block", !status);
    let newres = await ApiCalls(`user/${id}`, "PUT", formData).then(() => {
      alert("data add successfully");
      getdata();
    });
  };

  const getdata = () => {
    ApiCalls(`user`)
      .then((response) => {
        setdata(response);
      })
      .catch((error) => {
        // Handle error
      });
  };
  console.warn(data)

  useEffect(() => {
    getdata();
  }, []);

  const Delethandler = (id) => {
    ApiCalls(`user/${id}`, "DELETE")
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
            <h3 className="card-title">User Manager</h3>
          </div>
          <div className="card-body p-0">
            <table className="table table-striped projects">
              <thead>
                <tr>
                  <th style={{ width: "1%" }}>#</th>

                  <th style={{ width: "7%" }}>Profile</th>
                  <th style={{ width: "10%" }}>Name</th>
                  <th style={{ width: "10%" }}>User Name</th>
                  <th style={{ width: "10%" }}>Password</th>
                  <th style={{ width: "15%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, key) => (
                  <tr
                    key={key}
                    className={
                      item.user_block ? "table-light" : "table-primary"
                    }
                  >
                    <td>{key + 1}</td>

                    <td>
                      {item.profile ? (
                        <img
                          className="table-avatar rounded-5"
                          width={45}
                          height={45}
                          src={`${API}${item.profile}`}
                        />
                      ) : (
                        <></>
                      )}
                    </td>
                    <td className="project_progress">{item.name}</td>
                    <td className="project_progress">{item.User_name}</td>
                    <td className="project_progress">{item.password}</td>

                    <td className="project-actions text-right">
                      <NavLink
                        to={""}
                        className={`btn me-3 fw-bold btn-sm ${
                          item.user_block? 
                            "btn-success": "btn-primary"
                        }`}
                        onClick={() =>
                          toggleVisibility(item._id, item.user_block)
                        }
                      >
                        {!item.user_block ? "UnBlock" : "Block"}
                      </NavLink>
                      <NavLink
                        to={`/edituser/${item._id}`}
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

export default UserManager;
