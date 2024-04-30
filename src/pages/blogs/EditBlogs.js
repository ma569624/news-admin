import React, { useContext, useEffect, useState } from "react";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import Select from "react-select";
import { ApiContext } from "../../Context/ApiContext";

const EditBlogs = () => {
  // const params = useParams()
  const params = useParams();
  const {categorie, id} = params; 
  console.warn(params)

  
  const { API } = useContext(ApiContext);
  const navigate = useNavigate();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [video, setVideo] = useState([]);
  const [audio, setAudio] = useState([]);

  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const [inputs, setInputs] = useState({
    ReporterName: "",
  });
  const [image1, setimage1] = useState({});
  const [image2, setimage2] = useState({});

  // Run the effect whenever 'muti' changes

  const getdata = () => {
    ApiCalls(`blogs?_id=${id}`)
      .then((response) => {
        setInputs(response.data[0]);
        setContent(response.data[0].Matter);
        console.warn(response);
      })
      .catch((error) => {
        // Handle error
      });

    ApiCalls("categories")
      .then((response) => {
        setSelectedValue((prevSelectedValue) => [
          ...prevSelectedValue, // Previous state values
          ...response.map((item) => ({
            value: item.category,
            label: item.category,
          })), // New state values
        ]);
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
    const formData = await new FormData();

    if (inputs.ReporterName && inputs.ReporterName.length > 0) {
      formData.append("ReporterName", inputs.ReporterName);
    }

    if (inputs.Designation && inputs.Designation.length > 0) {
      formData.append("Designation", inputs.Designation);
    }
    if (inputs.DatePlace && inputs.DatePlace.length > 0) {
      formData.append("DatePlace", inputs.DatePlace);
    }

    if (inputs.Heading && inputs.Heading.length > 0) {
      formData.append("Heading", inputs.Heading);
    }

    if (inputs.Capton && inputs.Capton.length > 0) {
      formData.append("Capton", inputs.Capton);
    }

    if (inputs.heading && inputs.heading.length > 0) {
      formData.append("Heading", inputs.heading);
    }

    if (inputs.Subheading && inputs.Subheading.length > 0) {
      formData.append("Subheading", inputs.Subheading);
    }
    
    const currentDate = new Date().toISOString();
    formData.append('CreationDate', currentDate);

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
    formData.append("Image1", image1[0]);
    formData.append("Image2", image2[0]);
    formData.append("Video", video[0]);
    formData.append("Audio", audio[0]);
    formData.append("Matter", content);

    let newres = await ApiCalls(`blogs/${id}`, "PUT", formData).then(() => {
      alert("data add successfully");
      if (categorie == 'state' || categorie == 'block') {
        const encodedCategory = encodeURIComponent(inputs.Category);
        navigate(`/blogs/${categorie}?value=${encodedCategory}`);
      }
      else{
        navigate(`/blogs/${categorie}`);
      }
    });

    console.log("FormData:", formData);
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const checked = event.target.checked;
    setInputs({ ...inputs, [name]: value });

    if (name === "Headline") {
      setInputs({ ...inputs, [name]: checked }); // Update the checkbox state only if its name is "isHeader"
    }
    console.warn(inputs);
  };

  const nhandleChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    console.warn(selectedOption);
  };
  return (
    <div className="content-wrapper">
      <section className="content mt-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Edit News</h3>
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
                    </div>
                    <div className="row">
                    <div className="col-md-12">
                        <div class="form-group">
                          <label for="exampleInputFile">Reporter Image</label>
                          <div>
                            <input
                              onChange={(e) => setimage1(e.target.files)}
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
                            name="ReporterName"
                            // value={inputs.ReporterName }
                            value={
                              inputs && inputs.ReporterName
                                ? inputs.ReporterName
                                : ""
                            }
                            type="text"
                            class="form-control"
                            placeholder="Enter Your Name"
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputPassword1">
                            Designation
                          </label>
                          <input
                            onChange={handleChange}
                            name="Designation"
                            // value={inputs.Designation}
                            value={
                              inputs && inputs.Designation
                                ? inputs.Designation
                                : ""
                            }
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
                            Place
                          </label>
                          <input
                            onChange={handleChange}
                            name="DatePlace"
                            // value={inputs.DatePlace}
                            value={
                              inputs && inputs.DatePlace ? inputs.DatePlace : ""
                            }
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
                                <label for="exampleCheck1">Taja Smachar</label>
                              </div>
                            </div>
                          </div>
                          
                          <input
                            onChange={handleChange}
                            name="Heading"
                            // value={inputs.Heading}
                            value={
                              inputs && inputs.Heading ? inputs.Heading : ""
                            }
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
                            name="Subheading"
                            // value={inputs.Subheading}
                            value={
                              inputs && inputs.Subheading
                                ? inputs.Subheading
                                : ""
                            }
                            type="text"
                            class="form-control"
                            placeholder="Enter Your subheading"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <img
                          className="mt-2"
                          style={{ width: "100px", height: "80px" }}
                          src={`${API}${inputs.Image}`}
                          alt=""
                        />
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label htmlFor="exampleInputFile">Image</label>
                          <div className="input-group">
                            <input
                              onChange={(e) => setimage2(e.target.files)}
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
                          <label htmlFor="exampleInputPassword1">Capton</label>
                          <input
                            onChange={handleChange}
                            name="Capton"
                            value={inputs && inputs.Capton ? inputs.Capton : ""}
                            class="form-control"
                            placeholder="Enter Your Heading"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div class="form-group">
                      <label>Editor</label>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        // value={inputs.Matter}
                        // config={config}
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
  );
};

export default EditBlogs;
