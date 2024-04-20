import React, { useContext, useEffect, useState } from "react";
import ApiCalls from "./../../ApiCalls/ApiCalls";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ApiContext } from "../../Context/ApiContext";

const Table = ({ categories }) => {
  const { access, type } = useContext(ApiContext);

  const [bannerdata, setbannerdata] = useState([]);
  console.log(categories);

  const [isVisible, setIsVisible] = useState({});

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
    let newres = await ApiCalls(`advert/${id}`, "PUT", formData).then(() => {
      alert("data add successfully");
      getdata();
    });
  };

  const getdata = () => {
    ApiCalls(`advert`)
      .then((response) => {
        setbannerdata(response);
      })
      .catch((error) => {
        // Handle error
      });
  };

  useEffect(() => {
    getdata();
  }, [categories]);
  console.log(bannerdata);

  const Delethandler = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      ApiCalls(`advert/${id}`, "DELETE")
        .then((response) => {
          alert("Successfully deleted");
          getdata();
        })
        .catch((error) => {
          console.error("Error deleting:", error);
          // Handle error, show error message, etc.
        });
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Advertisement</h3>
           
          </div>
          <div className="card-body p-0">
            <table className="table projects">
              <thead>
                <tr>
                  <th style={{ width: "15%" }}>
                    <div class="form-check mb-0">
                      <input
                        type="checkbox"
                        name="tajasamachar"
                        style={{ border: "2px solid red" }}
                        class="form-check-input me-1"
                        id="exampleCheck1"
                      />
                      <label for="exampleCheck1" className="mb-0">
                        All Select
                      </label>
                    </div>
                  </th>
                  <th style={{ width: "1%" }}>#</th>
                  <th style={{ width: "10%" }}>Location</th>
                  <th style={{ width: "7%" }}>Url</th>
                  <th style={{ width: "15%" }}>First Image</th>
                  <th style={{ width: "15%" }}>Second Image</th>
                </tr>
              </thead>
              <tbody>
                {bannerdata.map((item, key) => (
                  <tr
                    key={key}
                    className={
                      item.Status == "active" ? "table-light" : "table-primary"
                    }
                  >
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name="tajasamachar"
                          style={{ border: "2px solid red" }}
                          class="form-check-input"
                          id="exampleCheck1"
                        />
                      </div>
                    </td>
                    <td>
                      <strong>{key + 1}</strong>
                    </td>
                    <td>
                      <strong>{item.location}</strong>
                    </td>
                    <td>
                      <strong>{item.url}</strong>
                    </td>
                    <td>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <img
                            alt="pic"
                            className="table-avatar"
                            src={item.Image1}
                          />
                        </li>
                      </ul>
                    </td>
                    <td>
                      <ul className="list-inline">
                        <li className="list-inline-item">
                          <img
                            alt="pic"
                            className="table-avatar"
                            src={item.Image2}
                            width="80px"
                          />
                        </li>
                      </ul>
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
                        to={`/edit-advert/${item._id}`}
                        className="btn btn-info btn-sm fw-bold"
                      >
                        Edit
                      </NavLink>

                      {access === true || type === "admin" ? (
                        <NavLink
                          className="btn btn-danger btn-sm ms-2 fw-bold"
                          onClick={() => Delethandler(item._id)}
                        >
                          Delete
                        </NavLink>
                      ) : null}
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

export default Table;
