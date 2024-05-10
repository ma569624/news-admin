import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ApiContext } from "../../Context/ApiContext";
const Login = () => {
  const {API, setUserInfo} = useContext(ApiContext)
  const [user, setUser] = useState({});
  const { login } = useContext(ApiContext);
  const navigation = useNavigate();
  const ChangeHandle = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });

    // console.log(login)
  };

  const SubmitHandler = async (event) => {
    event.preventDefault();
    console.log("submit handler trigger", user);
    try {
      const response = await fetch(`${API}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if(response.status === 404){
        alert('User not found')
      }

      if(response.status === 401) {
        alert('incorrect password')
      }
      
      if (response.ok) {
        
        const data = await response.json();
        setUserInfo(data)
        console.warn(data)
        login(data);
        navigation("/");
      }

      if (response.status === 403) {
        alert('Your are Blocked by admin')
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  return (
    <section class="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <img
                src="./thirdeyeworldnews logo.svg"
                className="img-fluid w-75"
                alt="User Image"
              />
            </div>
            {/* <h4 className="login-box-msg text-center">Please Login Start</h4> */}
            <form className="mb-4 mt-4" onSubmit={(e) => SubmitHandler(e)}>
              <div>
                <label>Enter User Name</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    name="User_name"
                    className="form-control"
                    onChange={(e) => ChangeHandle(e)}
                    value={user.User_name || ""}
                    placeholder="Username"
                    required
                  />
                </div>
              </div>
              <div>
                <label>Enter Password</label>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={(e) => ChangeHandle(e)}
                    value={user.password || ""}
                    required
                    className="form-control"
                  />
                </div>
              </div>
              <div className="mb-3">
                {/* <Link to={'/forget-password'} className="text-white fw-bold ">Forget Password</Link> */}
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn btn-primary btn-block">
                    Sign In
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

export default Login;
