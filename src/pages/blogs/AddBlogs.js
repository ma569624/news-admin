import SideNavBar from "../../component/sidenav/SideNavBar";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Nav from "../../component/nav/Nav";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import Select from "react-select";

const AddBlogs = () => {
  const params = useParams();
  const position = params.position;
  const [image1, setimage1] = useState({});
  const [image2, setimage2] = useState({});
  const [video, setVideo] = useState([]);
  const [audio, setAudio] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedcategories, setSelectedcategories] = useState(null);
  const [muti, setMult] = useState([]);

  const options = [
    ...muti.map((item) => ({
      value: item.SectionName,
      label: item.SectionName,
    })),
  ];

  const categoriesoptions = [
    ...selectedValue.map((item) => ({
      value: item.StateName,
      label: item.StateName,
    })),
  ];

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [inputs, setInputs] = useState({});
  const [top, setTop] = useState([]);

  const getdata = () => {
    setTop([
      { Link: "TopKhabare", Name: "TopKhabare" },
      { Link: "primenews", Name: "प्रमुख समाचार" },
      { Link: "mainnews", Name: "बड़ी ख़बर" },
      { Link: "idharbhi", Name: "जरा इधर भी" },
    ]);
    console.warn(top);

    ApiCalls("blogdisplay")
      .then((response) => {
        const mergedData =
          position === "all" ? response : selectedValue.concat(response);
        // setSelectedValue(
        //     response.map((item) => ({ value: item.SectionName, label: item.SectionName }))
        // );
        setSelectedValue((prevSelectedValue) => [
          ...prevSelectedValue, // Previous state values
          ...response.map((item) => ({
            value: item.SectionName,
            label: item.SectionName,
          })), // New state values
        ]);

        // setMult(response.reverse());
        // console.warn(response)
        // console.warn(selectedValue)
        // console.log(response)
      })
      .catch((error) => {
        // Handle error
      });

    ApiCalls("rajiya")
      .then((response) => {
        // setSelectedOption(response.reverse());
        // setSelectedValue(response)
        // setSelectedValue(
        //     response.map((item) => ({ value: item.StateName, label: item.StateName }))
        // );
        setSelectedValue((prevSelectedValue) => [
          ...prevSelectedValue, // Previous state values
          ...response.map((item) => ({
            value: item.StateName,
            label: item.StateName,
          })), // New state values
        ]);
        // setSelectedOption(response)
        console.warn(response);
      })
      .catch((error) => {
        // Handle error
      });
  };

  useEffect(() => {
    setSelectedValue((prevSelectedValue) => [
      ...prevSelectedValue, // Previous state values
      ...top.map((item) => ({ value: item.Link, label: item.Name })),
    ]);
  }, [top]);

  useEffect(() => {
    getdata();
  }, []);

  // Add this useEffect to update the input fields when inputs state changes
  useEffect(() => {
    // Update input fields with current inputs state
    document.querySelectorAll("input").forEach((input) => {
      input.value = inputs[input.name] || "";
    });
  }, [inputs]);

  const resetInputs = () => {
    setInputs({});
    setContent("");
  };

  async function FormSubmit(event) {
    event.preventDefault();
    // console.log(position);

    console.warn(inputs);

    const formData = await new FormData();
    // formData.append('Category', selectedcategories);
    // formData.append('Position', JSON.stringify(position));
    // formData.append('StateName', inputs.StateName);

    // if (inputs.reportername && inputs.reportername.length > 0) {
    //     formData.append('ReporterName', inputs.reportername);
    // }

    if (inputs.reportername && inputs.reportername.length > 0) {
      formData.append("ReporterName", inputs.reportername);
    }
    if (inputs.designation && inputs.designation.length > 0) {
      formData.append("Designation", inputs.designation);
    }
    if (inputs.place && inputs.place.length > 0) {
      formData.append("DatePlace", inputs.place);
    }

    if (inputs.heading && inputs.heading.length > 0) {
      formData.append("Heading", inputs.heading);
    }

    if (inputs.capton) {
      formData.append("Capton", inputs.capton);
    }

    if (inputs.subheading) {
      formData.append("Subheading", inputs.subheading);
    }

    if (inputs.Headline) {
      formData.append("Headline", inputs.Headline);
    }

    // formData.append('Designation', inputs.designation);
    // formData.append('DatePlace', inputs.place);
    // formData.append('Heading', inputs.heading);
    // formData.append('Capton', inputs.Capton);
    // formData.append('Subheading', inputs.subheading);
    formData.append("Image1", image1[0]);
    formData.append("Image2", image2[0]);
    formData.append("Video", video[0]);
    formData.append("Audio", audio[0]);
    if (content) {
      // formData.append('Subheading', inputs.subheading);
      formData.append("Matter", content);
    }
    console.log("FormData:", formData);

    if (position === "rajiya") {
      // console.warn()
      // formData.append('Category', inputs.CategoryName);
      if (selectedcategories) {
        const categoryValues = selectedcategories.map((option) => option.value);
        console.warn(categoryValues);
        formData.append("Category", JSON.stringify(categoryValues));
      }

      if (selectedcategories.length > 0) {
        selectedcategories.forEach((option) => {
          formData.append("selectedValue[]", option.value);
          // console.warn(categoryValues);
        });
        // console.warn(selectedcategories);
      }
    }
    if (Array.isArray(selectedOption)) {
      const positionValues = selectedOption.map((option) => option.value);
      console.warn(positionValues);
      formData.append("Category", JSON.stringify(positionValues));
    }

    if (Array.isArray(selectedValue) && selectedValue.length > 0) {
      selectedValue.forEach((option) => {
        formData.append("selectedValue[]", option.value);
      });
      // console.warn(selectedValue);
    }
    // }
    let newres = await ApiCalls("blogs", "POST", formData).then(() => {
      alert("data add successfully");
      // navigate('/');
      resetInputs();
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const checked = event.target.checked;
    setInputs({ ...inputs, [name]: value });

    if (name === "Headline") {
      setInputs({ ...inputs, [name]: checked }); // Update the checkbox state only if its name is "isHeader"
    }
  };

  const nhandleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.warn(selectedOption);
  };
  const categorieshandleChange = (selectedOption) => {
    setSelectedcategories(selectedOption);
    // console.warn(selectedOption)
  };

  return (
    <>
      <main>
        <div className="wrapper">
          <div className="content-wrapper">
            <section className="content mt-4">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="card card-primary">
                      <div className="card-header">
                        <h3 className="card-title">Add Khabare</h3>
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
                                                            <div class="form-group">
                                                                <label htmlFor="Position">Position Name</label>

                                                                <Select
                                                                    id="selectOption"
                                                                    name="Position" // Adding the name attribute
                                                                    value={selectedOption}
                                                                    onChange={nhandleChange}
                                                                    options={options}
                                                                    isMulti
                                                                />

                                                            </div>
                                                        </div> */}
                            {position == "all" ? (
                              <>
                                <div className="col-md-12">
                                  <div class="form-group">
                                    <label for="exampleSelectRounded0">
                                      Select Location for Display Khabar
                                    </label>
                                    <Select
                                      id="selectOption"
                                      name="Position"
                                      // value={selectedcategories}
                                      onChange={nhandleChange}
                                      options={selectedValue}
                                      isMulti
                                    />
                                  </div>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                            {position == "rajiya" ? (
                              <div className="col-md-12">
                                <div class="form-group">
                                  <label for="exampleSelectRounded0">
                                    Select Rajiya
                                  </label>

                                  <Select
                                    id="selectOption"
                                    name="Position"
                                    value={selectedcategories}
                                    onChange={categorieshandleChange}
                                    options={categoriesoptions}
                                    isMulti
                                  />
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}
                            {position == "block" ? (
                              <div className="col-md-12">
                                <div class="form-group">
                                  <label for="exampleSelectRounded0">
                                    Select Block
                                  </label>
                                  <Select
                                    id="selectOption"
                                    name="Position" // Adding the name attribute
                                    // value={selectedOption}
                                    onChange={nhandleChange}
                                    options={options}
                                    isMulti
                                  />
                                </div>
                              </div>
                            ) : (
                              <></>
                            )}

                            <div className="col-md-12">
                              <div class="form-group">
                                <label for="exampleInputFile">
                                  Reporter Image
                                </label>

                                <div>
                                  <input
                                    onChange={(e) =>
                                      setimage1(e.target.files[0])
                                    }
                                    name="file"
                                    type="file"
                                    className="TextArea"
                                    id="reporterimage"
                                    size={60}
                                    maxLength={70}
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="exampleInputEmail1">
                                  Reporter's Name
                                </label>
                                <input
                                  onChange={handleChange}
                                  name="reportername"
                                  type="text"
                                  value={inputs.reportername}
                                  class="form-control"
                                  placeholder="Enter Your Name"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="exampleInputPassword1">
                                  Designation
                                </label>
                                <input
                                  onChange={handleChange}
                                  name="designation"
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
                                  Date/Place
                                </label>
                                <input
                                  onChange={handleChange}
                                  name="place"
                                  type="text"
                                  class="form-control"
                                  placeholder="Enter Your Date/Place"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <div className="taja-space">
                                  <label htmlFor="exampleInputPassword1">
                                    Heading
                                  </label>
                                  <div className="col-md-12">
                                    <div class="form-check">
                                      <input
                                        type="checkbox"
                                        name="Headline"
                                        onChange={handleChange}
                                        value={inputs.Headline}
                                        checked={inputs.Headline}
                                        class="form-check-input mt-2 border-3  border-danger"
                                        id="exampleCheck1"
                                      />
                                      <label for="exampleCheck1">
                                        Taja Smachar
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                <input
                                  onChange={handleChange}
                                  name="heading"
                                  class="form-control"
                                  placeholder="Enter Your Heading"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="exampleInputPassword1">
                                  Sub-heading
                                </label>
                                <input
                                  onChange={handleChange}
                                  name="subheading"
                                  type="text"
                                  class="form-control"
                                  placeholder="Enter Your subheading"
                                  required
                                />
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="exampleInputFile">Image</label>
                                <div className="input-group">
                                  <input
                                    onChange={(e) =>
                                      setimage2(e.target.files[0])
                                    }
                                    name="file"
                                    type="file"
                                    className="TextField"
                                    id="imagefirst"
                                    size={60}
                                    maxLength={60}
                                    required
                                  />
                                </div>
                              </div>

                              {image2 &&
                                image2 instanceof Blob && ( // Check if image1 is a Blob or File object
                                  <img
                                    style={{ width: "82px", marginTop: "10px" }}
                                    src={URL.createObjectURL(image2)}
                                    alt=""
                                  />
                                )}
                            </div>
                            
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="exampleInputFile">Video</label>
                                <div className="input-group">
                                  <input
                                    onChange={(e) => setVideo(e.target.files)}
                                    name="Video"
                                    type="file"
                                    className="TextField"
                                    id="imagefirst"
                                    size={60}
                                    maxLength={60}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group">
                                <label htmlFor="exampleInputFile">Audio</label>
                                <div className="input-group">
                                  <input
                                    onChange={(e) => setAudio(e.target.files)}
                                    name="Audio"
                                    type="file"
                                    className="TextField"
                                    id="imagefirst"
                                    size={60}
                                    maxLength={60}
                                    required
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="exampleInputPassword1">
                                  Capton
                                </label>
                                <input
                                  onChange={handleChange}
                                  name="Capton"
                                  class="form-control"
                                  placeholder="Enter Your Heading"
                                  required
                                />
                              </div>
                            </div>
                            {/* <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Tags</label>
                                                            <Select
                                                                id="selectOption"
                                                                name="Position" // Adding the name attribute
                                                                value={selectedcategories}
                                                                onChange={categorieshandleChange}
                                                                options={categoriesoptions}
                                                                isMulti
                                                            />
                                                        </div>
                                                    </div> */}
                          </div>

                          <div class="form-group">
                            <label>Editor</label>
                            <JoditEditor
                              ref={editor}
                              value={content}
                              // value={inputs.Matter}
                              config={{ height: "500px" }}
                              tabIndex={1} // tabIndex of textarea
                              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                              onChange={(newContent) => {}}
                              required
                            />
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
        </div>
      </main>
    </>
  );
};

export default AddBlogs;
