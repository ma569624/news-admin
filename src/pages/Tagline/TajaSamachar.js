import SideNavBar from "../../component/sidenav/SideNavBar";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import ApiCalls from "../../ApiCalls/ApiCalls";
import { useRef, useMemo } from "react";
import { ApiContext } from "../../Context/ApiContext";

const TajaSamachar = () => {
  const { API } = useContext(ApiContext);
  const navigate = useNavigate();
  const [image1, setimage1] = useState({});

  const [content, setContent] = useState("");
  const [inputs, setInputs] = useState({});

  const getdata = async () => {
    ApiCalls(`tagline?_id=6602a87711e47f88c9059347`)
      .then((response) => {
        setInputs(response[0]);
      })
      .catch((error) => {
        // Handle error
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  async function FormSubmit(event) {
    event.preventDefault();
    setInputs({ ...inputs, ["CompleteAddress"]: content });
    console.warn(inputs);

    // fetch(`${API}/api/tagline/6602a87711e47f88c9059347`, {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(inputs),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     alert("data add successfully");
    //     console.log("Data received:", data);
    //     // Do something with the data
    //   })
    //   .catch((error) => {
    //     console.error("There was a problem with the fetch operation:", error);
    //   });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
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
                    <h3 className="card-title">Taja Samchar</h3>
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
                            <label htmlFor="exampleInputEmail1">Taja Samchar</label>
                            <input
                              onChange={handleChange}
                              name="Heading"
                              value={inputs.Heading}
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
        </section>
      </div>
    </>
  );
};

export default TajaSamachar;
