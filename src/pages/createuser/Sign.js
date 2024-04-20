import React, { useContext, useState } from "react";
import { ApiContext } from "../../Context/ApiContext";

const Sign = () => {
  const [user, setUser] = useState({});
  const [imageSrc, setImageSrc] = useState("");
  const {API} = useContext(ApiContext)

  const changefileHandle = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageSrc(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

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

    if (user.password !== user.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    console.warn(user);

    try {

      const response = await fetch(`${API}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }
      if (response.ok) {
        alert('user successfully created')
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
            <p className="login-box-msg">Create a New User</p>
            <form onSubmit={(e) => SubmitHandler(e)} className="mb-4">
              <div className="input-group mb-3 justify-content-center">
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Uploaded"
                    style={{
                      backgroundColor: "#000",
                      borderRadius: "50%",
                      width: "120px",
                      height: "120px",
                    }}
                  />
                )}
              </div>
              <div className="row">
                <div className="input-group mb-3 col">
                  <input
                    type="file"
                    className="form-control"
                    name=""
                    onChange={changefileHandle}
                    // required
                    placeholder="Employee profile"
                  />
                </div>
                <div class="mb-3">
                <label htmlFor="">User name</label>
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
              </div>
              <div className="row">
              <div class="mb-3 col">
                <label htmlFor="">number</label>
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

                <div class="mb-3 col">
                <label htmlFor="">email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    onChange={(e) => ChangeHandle(e)}
                    required
                    value={user.email || ""}
                    placeholder="Enter Email Address"
                  />
                </div>
              </div>
              <div className="row">
              <div class="mb-3 col">
                <label htmlFor="">User_name</label>
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

                <div class="mb-3 col">
                <label htmlFor="">password</label>
                  <input
                    name="password"
                    type="password"
                    required
                    value={user.password || ""}
                    onChange={(e) => ChangeHandle(e)}
                    className="form-control"
                    placeholder="Password"
                  />
                </div>
              </div>

             
              <div class="mb-3">
                <label htmlFor="">confirm_password</label>
                <input
                  name="confirm_password"
                  type="password"
                  required
                  value={user.confirm_password || ""}
                  onChange={(e) => ChangeHandle(e)}
                  className="form-control"
                  placeholder="Confirm Password"
                />
                </div>
              {/* <div className="input-group mb-3">
                <input
                  name="password_delete"
                  type="password"
                  value={user.password_delete || ""}
                  onChange={(e) => ChangeHandle(e)}
                  className="form-control"
                  placeholder="Password to Delete News"
                />
              </div>

              <div className="input-group mb-3">
                <input
                  name="Confirm_password_delete"
                  type="password"
                  required={
                    user.password_delete && user.password_delete.length > 3
                      ? "required"
                      : ""
                  }
                  value={user.Confirm_password_delete || ""}
                  onChange={(e) => ChangeHandle(e)}
                  className="form-control"
                  placeholder="Confirm Password to Delete News"
                />
              </div> */}
              <div className="row">
                <div className="col">
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

              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Create
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

export default Sign;
