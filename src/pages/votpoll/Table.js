import React, { useContext, useEffect, useState } from 'react'
import ApiCalls from './../../ApiCalls/ApiCalls';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { ApiContext } from '../../Context/ApiContext';
const Table = ({categories}) => {
    const {access, type} = useContext(ApiContext)
    const [bannerdata, setbannerdata] = useState([])
    // console.log(categories) 
    const [id, setid] = useState("");
    const getdata = () => {
        ApiCalls(`poll`).then((response) => {
            setbannerdata(response);

        })
            .catch((error) => {
                // Handle error
            });
    }


    useEffect(() => {
        getdata();

    }, [categories])
    console.log(bannerdata);

    const Delethandler = (id) => {
        ApiCalls(`poll/${id}`, 'DELETE').then((response) => {
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
                            <h1>{categories}</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">{categories}</h3>
                        
                    </div>
                    <div className="card-body p-0">
                        <table className="table table-striped projects">
                            <thead>
                                <tr>

                                    <th style={{ width: "5%" }}>#</th>
                                    <th style={{ width: "40%" }}>Heading</th>
                                    
                                    <th style={{ width: "15%" }} className="text-center">
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
                                            
                                            
                                            
                                            <td className="project-state">
                                                <span className="badge badge-success">active</span>
                                            </td>
                                            
                                            <td className="project-actions text-right">
                                                
                                                <NavLink to={`/edit-poll/${item._id}`} className="btn btn-info btn-sm">
                                                    Edit
                                                </NavLink>
                                                {access === true || type === 'admin' ? (
                                                <NavLink className="btn btn-danger btn-sm ms-2" onClick={() => Delethandler(item._id)}>
                                                    Delete
                                                </NavLink>): null }
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