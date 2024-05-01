import React, { useEffect, useState } from "react";
import ApiCalls from "../../ApiCalls/ApiCalls";

const AddHome = () => {
  const [inputs, setInputs] = useState({});
  const [image1, setimage1] = useState({});
  const [image2, setimage2] = useState({});
  const [selectedsection, SetSelctedsection] = useState("");
  const API = process.env.REACT_APP_API_URL;


  async function FormSubmit(event) {
    event.preventDefault();

    const formData = await new FormData();

    for (const key in inputs) {
      if (inputs.hasOwnProperty(key)) {
        formData.append(key, inputs[key]);
      }
    }
    
      formData.append("location", selectedsection);
    
    if (image1.length > 0) {
      formData.append("categorylogo", image1[0]);
    }

    if (image2.length > 0) {
      formData.append("headinglogo", image2[0]);
    }

    // let newres = await ApiCalls(`categories?location=${selectedsection}`, "POST", formData).then(() => {
    //   alert("data add successfully");
    // });

    try {
      const response = await fetch(
        `${API}/api/categories`,
        {
          method: "POST",
          body: formData, // Pass the FormData object directly
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
        console.warn(response);
      }

      const responseData = await response.json();
      console.warn("Data sent successfully:", responseData);
      alert("data add successfully");
      // navigate('/top-links')
    } catch (error) {
      console.error("Error sending data:", error);
    }
  }

  const showsection = (e) => {
    const section = e.target.value;
    console.warn(section);
    SetSelctedsection(section);
  };

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
                  <h3 className="card-title">Add Section Block</h3>
                </div>
                <form onSubmit={() => FormSubmit}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <label htmlFor="" className="fs-4">
                          Select Section
                        </label>
                        <select
                          class="custom-select mx-auto form-control"
                          onChange={showsection}
                        >
                          <option disabled selected>
                            Select
                          </option>
                          <option value="block">Block</option>
                          <option value="state">State</option>
                        </select>
                      </div>
                      <div className="col-md-12">
                          <div class="form-group">
                            <label>{selectedsection} Name</label>
                            <input
                              name="category"
                              type="text"
                              class="form-control"
                              placeholder="Enter Your Section Name"
                              onChange={handleChange}
                              value={inputs.category}
                              disabled={!selectedsection}
                            />
                          </div>
                        </div>
                      {selectedsection == "block" ? (
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
                            disabled={!selectedsection}
                          />
                          <label for="exampleCheck1">Menu</label>
                        </div>
                      </div>
                      ) : (
                        <></>
                      )}

                      
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Background Color change
                        </label>
                        <input
                          onChange={handleChange}
                          name="categorybackground"
                          type="color"
                          style={{ maxWidth: "99px" }}
                          value={inputs.categorybackground}
                          class="form-control"
                          placeholder="Enter Your Name"
                          disabled={!selectedsection}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Select A logo
                        </label>

                        <input
                          onChange={(e) => setimage1(e.target.files)}
                          name="file"
                          type="file"
                          class="form-control"
                          placeholder="Enter Your Name"
                          id="reporterimage"
                          size={60}
                          maxLength={70}
                          disabled={!selectedsection}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="row">
                        <div className="col-md-12">
                          <h5>other</h5>
                        </div>
                        <div className="col-md-12">
                          <div class="form-group">
                            <label for="exampleSelectRounded0">
                              {selectedsection} Name
                            </label>
                            <input
                              name="heading"
                              type="text"
                              class="form-control"
                              placeholder="Enter Your Section Name"
                              onChange={handleChange}
                              value={inputs.heading}
                              disabled={!selectedsection}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Background Color change
                          </label>
                          <input
                            onChange={handleChange}
                            name="headingbackground"
                            type="color"
                            style={{ maxWidth: "99px" }}
                            value={inputs.headingbackground}
                            class="form-control"
                            placeholder="Enter Your Name"
                            disabled={!selectedsection}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Select A logo
                          </label>

                          <input
                            onChange={(e) => setimage2(e.target.files)}
                            name="file"
                            type="file"
                            class="form-control"
                            placeholder="Enter Your Name"
                            id="reporterimage"
                            size={60}
                            maxLength={70}
                            disabled={!selectedsection}
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
                      disabled={!selectedsection}
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

export default AddHome;
