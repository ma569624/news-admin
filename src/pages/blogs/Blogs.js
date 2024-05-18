import React, { useContext, useEffect, useState } from "react";
import ApiCalls from "./../../ApiCalls/ApiCalls";
import { NavLink, useParams, useLocation } from "react-router-dom";
import { ApiContext } from "../../Context/ApiContext";

const Blogs = () => {
  const { API, type, access } = useContext(ApiContext);
  const params = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const yourParamValue = queryParams.get("value");
  const [data, setdata] = useState([]);
  const [blockdata, setBlockdata] = useState([]);
  const PositionName = params.categories;

  const [categories, setcategories] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, settotalCount] = useState(0)

  const getcategories = () => {
    if (PositionName == "block" || PositionName == "state") {
      ApiCalls(`categories?location=${PositionName}`)
        .then((response) => {
          setBlockdata(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getdata = async () => {
    if (PositionName == "block" || PositionName == "state") {
      if (categories) {
        ApiCalls(`blogs?page=${currentPage}&limit=10&Category=${categories}`)
          .then((response) => {
            setdata(response.data);
            settotalCount(response.nbHits)
            setTotalPages(response.totalPages);
          })
          .catch((error) => {
            // Handle error
          });
      }
    } else {
      ApiCalls(`blogs?page=${currentPage}&limit=10&Category=${PositionName}`)
        .then((response) => {
          setdata(response.data);
          setTotalPages(response.totalPages);
        })
        .catch((error) => {});
    }
  };

  useEffect(() => {
    setdata([]);
    setCurrentPage(1);
    setcategories("");
    getcategories();
    getdata();
  }, [PositionName]);

  useEffect(() => {
    getdata();
  }, [PositionName, currentPage]);

  useEffect(() => {
    getdata();
  }, [categories]);

  useEffect(() => {
    if (PositionName == "block" || PositionName == "state") {
      if (yourParamValue) {
        setcategories(yourParamValue);
      }
    }
  }, [yourParamValue]);

  const toggleVisibility = async (id, status) => {
    const formData = await new FormData();
    formData.append("Status", !status);
    let newres = await ApiCalls(`blogs/${id}`, "PUT", formData).then(() => {
      alert("data add successfully");
      getdata();
    });
  };

  const Delethandler = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      ApiCalls(`blogs/${id}`, "DELETE")
        .then((response) => {
          getdata();
          alert("Successfully deleted");
        })
        .catch((error) => {
          console.error("Error deleting:", error);
          // Handle error, show error message, etc.
        });
    }
  };

  const filterhandleChange = (event) => {
    setdata([]);
    const value = event.target.value;
    setcategories(value);
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
        getdata();
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
        getdata();
      } catch (error) {
        console.error("Error updating status:", error.message);
        // Handle error, show error message to user, etc.
      }
    }
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="content-wrapper">
      <section className="content">
        <div className="card">
          <div className="card-header">
            <div className="card-header">
              <div className="card-title w-100 text-center">
                <h4 className="text-center">
                {PositionName === "state" ? "ख़बरें राज्यों से" : PositionName === 'block' ? "Block" : PositionName}
                </h4>
                <h5>
                  {PositionName == "state" || PositionName == "block"
                    ? categories
                    : null}
                </h5>
                <NavLink
                  to={""}
                  className={`btn ms-2 me-2 fw-bold btn-sm btn-success`}
                  onClick={() => handleUpdateStatusSelected(true)}
                >
                  Show
                </NavLink>
                <NavLink
                  to={""}
                  className={`btn ms-2 me-2 fw-bold btn-sm btn-primary`}
                  onClick={() => handleUpdateStatusSelected(false)}
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
                  value={categories ? categories : null}
                >
                  <option className="fw-bold" disabled selected>
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
              {data.length > 0 ? (
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
                            if (selectedItems.length === data.length) {
                              setSelectedItems([]);
                            } else {
                              setSelectedItems(data.map((item) => item._id));
                            }
                          }}
                          checked={selectedItems.length === data.length}
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
                    <th className="">Action</th>
                  </tr>
                </thead>
              ) : (
                <></>
              )}
              <tbody>
                {data.map((item, key) => (
                  <tr
                    key={key}
                    className={item.Status ? "table-light" : "table-primary"}
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
                      <strong>{(currentPage - 1) * 10 + key + 1}</strong>
                      {/* <strong>{key + 1}</strong>  */}
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
                      <NavLink
                        to={""}
                        className={`btn me-3 fw-bold btn-sm ${
                          item.Status ? "btn-primary" : "btn-success"
                        }`}
                        onClick={() => toggleVisibility(item._id, item.Status)}
                      >
                        {item.Status ? "Hide" : "Show"}
                      </NavLink>

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
            <div className="row justify-content-center ">
              <div className="col-lg-2 text-center mb-2">
              <strong className="bg-primary text-white py-1 px-3">कुल खबरें: {totalCount}</strong>
              </div>
            </div>
            {data && (
              <nav aria-label="Pagination">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${currentPage === 1 && "disabled"}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Previous
                    </button>
                  </li>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <li
                      key={i + 1}
                      className={`page-item ${
                        currentPage === i + 1 && "active"
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(i + 1)}
                      >
                        {i + 1}
                      </button>
                    </li>
                  ))}
                  <li
                    className={`page-item ${
                      currentPage === totalPages && "disabled"
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
