import React, { useEffect, useState } from "react";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import Select from "react-select";

const EditBlogs = () => {
  // const params = useParams()
  const params = useParams();
  const id = params.id;
  const category = params.category;
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
  const [top, setTop] = useState([]);

  // Run the effect whenever 'muti' changes

  const getdata = async () => {
    setTop([
      { Link: "TopKhabare", Name: "TopKhabare" },
      { Link: "primenews", Name: "प्रमुख समाचार" },
      { Link: "mainnews", Name: "बड़ी ख़बर" },
      { Link: "idharbhi", Name: "जरा इधर भी" },
    ]);
    ApiCalls(`blogs?&_id=${id}`)
      .then((response) => {
        setInputs(response.data[0]);
        console.warn(response.data[0]);
        console.warn(response.data[0].Matter);
        setContent(response.data[0].Matter);
      })
      .catch((error) => {
        // Handle error
      });

    ApiCalls("blogdisplay")
      .then((response) => {
        setSelectedValue((prevSelectedValue) => [
          ...prevSelectedValue, // Previous state values
          ...response.map((item) => ({
            value: item.SectionName,
            label: item.SectionName,
          })), // New state values
        ]);
      })
      .catch((error) => {
        // Handle error
      });

    ApiCalls("rajiya")
      .then((response) => {
        setSelectedValue((prevSelectedValue) => [
          ...prevSelectedValue, // Previous state values
          ...response.map((item) => ({
            value: item.StateName,
            label: item.StateName,
          })), // New state values
        ]);
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

    if (inputs.Subheading && inputs.Subheading.length > 0) {
      formData.append("Subheading", inputs.Subheading);
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

    formData.append("Image1", image1[0]);
    formData.append("Image2", image2[0]);
    formData.append("Video", video[0]);
    formData.append("Audio", audio[0]);
    formData.append("Matter", content);

    let newres = await ApiCalls(`blogs/${id}`, "PUT", formData).then(() => {
      alert("data add successfully");
      navigate(`/blogs/${category}`);
    });

    console.log("FormData:", formData);
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
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
                  <h3 className="card-title">Edit Khabar</h3>
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
                    </div>
                    <div className="row">
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
                            Date/Place
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
                          <label htmlFor="exampleInputPassword1">Heading</label>
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
