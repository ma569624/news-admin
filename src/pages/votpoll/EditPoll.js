import React, { useEffect, useState } from "react";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { useNavigate, useParams } from "react-router-dom";
import Api from "../../Api/Api";

const EditPoll = () => {
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();

  const params = useParams();
  console.log(params.id);
  const getdata = () => {
    ApiCalls(`poll?_id=${params.id}`)
      .then((response) => {
        setInputs(response[0]);
      })
      .catch((error) => {
        // Handle error
      });
  };
  console.log(inputs.CategoryName);
  useEffect(() => {
    getdata();
  }, []);
  console.log(inputs);
  async function FormSubmit(event) {
    event.preventDefault();
    console.log(inputs);

    let newres = await Api(`/api/poll/${params.id}`, "PUT", inputs).then(() => {
      alert("data add successfully");
      navigate("/poll");
    });
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className="content-wrapper">
      <section className="content mt-4">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Top Khabare</h3>
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
                        value={inputs.heading}
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
                        value={inputs.option1}
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
                        value={inputs.option2}
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
                        value={inputs.option3}
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

export default EditPoll;
