import React, { useContext, useEffect, useState } from "react";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { ApiContext } from "../../Context/ApiContext";

const EditTopLinks = () => {
  const [selectedValue, setSelectedValue] = useState([]);
  const { API } = useContext(ApiContext);
  console.log(selectedValue);
const navigation = useNavigate()
  const [inputs, setInputs] = useState({});
  const [image1, setimage1] = useState({});

  const params = useParams();

  const getdata = () => {
    ApiCalls("toplinks")
      .then((response) => {
        setSelectedValue(response);
        console.log(response);
      })
      .catch((error) => {
        // Handle error
      });

    ApiCalls(`toplinks?_id=${params.id}`)
      .then((response) => {
        setInputs(response[0]);
      })
      .catch((error) => {
        // Handle error
      });
  };
  console.log(inputs);
  useEffect(() => {
    getdata();
  }, []);

  async function FormSubmit(event) {
    event.preventDefault();

    console.warn(inputs);

    const formData = await new FormData();

    // if (inputs.name && inputs.name.length > 0) {
    formData.append("name", inputs.name);
    // }

    // if (inputs.background) {
    formData.append("background", inputs.background);
    // }
    
    if (image1 instanceof File) {
        formData.append("Image1", image1);
      }
    

    // let newres = await ApiCalls('blogs', 'PUT', formData).then(() => {
    //     alert("data add successfully")
    // })
    try {
      const response = await fetch(`${API}/api/toplinks/${params.id}`, {
        method: "PUT",
        body: formData, // Pass the FormData object directly
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      alert("data updated")
      navigation('/top-links')
    } catch (error) {
      console.error("Error sending data:", error);
    }
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
                <form onSubmit={() => FormSubmit}>
                  <div className="card-body">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Links's Name</label>
                      <input
                        onChange={handleChange}
                        name="name"
                        type="text"
                        value={inputs.name}
                        className="form-control"
                        placeholder="Enter Your Name"
                      />
                    </div>
                    <div className="form-group w-25">
                      <label htmlFor="exampleInputEmail1">
                        Background Color
                      </label>
                      <input
                        onChange={handleChange}
                        name="background"
                        type="color"
                        value={inputs.background}
                        className="form-control"
                        style={{width: '120px'}}
                        placeholder="Enter Your Name"
                      />
                    </div>
                    {image1 && image1 instanceof Blob ? (
                      <img
                        style={{
                          width: "82px",
                          height: "62px",
                          marginTop: "10px",
                        }}
                        src={URL.createObjectURL(image1)}
                        alt=""
                      />
                    ) : (
                      <img
                        style={{
                          width: "82px",
                          height: "62px",
                          marginTop: "10px",
                        }}
                        src={
                          inputs.Image
                            ? `${API}${inputs.Image}`
                            : ""
                        }
                        alt=""
                      />
                    )}
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Select A logo</label>

                      <input
                        onChange={(e) => setimage1(e.target.files[0])}
                        name="file"
                        type="file"
                        className="form-control"
                        placeholder="Enter Your Name"
                        id="reporterimage"
                        size={60}
                        maxLength={70}
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

export default EditTopLinks;
