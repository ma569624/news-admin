import React, { useContext, useEffect, useState } from "react";

import ApiCalls from "../../ApiCalls/ApiCalls";
import { ApiContext } from "../../Context/ApiContext";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const EditTajaSamachar = () => {
  const { API } = useContext(ApiContext);
  const params = useParams()
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({});
  const [data, setData] = useState([]);
  const {id} = params;
  const getdata = async () => {
    ApiCalls(`tajasamachar?_id=${id}`)
      .then((response) => {
        setInputs(response[0]);
      })
      .catch((error) => {
        // Handle error
      });
      console.warn(inputs)
  };
  

  useEffect(() => {
    getdata();
  }, [id]);

  async function FormSubmit(event) {
    event.preventDefault();

    fetch(`${API}/api/tajasamachar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Heading: inputs.Heading }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("data add successfully");
        console.log("Data received:", data);
        navigate("/tajasamachar")
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
                    <h3 className="card-title">Edit Taja Samchar</h3>
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

export default EditTajaSamachar;
