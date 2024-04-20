import SideNavBar from "../../component/sidenav/SideNavBar";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Nav from "../../component/nav/Nav";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { useRef, useMemo } from "react";
import Select from "react-select";

const AddAdverd = () => {
  const navigate = useNavigate();
  const [image1, setimage1] = useState({});
  const [image2, setimage2] = useState({});
  const [video, setVideo] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedcategories, setSelectedcategories] = useState(null);
  const [muti, setMult] = useState([]);

  const options = [
    ...muti.map((item) => ({ value: item.link, label: item.name })),
    // Add more options as needed
  ];
  const categoriesoptions = [
    ...selectedValue.map((item) => ({
      value: item.CategoryName,
      label: item.CategoryName,
    })),
    // Add more options as needed
  ];

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [IsHomevalue, setIsHomevalue] = useState("");
  console.log(IsHomevalue);
  const [inputs, setInputs] = useState({});

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  console.log(selectedValue);
  const SelecthandleChange = (event) => {
    setSelectedValue(event.target.value);
    console.log(selectedValue);
  };

  async function FormSubmit(event) {
    event.preventDefault();
    console.log(inputs);
    console.log(isChecked);

    const formData = await new FormData();
    // formData.append('Category', selectedcategories);
    if (inputs.url) {
      formData.append("url", inputs.url);
    }
    formData.append("Image1", image1[0]);
    formData.append("Image2", image2[0]);

    if (selectedcategories) {
      const categeryValues = selectedcategories.map((option) => option.value);
      console.warn(categeryValues);
      formData.append("location", JSON.stringify(categeryValues));
    }

    if (selectedcategories.length > 0) {
      selectedcategories.forEach((option) => {
        formData.append("selectedValue[]", option.value);
      });
    }

    let newres = await ApiCalls("advert", "POST", formData).then(() => {
      alert("data add successfully");
      // navigate('/');
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };

  const categorieshandleChange = (selectedOption) => {
    setSelectedcategories(selectedOption);
    console.warn(selectedOption);
  };

  useEffect(() => {
    const sectionNames = [
      "top of header",
      "below header",
      "top menu",
      "below menu",
      "below breaking News",
      "below scroll news",
      "left home",
      "right home",
      "top badi khabar",
      "jara idhar bhi top",
      "jara idhar below",
      "khabare rajiyo top",
      "upper vote poll",
      "side mousam news",
      "footer upper",
      "footer main",
      "footer below",
      "copyright upper",
    ];
    const formattedSectionNames = sectionNames.map((item) => ({
      CategoryName: item,
      CategoryName: item,
    }));
    setSelectedValue(formattedSectionNames);
  }, []);

  return (
    <>
      <section className="content mt-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Add Advertisement</h3>
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
                          <label htmlFor="CategoryName">Locattion</label>
                          <Select
                            id="selectOption"
                            name="Position" // Adding the name attribute
                            value={selectedcategories}
                            onChange={categorieshandleChange}
                            options={categoriesoptions}
                            isMulti
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="exampleInputEmail1">URL</label>
                          <input
                            onChange={handleChange}
                            name="url"
                            type="text"
                            class="form-control"
                            placeholder="Enter Your Name"
                          />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div class="form-group">
                          <label for="exampleInputFile">Image1</label>
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
                        <div class="form-group">
                          <label for="exampleInputFile">Image2</label>
                          <div>
                            <input
                              onChange={(e) => setimage2(e.target.files)}
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
                        <div class="form-group">
                          <label for="exampleInputFile">Video</label>
                          <div>
                            <input
                              onChange={(e) => setimage2(e.target.files)}
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
    </>
  );
};

export default AddAdverd;
