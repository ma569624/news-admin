import React, { useEffect, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
const Table = () => {

    const [bannerdata, setbannerdata] = useState([])
    const [blogs, setBlogs] = useState([])
    const [category, setCategory] = useState([])


    const [id, setid] = useState("");
    const getdata = () => {
        ApiCalls('categories').then((response) => {
            setCategory(response);

        })
            .catch((error) => {
                // Handle error
            });
        ApiCalls('blogs').then((response) => {
            setBlogs(response);

        })
            .catch((error) => {
                // Handle error
            });
        ApiCalls('blogdisplay').then((response) => {
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
        ApiCalls(`blogdisplay/${id}`, 'DELETE').then((response) => {
            getdata()
            console.warn('sucessfully delete', id)
        })
            .catch((error) => {

            });
    }

    const News = ({ id }) => {
        console.log(blogs)
        console.log(id)
        const [newdata, setNewdata] = useState([])
        const [update, setupdate] = useState([])
        useEffect(() => {
            setNewdata(blogs.filter((item) => item._id === id))
        }, [id])
        console.log(newdata[0])
        let filterdata = newdata[0]
        console.warn(filterdata)
        return (
            <td className="project_progress">
                {
                    filterdata && (
                        <small>{filterdata.Heading}</small>
                    )
                }
            </td>
        )
    }
    const Categorie = ({ id }) => {
        console.log(category)
        console.log(id)
        const [newcategorydata, setCategoryNewdata] = useState([])
        // const [update, setupdate] = useState([])
        useEffect(() => {
            setCategoryNewdata(category.filter((item) => item._id === id))
        }, [id])
        console.log(newcategorydata[0])
        let filterdata = newcategorydata[0]
        console.warn(filterdata)
        return (
            <td className="project_progress">
                {
                    filterdata && (
                        <small>{filterdata.CategoryName}</small>
                    )
                }
            </td>
        )
    }

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Home</h1>
                        </div>

                    </div>
                </div>
            </section>
            <section className="content">
                <div className="card">
                    <div className="card-header">
                        <h3 className="card-title">Main Khabar</h3>
                        <div class="card-tools">
                            <NavLink to={'/homeview'} className="btn bg-primary btn-sm px-2 py-1">
                                <i className="fas fa-folder me-2"></i>
                                Add Blog
                            </NavLink>
                        </div>
                    </div>
                    <div className="card-body p-0">
                        <table className="table table-striped projects">
                            <thead>
                                <tr>


                                    <th style={{ width: "1%" }}>#</th>
                                    <th style={{ width: "20%" }}> CategoryName</th>
                                    <th style={{ width: "40%" }}>FirstLink</th>

                                    <th style={{ width: "10%" }} className="text-center">
                                        Status
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bannerdata.map((item, key) =>
                                        <tr key={key}>
                                            <td>{key + 1}</td>
                                            <Categorie id={item.CategoryName} />
                                            <News id={item.FirstLink} />

                                            <td className="project-state">
                                                <span className="badge badge-success">active</span>
                                            </td>

                                            <td className="project-actions text-right">

                                                <NavLink to={`/home/${item._id}`} className="btn btn-info btn-sm">
                                                    <i className="fas fa-pencil-alt"></i>

                                                </NavLink>
                                                <NavLink className="btn btn-danger btn-sm ms-2" onClick={() => Delethandler(item._id)}>
                                                    <i className="fas fa-trash"></i>
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