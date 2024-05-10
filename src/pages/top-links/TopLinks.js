import React, { useEffect, useState } from 'react'
import ApiCalls from './../../ApiCalls/ApiCalls';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const TopLinks = () => {
    const [data, setdata] = useState([])
    const getdata = () => {
        ApiCalls('toplinks').then((response) => {
            setdata(response);
        })
            .catch((error) => {
                // Handle error
            });
    }


    useEffect(() => {
        getdata();

    }, [])
    console.log(data);

    const Delethandler = (id) => {
        ApiCalls(`toplinks/${id}`, 'DELETE').then((response) => {
            getdata()
            console.warn('sucessfully delete', id)
        })
            .catch((error) => {
            });

    }
    return (

        <div className="content-wrapper">
            
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <h4 className="card-title">Master Links Manger</h4>
                        {/* <div class="card-tools">
                            <NavLink to={'/add-top-links'} className="btn bg-primary btn-sm px-2 py-1">
                                <i className="fas fa-folder me-2"></i>
                                Add Top Links
                            </NavLink>
                        </div> */}
                    </div>
                    <div className="card-body p-0">
                        <table className="table table-striped projects">
                            <thead>
                                <tr>

                                    <th style={{ width: "10%" }}>#</th>
                                    <th style={{ width: "70%" }}> Name</th>
                                    {/* <th style={{ width: "20%" }}>Link</th> */}
                                    {/* <th style={{ width: "20%" }}>Position</th> */}

                                    <th className=''>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, key) =>
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>
                                                <strong>{item.name}</strong>
                                            </td>
                                            {/* <td>
                                                <small>{item.link}</small>
                                            </td> */}

                                            {/* <td >
                                                <small>{item.Position}</small>
                                            </td> */}

                                            <td className="project-actions text-right">

                                                <NavLink to={`/edit-top-links/${item._id}`} className="btn btn-info btn-sm">
                                                    Edit
                                                </NavLink>
                                                {/* <NavLink className="btn btn-danger btn-sm ms-2" onClick={() => Delethandler(item._id)}>
                                                    Delete
                                                </NavLink> */}
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

export default TopLinks