import React, { useEffect, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const Table = () => {

    const [bannerdata, setbannerdata] = useState([])

    const [id, setid] = useState("");
    const getdata = () => {
        ApiCalls('jaraidhar').then((response) => {
            setbannerdata(response);

        })
            .catch((error) => {
                // Handle error
            });
    }


    useEffect(() => {
        getdata();

    }, [])
    console.log(bannerdata);

    const Delethandler = (id) => {
        ApiCalls(`jaraidhar/${id}`, 'DELETE').then((response) => {
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
                            <h1>बड़ी ख़बर</h1>
                        </div>

                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">बड़ी ख़बर</h3>
                        {/* <div class="card-tools">
                            <NavLink to={'/addmainnew'} className="btn bg-primary btn-sm px-2 py-1">
                                <i className="fas fa-folder me-2"></i>
                                Add jaraidhar
                            </NavLink>
                        </div> */}
                    </div>
                    <div className="card-body p-0">
                        <table className="table table-striped projects">
                            <thead>
                                <tr>


                                    <th style={{ width: "1%" }}>#</th>
                                    <th style={{ width: "10%" }}>Heading</th>
                                    
                                   
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
                                           
                                           
                                            
                                            <td className="project_progress">

                                                <small>{item.Heading}</small>
                                            </td>
                                            
                                            <td className="project-state">
                                                <span className="badge badge-success">active</span>
                                            </td>
                                           
                                            <td className="project-actions text-right">
                                                {/* <NavLink className="btn btn-primary btn-sm" href="#">
                                                    <i className="fas fa-folder"></i>

                                                </NavLink> */}
                                                <NavLink to={`/editmainnew/${item._id}`} className="btn btn-info btn-sm">
                                                    <i className="fas fa-pencil-alt"></i>

                                                </NavLink>
                                                {/* <NavLink className="btn btn-danger btn-sm" onClick={() => Delethandler(item._id)}>
                                                    <i className="fas fa-trash"></i>
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

export default Table