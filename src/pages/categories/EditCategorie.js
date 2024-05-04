import SideNavBar from "../../component/sidenav/SideNavBar";
import React, { useEffect, useState } from "react";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { useNavigate, useParams } from "react-router-dom";

const EditCategorie = () => {
  const [inputs, setInputs] = useState({});
  const [categorylogo, setcategorylogo] = useState({});
  const [headinglogo, setheadinglogo] = useState({});
  const API = process.env.REACT_APP_API_URL;

  const params = useParams();
  const navigate = useNavigate()
  const { id } = params;
  console.log(id);

  const getdata = () => {
    ApiCalls(`categories?id=${id}`)
      .then((response) => {
        setInputs(response[0]);
        console.warn(response[0]);
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
    console.log(inputs);

    const formData = await new FormData();

    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        formData.append(key, inputs[key]);
      }
    }

    // formData.append("location", selectedsection);

    if (categorylogo instanceof File) {
      formData.append("categorylogo", categorylogo);
    }

    if (headinglogo instanceof File) {
      formData.append("headinglogo", headinglogo);
    }

    // let newres = await ApiCalls(`categories/${id}`, "PUT", formData).then(() => {
    //   alert("data add successfully");
    // });

    try {
      const response = await fetch(`${API}/api/categories/${id}`, {
        method: "PUT",
        body: formData, // Pass the FormData object directly
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      alert("data add successfully");

      navigate(`/categorie?value=${inputs.location}`)
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const checked = event.target.checked;
    setInputs({ ...inputs, [name]: value });

    if (name === "isHeader") {
      setInputs({ ...inputs, [name]: checked }); // Update the checkbox state only if its name is "isHeader"
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content mt-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Edit Block</h3>
                </div>
                <form onSubmit={() => FormSubmit}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="col-md-12">
                          <div class="form-group">
                            <label>Section Name</label>
                            <input
                              name="category"
                              type="text"
                              class="form-control"
                              placeholder="Enter Your Section Name"
                              onChange={handleChange}
                              value={inputs.category}
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Background Color
                          </label>
                          <input
                            onChange={handleChange}
                            name="categorybackground"
                            type="color"
                            style={{ maxWidth: "99px" }}
                            value={inputs.categorybackground}
                            class="form-control"
                            placeholder="Enter Your Name"
                          />
                        </div>
                        {categorylogo && categorylogo instanceof Blob ? (
                          <img
                            style={{ width: "82px",height: "62px", marginTop: "10px" }}
                            src={URL.createObjectURL(categorylogo)}
                            alt=""
                          />
                        ) : (
                          <img
                            style={{ width: "82px",height: "62px", marginTop: "10px" }}
                            src={
                              inputs.categorylogo
                                ? `${API}${inputs.categorylogo}`
                                : ""
                            }
                            alt=""
                          />
                        )}

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Select A logo
                          </label>

                          <input
                            onChange={(e) => setcategorylogo(e.target.files[0])}
                            name="file"
                            type="file"
                            class="form-control"
                            placeholder="Enter Your Name"
                            id="reporterimage"
                            size={60}
                            maxLength={70}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="col-md-12">
                          <div class="form-group">
                            <label for="exampleSelectRounded0">
                              Section Name
                            </label>
                            <input
                              name="heading"
                              type="text"
                              class="form-control"
                              placeholder="Enter Your Section Name"
                              onChange={handleChange}
                              value={inputs.heading}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Background Color
                          </label>
                          <input
                            onChange={handleChange}
                            name="headingbackground"
                            type="color"
                            style={{ maxWidth: "99px" }}
                            value={inputs.headingbackground}
                            class="form-control"
                            placeholder="Enter Your Name"
                          />
                        </div>
                        {headinglogo && headinglogo instanceof Blob ? (
                          <img
                            style={{ width: "82px", height: "62px", marginTop: "10px" }}
                            src={URL.createObjectURL(headinglogo)}
                            alt=""
                          />
                        ) : (
                          <img
                            style={{ width: "82px",height: "62px", marginTop: "10px" }}
                            src={
                              inputs.headinglogo
                                ? `${API}${inputs.headinglogo}`
                                : ""
                            }
                            alt=""
                          />
                        )}

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Select A logo
                          </label>

                          <input
                            onChange={(e) => setheadinglogo(e.target.files[0])}
                            name="file"
                            type="file"
                            class="form-control"
                            placeholder="Enter Your Name"
                            id="reporterimage"
                            size={60}
                            maxLength={70}
                          />
                        </div>
                        {inputs.location == "block" ? (
                          <div className="col-md-12">
                            <div class="form-check">
                              <input
                                type="checkbox"
                                name="isHeader"
                                onChange={handleChange}
                                value={inputs.isHeader}
                                checked={inputs.isHeader}
                                class="form-check-input"
                                id="exampleCheck1"
                              />
                              <label for="exampleCheck1">Menu</label>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
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

export default EditCategorie;
