import React, { useContext, useEffect, useState } from "react";

import ApiCalls from "../../ApiCalls/ApiCalls";
import { ApiContext } from "../../Context/ApiContext";
import { NavLink } from "react-router-dom";

const TajaSamachar = () => {
  const { API } = useContext(ApiContext);
  
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([])

  const getdata = async () => {
    ApiCalls(`tajasamachar`)
      .then((response) => {
        setData(response)
      })
      .catch((error) => {
        // Handle error
      });
  };

  const toggleVisibility = async (id, status) => {
    let data = {Status: !status}
    const result = await fetch(`${API}/api/tajasamachar/${id}`,{
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    alert("data add successfully");
    getdata()
  };
  
  const Delethandler = (id) => {
    ApiCalls(`tajasamachar/${id}`, "DELETE")
      .then((response) => {
          alert("sucessfully delete");
        getdata();
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getdata();
  }, []);

  async function FormSubmit(event) {
    event.preventDefault();

    fetch(`${API}/api/tajasamachar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Heading: inputs.Heading }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("data add successfully");
        console.log("Data received:", data);
        getdata();
        // Do something with the data
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
    console.warn(inputs);
  };

  return (
    <>
      <div className="content-wrapper">
        <section className="content mt-4">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-header">
                    <h3 className="card-title">Add Taja Samchar</h3>
                  </div>
                  <form
                    onSubmit={() => FormSubmit}
                    action="/post"
                    method="POST"
                    encType="multipart/form-data"
                  >
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">
                              Taja Samchar
                            </label>
                            <input
                              onChange={handleChange}
                              name="Heading"
                              type="text"
                              class="form-control"
                              placeholder="Enter Your Name"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer">
                      <button
                        type="submit"
                        onClick={FormSubmit}
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              
            </div>
          </div>
          <div className="container-fluid mt-5">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-primary">
                  <div className="card-body p-0">
                    <table className="table table-striped projects">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th >Title</th>
                          <th>Staus</th>

                         
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item, key) => (
                          <tr
                            key={key}
                            className={
                              item.Status == true
                                ? "table-light"
                                : "table-primary"
                            }
                          >
                            <td>{key + 1}</td>

                            
                            <td className="project_progress" style={{maxWidth: '200px'}}>
                              {item.Heading}
                            </td>

                            <td className="project-actions text-right">
                              <NavLink
                                to={""}
                                className={`btn me-3 fw-bold btn-sm ${
                                  item.Status == true
                                    ? "btn-primary"
                                    : "btn-success"
                                }`}
                                onClick={() =>
                                  toggleVisibility(item._id, item.Status)
                                }
                              >
                                {item.Status == "active" ? "Hide" : "Show"}
                              </NavLink>
                              <NavLink
                                to={`/edittajasamachar/${item._id}`}
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
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TajaSamachar;
