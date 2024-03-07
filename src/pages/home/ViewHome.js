import React, { useEffect, useState } from 'react'
import SideNavBar from '../../component/sidenav/SideNavBar'
import Nav from '../../component/nav/Nav'
import Table from './Table'
import { NavLink } from 'react-router-dom';
import ApiCalls from '../../ApiCalls/ApiCalls';


const ViewHome = () => {

    const [data, setdata] = useState([])
    const [FirtLink, setFirstLink] = useState([])
    const [SecondLink, setSecondLink] = useState([])
    const [ThirdLink, setThirdLink] = useState([])
    const [FourLink, setFourLink] = useState([])
    const [FiveLink, setFiveLink] = useState([])

    // console.log(categories)
    const [id, setid] = useState("");
    const getdata = () => {
        ApiCalls(`blogs`).then((response) => {
            setdata(response);
        })
            .catch((error) => {
                // Handle error
            });
        ApiCalls(`blogs?Heading=jnjhbhbhbhjhbjh8888`).then((response) => {
            setFirstLink(response[0]);
        })
            .catch((error) => {
                // Handle error
            });
            ApiCalls(`blogs?Heading=jnjhbhbhbhjhbjh8888`).then((response) => {
                setSecondLink(response[1]);
            })
                .catch((error) => {
                    // Handle error
                });
    }


    useEffect(() => {
        getdata();

    }, [])
    console.log(SecondLink);
    return (
        <div className="wrapper">
            <Nav />
            <SideNavBar />
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
                    <p>sfsdf{FirtLink.Heading}</p>

                    <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">Main Khabar</h3>
                            <div class="card-tools">
                                <NavLink to={'/add-home'} className="btn bg-primary btn-sm px-2 py-1">
                                    <i className="fas fa-folder me-2"></i>
                                    Add jaraidhar
                                </NavLink>
                            </div>
                        </div>
                        <div className="card-body p-0 mt-2">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-4">
                                        <img src={FirtLink.Image} alt="sdjbfhdbh" />
                                        <h4>{FirtLink.Heading}</h4>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <img src={SecondLink.Image} style={{maxWidth: '300px'}} alt="sdjbfhdbh" />
                                                <h4>{SecondLink.Heading}</h4>
                                            </div>
                                            <div className="col-md-5">
                                                <img src={FirtLink.Image} alt="sdjbfhdbh" />
                                                <h4>{FirtLink.Heading}</h4>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <img src={FirtLink.Image} alt="sdjbfhdbh" />
                                                <h4>{FirtLink.Heading}</h4>
                                            </div>
                                            <div className="col-md-5">
                                                <img src={FirtLink.Image} alt="sdjbfhdbh" />
                                                <h4>{FirtLink.Heading}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>

        </div>

    )
}

export default ViewHome
