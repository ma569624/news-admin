import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "../../Context/ApiContext";
import { useNavigate, useParams } from "react-router-dom";
import ApiCalls from "../../ApiCalls/ApiCalls";

const EditUser = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [imageSrc, setImageSrc] = useState("");
  const { API } = useContext(ApiContext);
  const navigation = useNavigate()
  const { id } = params;
  const getdata = () => {
    ApiCalls(`user?_id=${id}`)
      .then((response) => {
        setUser(response[0]);
        console.warn(user);
      })
      .catch((error) => {
        // Handle error
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const ChangeHandle = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setUser({
      ...user,
      [name]: checked, // Save checkbox value in the user state
    });
  };

  const SubmitHandler = async (event) => {
    console.warn(user);
    event.preventDefault();

    const formData = await new FormData();

    

    for (const key in user) {
      if (user.hasOwnProperty(key)) {
        formData.append(key, user[key]);
      }
    }

    if (imageSrc instanceof File) {
      formData.append("profile", imageSrc);
    }
    console.warn(user);
    try {
      const response = await fetch(`${API}/api/user/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      if (response.ok) {
        alert("user successfully Update");
        navigation('/usermanager')
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  return (
    <section className="hold-transition register-page">
      <div className="register-box">
        <div className="card card-outline card-primary">
          <div className="card-body">
            <p className="login-box-msg">Edit User</p>
            <form onSubmit={(e) => SubmitHandler(e)} className="mb-4">
              <div className="input-group mb-3 justify-content-center">
                {imageSrc && imageSrc instanceof Blob ? (
                  <img
                    style={{
                      backgroundColor: "#000",
                      borderRadius: "50%",
                      width: "120px",
                      height: "120px",
                    }}
                    src={URL.createObjectURL(imageSrc)}
                    alt=""
                  />
                ) : (
                  <img
                    style={{
                      backgroundColor: "#000",
                      borderRadius: "50%",
                      width: "120px",
                      height: "120px",
                    }}
                    src={user.profile ? `${API}${user.profile}` : ""}
                    alt=""
                  />
                )}
              </div>

              <div className="row">
                <div className="input-group mb-3 col-lg-4 mx-auto justify-content-center">
                  <label
                    className="rounded"
                    htmlFor="filePicker"
                    style={{
                      color: "#ffff",
                      background: "#000",
                      padding: "5px 10px",
                    }}
                  >
                    Upload Image
                  </label>
                  <input
                    id="filePicker"
                    style={{ visibility: "hidden" }}
                    type="file"
                    className="form-control position-absolute"
                    name="photo"
                    onChange={(e) => setImageSrc(e.target.files[0])}
                    // required
                    placeholder="Employee profile"
                  />
                </div>
              </div>

              <div className="row">
                <div class="mb-3 col-lg-4">
                  <label htmlFor="">Employee Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={(e) => ChangeHandle(e)}
                    required
                    value={user.name || ""}
                    placeholder="Employee Name"
                  />
                </div>

                <div class="mb-3 col-lg-4">
                  <label htmlFor="">Destination</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Destination"
                    onChange={(e) => ChangeHandle(e)}
                    required
                    value={user.Destination || ""}
                    placeholder="Employee Name"
                  />
                </div>
                <div class="mb-3 col-lg-4">
                  <label htmlFor="">Place</label>
                  <input
                    type="text"
                    className="form-control"
                    name="Place"
                    onChange={(e) => ChangeHandle(e)}
                    required
                    value={user.Place || ""}
                    placeholder="Employee Name"
                  />
                </div>
                <div class="mb-3 col-lg-4">
                  <label htmlFor="">Mobile Number</label>
                  <input
                    type="number"
                    className="form-control"
                    name="number"
                    onChange={(e) => ChangeHandle(e)}
                    required
                    value={user.number || ""}
                    placeholder="Enter Mobile Number"
                  />
                </div>

                <div class="mb-3 col-lg-4">
                  <label htmlFor="">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="text"
                    onChange={(e) => ChangeHandle(e)}
                    required
                    value={user.email || ""}
                    placeholder="Enter Email Address"
                  />
                </div>

                <div class="mb-3 col-lg-4">
                  <label htmlFor="">User Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="User_name"
                    placeholder="User Name"
                    required
                    onChange={(e) => ChangeHandle(e)}
                    value={user.User_name || ""}
                  />
                </div>

                <div class="mb-3 col-lg-4">
                  <label htmlFor="">Password</label>
                  <input
                    name="password"
                    type="text"
                    required
                    value={user.password || ""}
                    onChange={(e) => ChangeHandle(e)}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>

                <div className="col-lg-4">
                  <div className="row">
                    <div className="col-lg-12">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name="access_delete"
                          class="form-check-input"
                          onChange={handleCheckboxChange}
                          id="exampleCheck1"
                        />
                        <label for="exampleCheck1">Delete Access</label>
                      </div>
                    </div>
                    <div className="col">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name="user_block"
                          class="form-check-input"
                          onChange={handleCheckboxChange}
                          id="exampleCheck1"
                        />
                        <label for="exampleCheck1">Block user</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditUser;
