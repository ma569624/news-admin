import React, { useContext, useEffect, useState } from "react";
import ApiCalls from "./../../ApiCalls/ApiCalls";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { ApiContext } from "../../Context/ApiContext";

const Blogs = () => {
  const { API, type, access } = useContext(ApiContext);
  const params = useParams();
  const location = useLocation();

  // Extract query parameters using URLSearchParams
  const queryParams = new URLSearchParams(location.search);

  // Get the value of a specific query parameter
  const yourParamValue = queryParams.get("value");
  console.warn("Query Parameter Value:", yourParamValue);
  console.warn(yourParamValue);
  const [bannerdata, setbannerdata] = useState([]);
  const [blockdata, setBlockdata] = useState([]);
  const PositionName = params.categories;

  const [categories, setcategories] = useState("");
  const [isVisible, setIsVisible] = useState({});
  const toggleVisibility = async (id, status) => {
    if (status == "active") {
      setIsVisible("inactive");
    } else {
      setIsVisible("active");
    }
    const formData = await new FormData();
    console.warn(status);

    console.warn(isVisible);
    formData.append("Status", isVisible);
    let newres = await ApiCalls(`blogs/${id}`, "PUT", formData).then(() => {
      alert("data add successfully");
      window.location.reload();
    });
  };

  useEffect(() => {
    setcategories(params.categories);
  }, [params]);

  console.warn(bannerdata);

  useEffect(() => {
    if (PositionName == "tajasamachar") {
      ApiCalls(`blogs?page=1&limit=17&Headline=true`)
        .then((response) => {
          setbannerdata(response.data);
          console.warn(response.data);
        })
        .catch((error) => {
          // Handle error
        });
    } else {
      ApiCalls(`blogs?page=1&limit=17&Category=${PositionName}`)
        .then((response) => {
          setbannerdata(response.data);
          console.warn(response);
        })
        .catch((error) => {
          // Handle error
        });
    }
  }, [PositionName, params]);

  useEffect(() => {
    if (PositionName == "block" || PositionName == "state") {
      ApiCalls(`categories?location=${PositionName}`)
        .then((response) => {
          setBlockdata(response);
        })
        .catch((error) => {
          console.warn(error);
        });
      if (queryParams) {
        ApiCalls(`blogs?page=1&limit=25&Category=${yourParamValue}`)
          .then((response) => {
            setbannerdata(response.data);
            console.warn(bannerdata);
          })
          .catch((error) => {
            // Handle error
          });
      }
    }
  }, [params]);

  const Delethandler = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      ApiCalls(`blogs/${id}`, "DELETE")
        .then((response) => {
          window.location.reload();
          alert("Successfully deleted");
        })
        .catch((error) => {
          console.error("Error deleting:", error);
          // Handle error, show error message, etc.
        });
    }
  };

  const filterhandleChange = (event) => {
    setbannerdata([]);
    const value = event.target.value;
    ApiCalls(`blogs?page=1&limit=25&Category=${value}`)
      .then((response) => {
        setbannerdata(response.data);
        console.warn(bannerdata);
      })
      .catch((error) => {
        // Handle error
      });
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  // Function to handle deletion of selected items
  const handleDeleteSelected = async () => {
    // Display confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete the selected items?"
    );

    // Check if user confirmed the deletion
    if (isConfirmed) {
      try {
        const response = await fetch(`${API}/api/blogs`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            // Add any additional headers if needed
          },
          body: JSON.stringify({ ids: selectedItems }), // Send the array of IDs in the request body under the key "ids"
        });

        if (!response.ok) {
          throw new Error("Failed to delete products");
        }

        const data = await response.json();
        console.log(data); // Log success message or handle response data
      } catch (error) {
        console.error("Error deleting products:", error.message);
        // Handle error, show error message to user, etc.
      }
    }
  };

  const handleUpdateStatusSelected = async (status) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to update the status of the selected items to ${status}?`
    );

    if (isConfirmed) {
      try {
        const response = await fetch(`${API}/api/blogs`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedItems, status: status }),
        });

        if (!response.ok) {
          throw new Error("Failed to update status");
        }

        const data = await response.json();
        console.log(data); // Log success message or handle response data
      } catch (error) {
        console.error("Error updating status:", error.message);
        // Handle error, show error message to user, etc.
      }
    }
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="card">
          <div className="card-header">
            <div className="card-header">
              <div className="card-title w-100 text-center">
                <h4 className="text-center">
                  {PositionName == "state" ? "ख़बरें राज्यों से" : PositionName}
                </h4>
                <NavLink
                  to={""}
                  className={`btn ms-2 me-2 fw-bold btn-sm btn-success`}
                  onClick={() => handleUpdateStatusSelected("active")}
                >
                  Show
                </NavLink>
                <NavLink
                  to={""}
                  className={`btn ms-2 me-2 fw-bold btn-sm btn-primary`}
                  onClick={() => handleUpdateStatusSelected("inactive")}
                >
                  Hide
                </NavLink>
                {access === true || type === "admin" ? (
                  <NavLink
                    className="fw-bold btn btn-danger btn-sm ms-2"
                    onClick={handleDeleteSelected}
                  >
                    Delete
                  </NavLink>
                ) : null}
              </div>
            </div>

            <div className="col-lg-3 mx-auto">
              {PositionName == "block" || PositionName == "state" ? (
                <select
                  class="custom-select rounded-0"
                  name="CategoryName"
                  id="exampleSelectRounded0"
                  onChange={filterhandleChange}
                >
                  <option className="fw-bold" selected disabled>
                    Please Select
                  </option>
                  {blockdata.map((item, key) => (
                    <option className="fw-bold" key={key} value={item.category}>
                      {item.category}
                    </option>
                  ))}
                </select>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="card-body p-0">
            <table className="table projects">
              {bannerdata.length > 0 ? (
                <thead>
                  <tr>
                    <th style={{ width: "15%" }}>
                      <div class="form-check mb-0">
                        <input
                          type="checkbox"
                          name="tajasamachar"
                          style={{ border: "2px solid red" }}
                          class="form-check-input me-1"
                          onChange={() => {
                            if (selectedItems.length === bannerdata.length) {
                              setSelectedItems([]);
                            } else {
                              setSelectedItems(
                                bannerdata.map((item) => item._id)
                              );
                            }
                          }}
                          checked={selectedItems.length === bannerdata.length}
                          id="exampleCheck1"
                        />
                        <label for="exampleCheck1" className="mb-0">
                          All Select
                        </label>
                      </div>
                    </th>
                    <th style={{ width: "10%" }}>Sr no.</th>
                    <th style={{ width: "15%" }}>Reporter Name</th>
                    <th style={{ width: "20%" }}>Heading</th>
                    <th style={{ width: "8%" }} className="text-center">
                      Image
                    </th>
                    <th  className="">
                      Action
                    </th>
                  </tr>
                </thead>
              ) : (
                <></>
              )}
              <tbody>
                {bannerdata.map((item, key) => (
                  <tr
                    key={key}
                    className={
                      item.Status == "active" ? "table-light" : "table-primary"
                    }
                  >
                    <td>
                      <div class="form-check">
                        <input
                          type="checkbox"
                          name="tajasamachar"
                          style={{ border: "2px solid red" }}
                          checked={selectedItems.includes(item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
                          class="form-check-input"
                          id="exampleCheck1"
                        />
                      </div>
                    </td>
                    <td>
                      <strong>{key + 1}</strong>
                    </td>
                    <td>
                      <strong>{item.ReporterName}</strong>
                    </td>

                    <td className="project_progress">
                      <strong>{item.Heading}</strong>
                    </td>
                    <td className="project_progress">
                      <img src={`${API}${item.Image}`} alt="pic" width="80px" />
                    </td>

                    <td className="project-actions text-right">
                      {PositionName == "tajasamachar" ? (
                        <></>
                      ) : (
                        <NavLink
                          to={""}
                          className={`btn me-3 fw-bold btn-sm ${
                            item.Status == "active"
                              ? "btn-primary"
                              : "btn-success"
                          }`}
                          onClick={() =>
                            toggleVisibility(item._id, item.Status)
                          }
                        >
                          {item.Status == "active" ? "Hide" : "Show"}
                        </NavLink>
                      )}

                      
                        <NavLink
                          to={`/edit-blogs/${item._id}/${PositionName}`}
                          className=" fw-bold btn btn-info btn-sm"
                        >
                          Edit
                        </NavLink>
                      

                      {PositionName !== "tajasamachar" &&
                        (access === true || type === "admin") && (
                          <NavLink
                            className="btn btn-danger btn-sm ms-2 fw-bold"
                            onClick={() => Delethandler(item._id)}
                          >
                            Delete
                          </NavLink>
                        )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
