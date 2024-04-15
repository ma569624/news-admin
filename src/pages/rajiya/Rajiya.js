import React, { useContext, useEffect, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls';
import { NavLink } from 'react-router-dom';
import { ApiContext } from '../../Context/ApiContext';

const Rajiya = () => {
    const {API} = useContext(ApiContext)
    const [bannerdata, setbannerdata] = useState([])
    const [blogs, setBlogs] = useState([])
    const [category, setCategory] = useState([])
    const [isVisible, setIsVisible] = useState('');


    const toggleVisibility = async (id, status) => {
        if (status == 'active') {
            setIsVisible('inactive');
        }
        else {
            setIsVisible('active');
        }
        const formData = await new FormData();
        console.warn(status)
        console.warn(isVisible)
        formData.append('Status', isVisible);
        let newres = await ApiCalls(`rajiya/${id}`, 'PUT', formData).then(() => {
            alert("data add successfully")
            getdata()
        })
    };

    const getdata = () => {
        ApiCalls('blogs').then((response) => {
            setBlogs(response);

        })
            .catch((error) => {
                // Handle error
            });

        ApiCalls('rajiya').then((response) => {
            setbannerdata(response);
        })
            .catch((error) => {
                // Handle error
            });

    }

    useEffect(() => {
        getdata();
    }, [])


    const Delethandler = (id) => {

        const confirmDelete = window.confirm('Are you sure you want to delete?');

        if (confirmDelete) {
            ApiCalls(`rajiya/${id}`, 'DELETE')
                .then((response) => {
                    getdata();
                    alert('Successfully deleted');
                })
                .catch((error) => {
                    console.error('Error deleting:', error);
                    // Handle error, show error message, etc.
                });
        }
    };

    const [selectedItems, setSelectedItems] = useState([]);
    console.warn(selectedItems)

    // Function to handle checkbox change
    const handleCheckboxChange = (itemId) => {
        if (selectedItems.includes(itemId)) {
            setSelectedItems(selectedItems.filter(id => id !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };

    // Function to handle deletion of selected items
    const handleDeleteSelected = async () => {
        // Display confirmation dialog
        const isConfirmed = window.confirm("Are you sure you want to delete the selected items?");
    
        // Check if user confirmed the deletion
        if (isConfirmed) {
            try {
                const response = await fetch(`${API}/api/rajiya`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                        // Add any additional headers if needed
                    },
                    body: JSON.stringify({ ids: selectedItems }) // Send the array of IDs in the request body under the key "ids"
                });
    
                if (!response.ok) {
                    throw new Error('Failed to delete products');
                }
                
                getdata();
                const data = await response.json();
                console.log(data); // Log success message or handle response data
    
            } catch (error) {
                console.error('Error deleting products:', error.message);
                // Handle error, show error message to user, etc.
            }
        }
    };

    const handleUpdateStatusSelected = async (status) => {
        const isConfirmed = window.confirm(`Are you sure you want to update the status of the selected items to ${status}?`);
    
        if (isConfirmed) {
            try {
                const response = await fetch('${API}/api/rajiya', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ids: selectedItems, status: status })
                });
    
                if (!response.ok) {
                    throw new Error('Failed to update status');
                }
                
                getdata();
                const data = await response.json();
                console.log(data); // Log success message or handle response data
            } catch (error) {
                console.error('Error updating status:', error.message);
                // Handle error, show error message to user, etc.
            }
        }
    };
    
    

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Rajiyo</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title w-100 text-center">
                            <NavLink to={''} className={`btn ms-2 me-2 fw-bold btn-sm btn-success`} onClick={() => handleUpdateStatusSelected('active')}>
                                show
                            </NavLink>
                            <NavLink to={''} className={`btn ms-2 me-2 fw-bold btn-sm btn-primary`} onClick={() => handleUpdateStatusSelected('inactive')}>
                                Hide
                            </NavLink>
                            <NavLink className="fw-bold btn btn-danger btn-sm ms-2" onClick={handleDeleteSelected}>
                                Delete
                            </NavLink>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <table className="table  projects">
                            <thead>
                                <tr>
                                    <th style={{ width: "15%" }}>
                                        <div class="form-check">
                                            <input type="checkbox"
                                                name="tajasamachar"
                                                style={{ border: '2px solid red' }}
                                                class="form-check-input"
                                                onChange={() => {
                                                    if (selectedItems.length === bannerdata.length) {
                                                        setSelectedItems([]);
                                                    } else {
                                                        setSelectedItems(bannerdata.map(item => item._id));
                                                    }
                                                }}
                                                checked={selectedItems.length === bannerdata.length}
                                            />
                                           
                                            <label for="exampleCheck1" className='mb-0'>All Select</label>
                                        </div>
                                    </th>
                                    <th style={{ width: "5%" }}>Sr no</th>
                                    <th style={{ width: "20%" }}>StateName</th>
                                    <th style={{ width: "20%" }}>StateName</th>
                                    {/* <th style={{ width: "40%" }}>FirstLink</th> */}
                                    <th style={{ width: "20%" }} className="text-center">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bannerdata.map((item, key) =>
                                        <tr key={key} className={item.Status == 'active' ? 'table-light' : 'table-primary'}>
                                            <td>
                                                <div class="form-check">
                                                    <input type="checkbox"
                                                        name="tajasamachar"
                                                        style={{ border: '2px solid red' }}
                                                        class="form-check-input"
                                                        checked={selectedItems.includes(item._id)}
                                                        onChange={() => handleCheckboxChange(item._id)} />
                                                </div>
                                            </td>
                                            <td><strong>{key + 1}</strong></td>
                                            <td><strong>{item.StateName}</strong></td>
                                            <td><strong>{item.FirstLink}</strong></td>
                                            {/* <News id={item.FirstLink} /> */}

                                            {/* <td className="project-state">
                                                <span className="badge badge-success">active</span>
                                            </td> */}

                                            <td className="project-actions text-right">
                                                <NavLink to={''} className={`btn me-3 fw-bold btn-sm ${item.Status == 'active' ? 'btn-primary' : 'btn-success'}`} onClick={() => toggleVisibility(item._id, item.Status)}>
                                                    {/* {isVisible ? 'Hide' : 'Show'} */}
                                                    {item.Status == 'active' ? 'Hide' : 'Show'}
                                                </NavLink>

                                                <NavLink to={`/rajiya/${item._id}`} className="fw-bold btn btn-info btn-sm">
                                                    Edit
                                                </NavLink>
                                                <NavLink className="fw-bold btn btn-danger btn-sm ms-2" onClick={() => Delethandler(item._id)}>
                                                    Delete
                                                </NavLink>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Rajiya
