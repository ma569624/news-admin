import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";

const AddRashiFal = () => {
  const [image1, setimage1] = useState({});

  const [content, setContent] = useState("");

  const [inputs, setInputs] = useState({});
  const editor = useRef(null);
  const navigate = useNavigate();

  async function FormSubmit(event) {
    event.preventDefault();
    console.log(inputs);

    const formData = await new FormData();
    if (inputs.EmployeeName) {
      formData.append("EmployeeName", inputs.EmployeeName);
    }
    if (inputs.EmployeeDesignation) {
      formData.append("EmployeeDesignation", inputs.EmployeeDesignation);
    }
    if (inputs.place) {
      formData.append("Place", inputs.place);
    }
    if (inputs.heading) {
      formData.append("heading", inputs.heading);
    }
    if (image1.length > 0) {
      formData.append("Image1", image1[0]);
    }
    if (content) {
      formData.append("EmployeeDetails", content);
    }

    let newres = await ApiCalls("team", "POST", formData).then(() => {
      alert("data add successfully");
      navigate('/team');
    });
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
                    <h3 className="card-title">Add Team</h3>
                  </div>
                  <form
                    onSubmit={() => FormSubmit}
                    action="/post"
                    method="POST"
                    encType="multipart/form-data"
                  >
                    <div className="card-body">
                      <div className="row">
                        {/* <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Heading</label>
                            <input
                              onChange={handleChange}
                              name="heading"
                              type="text"
                              class="form-control"
                              placeholder="Enter Your Name"
                            />
                          </div>
                        </div> */}
                        <div className="col-md-12">
                          <div class="form-group">
                            <label for="exampleInputFile">Employee Image</label>
                            <div>
                              <input
                                onChange={(e) => setimage1(e.target.files)}
                                name="file"
                                type="file"
                                className="TextArea"
                                id="image"
                                size={60}
                                maxLength={70}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Employee Name
                            </label>
                            <input
                              onChange={handleChange}
                              name="EmployeeName"
                              type="text"
                              class="form-control"
                              placeholder="Enter Your Designation"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">
                              Employee Designation
                            </label>
                            <input
                              onChange={handleChange}
                              name="EmployeeDesignation"
                              type="text"
                              class="form-control"
                              placeholder="Enter Your Date/Place"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Place</label>
                            <input
                              onChange={handleChange}
                              name="place"
                              class="form-control"
                              placeholder="Enter Your Heading"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div class="form-group">
                            <label>Employee Details</label>
                            <JoditEditor
                              ref={editor}
                              value={content}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {}}
                              required
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

export default AddRashiFal;
