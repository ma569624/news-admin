import React, { useContext, useEffect, useState } from "react";
import ApiCalls from "../../ApiCalls/ApiCalls";
import { Link, useParams, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { ApiContext } from "../../Context/ApiContext";

const Categorie = () => {
  const params = useParams();
  const { API, access, type } = useContext(ApiContext);
  const [bannerdata, setbannerdata] = useState([]);
  const [selectedsection, SetSelctedsection] = useState("");
  const [isVisible, setIsVisible] = useState({});
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  // Get the value of a specific query parameter
  const yourParamValue = queryParams.get("value");
  console.warn("Query Parameter Value:", yourParamValue);
  console.warn(yourParamValue);

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
    let newres = await ApiCalls(`categories/${id}`, "PUT", formData).then(
      () => {
        alert("data add successfully");
        getdata();
      }
    );
  };


  const getdata = () => {
    ApiCalls(`categories?location=${selectedsection}`)
      .then((response) => {
        setbannerdata(response);
        console.warn(response);
      })
      .catch((error) => {});
  };
  useEffect(() => {
    if (yourParamValue) {
      if (yourParamValue == 'title1' || yourParamValue == 'title2' || yourParamValue == 'title3'|| yourParamValue == 'title4' ) {
        ApiCalls(`categories?location=title`)
        .then((response) => {
          setbannerdata(response);
          console.warn(response);
        })
        .catch((error) => {});
      }
      else{
        ApiCalls(`categories?location=${yourParamValue}`)
        .then((response) => {
          setbannerdata(response);
          console.warn(response);
        })
        .catch((error) => {});
      }
    }
  }, [yourParamValue]);

  const Delethandler = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (confirmDelete) {
      ApiCalls(`categories/${id}`, "DELETE")
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
        const response = await fetch(`${API}/api/multicategories`, {
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

        getdata();
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
        const response = await fetch(`${API}/api/multicategories`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: selectedItems, status: status }),
        });

        if (!response.ok) {
          throw new Error("Failed to update status");
        }

        getdata();
        const data = await response.json();
        console.log(data); // Log success message or handle response data
      } catch (error) {
        console.error("Error updating status:", error.message);
        // Handle error, show error message to user, etc.
      }
    }
  };

  const showsection = (e) => {
    const section = e.target.value;
    ApiCalls(`categories?location=${section}`)
      .then((response) => {
        setbannerdata(response);
        console.warn(response);
      })
      .catch((error) => {});
    SetSelctedsection(section);
    
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="card">
          <div className="card-header">
            <div className="card-title w-100 text-center">
              <h4 className="text-center">Section Manager</h4>
              <div className="d-grid mb-3">
                <label htmlFor="" className="fs-4">
                  Please Select Section
                </label>
                <select
                  class="custom-select w-25 mx-auto"
                  onChange={showsection}
                >
                  <option disabled selected>
                    Select
                  </option>
                  <option value="title">Top Section</option>
                  <option value="block">Block</option>
                  <option value="state">State</option>
                </select>
              </div>
              {selectedsection === "title" ? (
                <></>
              ) : (
                <>
                  <NavLink
                    to={""}
                    className={`btn ms-2 me-2 fw-bold btn-sm btn-success`}
                    onClick={() => handleUpdateStatusSelected("active")}
                  >
                    show
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
                </>
              )}
            </div>
          </div>
          <div className="card-body p-0">
            <table className="table projects">
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

                  <th style={{ width: "5%" }}>Sr no</th>
                  <th style={{ width: "40%" }}>Section Name</th>
                  {/* <th style={{ width: "40%" }}>FirstLink</th> */}
                  <th style={{ width: "20%" }} className="text-center">
                    Status
                  </th>
                </tr>
              </thead>
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
                          class="form-check-input"
                          checked={selectedItems.includes(item._id)}
                          onChange={() => handleCheckboxChange(item._id)}
                          id="exampleCheck1"
                        />
                      </div>
                    </td>
                    <td>
                      <strong>{key + 1}</strong>
                    </td>
                    <td>
                      <strong>{item.category}</strong>
                    </td>

                    <td className="project-actions text-right">
                      {selectedsection === "title" ? (
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
                          {/* {isVisible ? 'Hide' : 'Show'} */}
                          {item.Status == "active" ? "Hide" : "Show"}
                        </NavLink>
                      )}

                      <NavLink
                        to={`/edit-categorie/${item._id}`}
                        className="btn btn-info btn-sm fw-bold"
                      >
                        Edit
                      </NavLink>
                      {selectedsection === "title" ? (
                        <></>
                      ) : access === true || type === "admin" ? (
                        <NavLink
                          className="btn btn-danger btn-sm ms-2 fw-bold"
                          onClick={() => Delethandler(item._id)}
                        >
                          Delete
                          {access}
                        </NavLink>
                      ) : null}
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

export default Categorie;
