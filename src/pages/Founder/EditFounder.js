import React, { useEffect, useState } from "react";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { useNavigate, useParams } from "react-router-dom";

const EditFounder = () => {
  const API = process.env.REACT_APP_API_URL;

  const [inputs, setInputs] = useState({});
  const [image1, setimage1] = useState({});
  const [imgsrc, setImgsrc] = useState({});
  const [profileimage, setprofileimage] = useState({});


  const getdata = async () => {
    ApiCalls(`founder`)
      .then((response) => {
        console.warn(response);
        setInputs(response[0]);
        setImgsrc(response[0].EmployeeImage);
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
    console.warn(image1);
    const formData = await new FormData();
    formData.append("EmployeeName", inputs.EmployeeName);
    formData.append("EmployeeDesignation", inputs.EmployeeDesignation);
    formData.append("EmailAddress", inputs.EmailAddress);
    // formData.append('heading', inputs.heading);
    formData.append("ContactNumber", inputs.ContactNumber);
    if (profileimage instanceof File) {
        formData.append("profile", profileimage);
      }

    let newres = await ApiCalls(
      `founder/65f927e820f9d2761a82aaed`,
      "PUT",
      formData
    ).then(() => {
      alert("data add successfully");
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };
  

  return (
    <div className="content-wrapper">
      <section className="content mt-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Founder</h3>
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
                                                            value={inputs.heading}
                                                            type="text"
                                                            class="form-control"
                                                            placeholder="Enter Your Name"
                                                        />
                                                    </div>
                                                </div> */}
                      <div className="col-md-12">
                        {profileimage && profileimage instanceof Blob ? (
                          <img
                            className="mt-2"
                            style={{ width: "100px", height: "80px" }}
                            src={URL.createObjectURL(profileimage)}
                            alt=""
                          />
                        ) : (
                          <img
                            className="mt-2"
                            style={{ width: "100px", height: "80px" }}
                            src={
                              inputs.EmployeeImage
                                ? `${API}${inputs.EmployeeImage}`
                                : ""
                            }
                            alt=""
                          />
                        )}
                      </div>
                      
                      <div className="col-md-12">
                        <div class="form-group">
                          <label for="exampleInputFile">Founder Image</label>
                          <div>
                            <input
                               onChange={(e) => setprofileimage(e.target.files[0])}
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
                            Founder Name
                          </label>
                          <input
                            onChange={handleChange}
                            name="EmployeeName"
                            value={inputs.EmployeeName}
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
                            Founder Designation
                          </label>
                          <input
                            onChange={handleChange}
                            name="EmployeeDesignation"
                            value={inputs.EmployeeDesignation}
                            type="text"
                            class="form-control"
                            placeholder="Enter Your Date/Place"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Email-Address
                          </label>
                          <input
                            onChange={handleChange}
                            name="EmailAddress"
                            value={inputs.EmailAddress}
                            class="form-control"
                            placeholder="Enter Your Heading"
                            required
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Contact Number
                          </label>
                          <input
                            onChange={handleChange}
                            name="ContactNumber"
                            value={inputs.ContactNumber}
                            class="form-control"
                            placeholder="Enter Your Heading"
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
  );
};

export default EditFounder;
