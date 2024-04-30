import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./style.css";
import { ApiContext } from "../../Context/ApiContext";
import ApiCalls from "../../ApiCalls/ApiCalls";

const Nav = () => {
  const [location, setLocation] = useState([]);

  useEffect(() => {
    ApiCalls(`categories?location=title`)
      .then((response) => {
        setLocation(response);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);
  const { logout, userinfo, type } = useContext(ApiContext);

  return (
    <nav className="navbar navbar-expand-lg  mt-5">
      <div className="container-fluid bg-top-nav mx-5">
        {/* <a className="navbar-brand" href="#">
          Navbar
        </a> */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            {type === "admin" ? (
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle">
                  Admin Section
                </NavLink>
                <ul className={`dropdown-menu`}>
                  <li>
                    <NavLink to={`/create-user`} className="dropdown-item">
                      Team / Edit User
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/logs`} className="dropdown-item">
                      Views Login logs
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/Subscribers`} className="dropdown-item">
                      Subscribers Views
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/add-team`} className="dropdown-item">
                      Hame Jane
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/team`} className="dropdown-item">
                      Hame Jane Manager
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/address`} className="dropdown-item">
                      Hamara Pata
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={`/edit-founder`} className="dropdown-item">
                      Founder Details
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink to={`/founder`} className="dropdown-item">
                      Founder Details Manager
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink to={`/document`} className="dropdown-item">
                      Document Manger
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={`https://analytics.google.com`}
                      target="_blank"
                      className="dropdown-item"
                    >
                      Webalizer
                    </NavLink>
                  </li>
                  <li>
                    <div
                      className="dropdown-item logout"
                      onClick={() => logout()}
                    >
                      Logout
                    </div>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle">
                  User Section
                  {/* {userinfo.name} */}
                </NavLink>
                <ul className={`dropdown-menu`}>
                  <li>
                    <div
                      className="dropdown-item logout"
                      onClick={() => logout()}
                    >
                      Logout
                    </div>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle">Multimedia</NavLink>
              <ul className="dropdown-menu ">
                {type === "admin" ? (
                  <li>
                    <NavLink to={`/addrajiya`} className="dropdown-item">
                      Colors Thems Manager
                    </NavLink>
                  </li>
                ) : null}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle">
                Ads Block/ Poll Section
              </NavLink>
              <ul className="dropdown-menu ">
                <li>
                  <NavLink to={`/add-advert`} className="dropdown-item">
                    Add Advertisments
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/advert`} className="dropdown-item">
                    Advertisments Manager
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/add-poll`} className="dropdown-item">
                    Add Opinion Polls
                  </NavLink>
                </li>
                <li>
                  <NavLink to={`/poll`} className="dropdown-item">
                    Opinion Polls Manager
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink to={`/add-blogs`} className="nav-link">
                Add News
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle">
                Link Manager
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to={`/tagline`} className="dropdown-item">
                    Header Tagline
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink to={`/blogs/primenews`} className="dropdown-item">
                    Home News Manager
                  </NavLink>
                </li> */}
                {type === "admin" ? (
                  <li>
                    <NavLink to={`/top-links`} className="dropdown-item">
                      Master Link Manager
                    </NavLink>
                  </li>
                ) : null}

               
                
                
              </ul>
            </li>
            

            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle">
                News Section
              </NavLink>
              <ul className="dropdown-menu">
                
                {type === "admin" ? (
                  <>
                    <li>
                      <NavLink to={`/homeview`} className="dropdown-item">
                        Add Section Block
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/home`} className="dropdown-item">
                        Section Manger
                      </NavLink>
                    </li>
                    {location.map((item, key) => (
                  <li>
                    <NavLink
                      to={`/blogs/${item.category}`}
                      className="dropdown-item"
                    >
                      {item.category}
                    </NavLink>
                  </li>
                ))}
                <NavLink to={`/blogs/state`} className="dropdown-item">
                  ख़बरें राज्यों से
                </NavLink>
                <NavLink to={`/blogs/block`} className="dropdown-item">
                  Block News
                </NavLink>
                  </>
                ) : null}
              </ul>
            </li>

            {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu" >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
          </ul>
          {/* <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
