import SideNavBar from "../../component/sidenav/SideNavBar";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Nav from "../../component/nav/Nav";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import Select from "react-select";
import { ApiContext } from "../../Context/ApiContext";
import DateTimePicker from 'react-datetime-picker';

const AddBlogs = () => {
  
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const {userinfo} = useContext(ApiContext)
  const [image2, setimage2] = useState({});
  const [video, setVideo] = useState([]);
  const [audio, setAudio] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);


  const [inputs, setInputs] = useState({});

  const getdata = () => {
    ApiCalls("categories").then((response) => {
      setSelectedValue((prevSelectedValue) => [
        ...prevSelectedValue, // Previous state values
        ...response.map((item) => ({
          value: item.category,
          label: item.category,
        })), // New state values
      ]);
    });
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
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


    const formData = await new FormData();

    if (userinfo.name && userinfo.name.length > 0) {
      formData.append("ReporterName", userinfo.name);
    }
    if (userinfo.profile && userinfo.profile.length > 0) {
      formData.append("ReporterProfile", userinfo.profile);
    }
    
    if (userinfo.Destination && userinfo.Destination.length > 0) {
      formData.append("Designation", userinfo.Destination);
    }

    if (userinfo.Place && userinfo.Place.length > 0) {
      formData.append("DatePlace", userinfo.Place);
    }

    const currentDate = new Date().toISOString();
    formData.append('CreationDate', currentDate);
    


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

    if (image2 instanceof File) {
      formData.append("Image2", image2);
    }

    formData.append("Video", video[0]);
    formData.append("Audio", audio[0]);
    if (content) {
      // formData.append('Subheading', inputs.subheading);
      formData.append("Matter", content);
    }
    console.log("FormData:", formData);

    
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
                              
                            {/* <div className="col-md-12">
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
                            </div> */}

                            {/* <div className="col-md-12">
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
                            </div> */}
                          </div>
                          <div className="row">
                          
                            {/* <div className="col-md-12">
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
                            </div> */}
                            {/* <div className="col-md-12">
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
                            </div> */}
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
