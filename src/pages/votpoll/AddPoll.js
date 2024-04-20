import SideNavBar from "../../component/sidenav/SideNavBar";
import React, { useState } from "react";
// import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from "react-router-dom";
import Nav from "../../component/nav/Nav";
import Api from "../../Api/Api";
import Select from "react-select";

const AddPoll = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const [Postion, setPostion] = useState([]);
  const options = [
    { value: "Top", label: "Top" },
    { value: "Banner", label: "Banner" },
  ];

  async function FormSubmit(event) {
    event.preventDefault();
    console.log(inputs);

    let newres = await Api("/api/poll", "POST", inputs).then(() => {
      alert("data add successfully");
      navigate("/poll");
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
    console.log(inputs);
  };

  const imagehandler = (event) => {
    const value = event.target.files[0];
    const name = event.target.name;
    setInputs({ ...inputs, [name]: value });
  };

  // <div className="form-group">
  //     <label htmlFor="exampleInputEmail1">Categorie Name</label>
  //     <Select
  //         value={Postion}
  //         onChange={e => setPostion(e)}
  //         name="Postion"
  //         options={options}
  //         className="basic-multi-select"
  //         classNamePrefix="select"
  //         isMulti
  //     />
  // </div>

  return (
    <div className="content-wrapper">
      <section className="content mt-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">vote Poll</h3>
                </div>
                <form
                  onSubmit={() => FormSubmit}
                  action="/post"
                  method="POST"
                  encType="multipart/form-data"
                >
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Sawal</label>
                      <input
                        onChange={handleChange}
                        name="heading"
                        type="text"
                        class="form-control"
                        placeholder="Enter Your Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Option1</label>
                      <input
                        onChange={handleChange}
                        name="option1"
                        type="text"
                        class="form-control"
                        placeholder="Enter Your Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Option2</label>
                      <input
                        onChange={handleChange}
                        name="option2"
                        type="text"
                        class="form-control"
                        placeholder="Enter Your Name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Option3</label>
                      <input
                        onChange={handleChange}
                        name="option3"
                        type="text"
                        class="form-control"
                        placeholder="Enter Your Name"
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

export default AddPoll;
