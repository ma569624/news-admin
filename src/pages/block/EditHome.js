import SideNavBar from "../../component/sidenav/SideNavBar";
import React, { useEffect, useState } from "react";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { useNavigate, useParams } from "react-router-dom";

const EditHome = () => {
  const [inputs, setInputs] = useState({});
  const [image1, setimage1] = useState({});
  const [image2, setimage2] = useState({});
  const navigate = useNavigate();
  const [selectedsection, SetSelctedsection] = useState("");

  const params = useParams();
  const { id } = params;
  console.log(id);

  const getdata = () => {
    ApiCalls(`blogdisplay?_id=${id}`)
      .then((response) => {
        setInputs(response[0]);
        console.warn(response);
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

    if (inputs.SectionName) {
      formData.append("category", inputs.SectionName);
    }

    if (inputs.isHeader) {
      formData.append("isHeader", inputs.isHeader);
    }
    if (selectedsection) {
      formData.append("location", selectedsection);
    }

    if (inputs.SecondSection) {
      formData.append("heading", inputs.SecondSection);
    }

    if (inputs.background1) {
      formData.append("categorybackground", inputs.background1);
    }

    if (inputs.background2) {
      formData.append("headingbackground", inputs.background2);
    }

    if (image1.length > 0) {
      formData.append("categorylogo", image1[0]);
    }

    if (image2.length > 0) {
      formData.append("headinglogo", image2[0]);
    }

    let newres = await ApiCalls(`categories?location=${selectedsection}`, "PUT", formData).then(() => {
      alert("data add successfully");
    });

    // try {
    //   const response = await fetch(
    //     `http://localhost:5000/api/categories?location=${selectedsection}`,
    //     {
    //       method: "PUT",
    //       body: formData, // Pass the FormData object directly
    //     }
    //   );

    //   if (!response.ok) {
    //     throw new Error("Network response was not ok");
    //   }

    //   const responseData = await response.json();
    //   console.log("Data sent successfully:", responseData);
    //   alert("data add successfully");
    //   // navigate('/top-links')
    // } catch (error) {
    //   console.error("Error sending data:", error);
    // }
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
                  <h3 className="card-title">Edit Block</h3>
                </div>
                <form onSubmit={() => FormSubmit}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div class="form-group">
                          <label>Section Name</label>
                          <input
                            name="SectionName"
                            type="text"
                            class="form-control"
                            placeholder="Enter Your Section Name"
                            onChange={handleChange}
                            value={inputs.SectionName}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                          Background Color
                        </label>
                        <input
                          onChange={handleChange}
                          name="background1"
                          type="color"
                          style={{ maxWidth: "99px" }}
                          value={inputs.background1}
                          class="form-control"
                          placeholder="Enter Your Name"
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
                        />
                      </div>
                    </div>
                    <div>
                      {/* <div className="row">
                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label for="exampleSelectRounded0">First Link's Name</label>
                                                                <select class="custom-select rounded-0" name="FirstLink" value={inputs.FirstLink} id="exampleSelectRounded0" onChange={handleChange}>
                                                                    <option selected disabled>Please Select</option>
                                                                    {
                                                                        selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label for="exampleSelectRounded0">Second Link's Name</label>
                                                                <select class="custom-select rounded-0" name="SecondLink" value={inputs.SecondLink} id="exampleSelectRounded0" onChange={handleChange}>
                                                                    <option selected disabled>Please Select</option>
                                                                    {
                                                                        selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">

                                                            <div class="form-group">
                                                                <label for="exampleSelectRounded0">Third Link's Name</label>
                                                                <select class="custom-select rounded-0" name="ThirdLink" value={inputs.ThirdLink} id="exampleSelectRounded0" onChange={handleChange}>
                                                                    <option selected disabled>Please Select</option>
                                                                    {
                                                                        selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                                                    }
                                                                </select>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label for="exampleSelectRounded0">Forth Link's Name</label>
                                                                <select class="custom-select rounded-0" name="ForthLink" value={inputs.ForthLink} id="exampleSelectRounded0" onChange={handleChange}>
                                                                    <option selected disabled>Please Select</option>
                                                                    {
                                                                        selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label for="exampleSelectRounded0">Five Link's Name</label>
                                                                <select class="custom-select rounded-0" name="FiveLink" value={inputs.FiveLink} id="exampleSelectRounded0" onChange={handleChange}>
                                                                    <option selected disabled>Please Select</option>
                                                                    {
                                                                        selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                                                    }
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div> */}
                      <div className="row">
                        <div className="col-md-12">
                          <h5>other</h5>
                        </div>
                        <div className="col-md-12">
                          <div class="form-group">
                            <label for="exampleSelectRounded0">
                              Section Name
                            </label>
                            <input
                              name="SecondSection"
                              type="text"
                              class="form-control"
                              placeholder="Enter Your Section Name"
                              onChange={handleChange}
                              value={inputs.SecondSection}
                            />
                          </div>
                        </div>
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
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">
                            Background Color
                          </label>
                          <input
                            onChange={handleChange}
                            name="background2"
                            type="color"
                            style={{ maxWidth: "99px" }}
                            value={inputs.background2}
                            class="form-control"
                            placeholder="Enter Your Name"
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

export default EditHome;
