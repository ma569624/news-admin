import React, { useEffect, useState } from 'react'
import ApiCalls from './../../ApiCalls/ApiCalls';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';


const Table = ({categories}) => {
    
    const [bannerdata, setbannerdata] = useState([])
    console.log(categories) 
    const [id, setid] = useState("");
    const getdata = () => {
        ApiCalls(`founder`).then((response) => {
            setbannerdata(response);
        })
            .catch((error) => {
                // Handle error
            });
            // ApiCalls(`blogs?Category=${categories}`).then((response) => {
            //     setbannerdata(response);
    
            // })
            //     .catch((error) => {
            //         // Handle error
            //     });
    }


    useEffect(() => {
        getdata();

    }, [categories])
    console.log(bannerdata);

    const Delethandler = (id) => {
        ApiCalls(`founder/${id}`, 'DELETE').then((response) => {
            getdata()
            console.warn('sucessfully delete', id)
        })
            .catch((error) => {

            });

    }
    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Founder Details</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    
                    <div className="card-body p-0">
                        <table className="table table-striped projects">
                            <thead>
                                <tr>

                                    <th style={{ width: "1%" }}>#</th>
                                    <th style={{ width: "10%" }}>Heading</th>
                                    <th style={{ width: "7%" }}>Image</th>
                                    <th style={{ width: "10%" }}>Name</th>
                                    
                                   
                                    <th style={{ width: "5%" }} className="text-center">
                                        Status
                                    </th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bannerdata.map((item, key) =>
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>

                                                <small>{item.heading}</small>
                                            </td>
                                            <td>
                                                <ul className="list-inline">
                                                    <li className="list-inline-item">
                                                        <img
                                                            alt="Avatar"
                                                            className="table-avatar"
                                                            src={item.Image1}
                                                        />
                                                    </li>

                                                </ul>
                                            </td>
                                          
                                            <td className="project_progress">

                                                <small>{item.Detail}</small>
                                            </td>
                                            
                                            <td className="project-actions text-right">
                                                <NavLink to={``} className="btn me-3 btn-warning btn-sm">
                                                    Hide
                                                </NavLink>
                                                <NavLink to={`/edit-founder/${item._id}`} className="btn btn-info btn-sm">
                                                    Edit
                                                </NavLink>
                                                <NavLink className="btn btn-danger btn-sm ms-2" onClick={() => Delethandler(item._id)}>
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

export default Table