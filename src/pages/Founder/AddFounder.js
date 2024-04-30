import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Nav from "../../component/nav/Nav"
import ApiCalls from "../../ApiCalls/ApiCalls"
import { useRef, useMemo } from 'react';

const AddFounder = () => {
    const [image1, setimage1] = useState({})
    
    const [selectedValue, setSelectedValue] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
   
    const [inputs, setInputs] = useState({})


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };


    const SelecthandleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue);
    };

    async function FormSubmit(event) {
        event.preventDefault();
        console.log(inputs);

        const formData = await new FormData();
        formData.append('ReporterName', inputs.reportername);
        formData.append('Designation', inputs.designation);
        formData.append('DatePlace', inputs.place);
        formData.append('Heading', inputs.heading);
        formData.append('Subheading', inputs.subheading);
        formData.append('Image1', image1[0]);

        // formData.append('Matter', content);

        


        let newres = await ApiCalls('founder', 'POST', formData).then(() => {
            alert("data add successfully")
            // navigate('/');
        })

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
        console.log(inputs)
    }



    return (
        <>
            
                    <div className="content-wrapper">
                        <section className="content mt-4">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">Founder</h3>
                                            </div>
                                            <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                                                <div className="card-body">

                                                    <div className="row">
                                                        
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Heading</label>
                                                                <input
                                                                    onChange={handleChange}
                                                                    name="heading"
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter Your Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label for="exampleInputFile">Employee Image</label>
                                                                <div>
                                                                    <input
                                                                        onChange={(e) => setimage1(e.target.files)}
                                                                        name="file"
                                                                        type="file"
                                                                        className="TextArea"
                                                                        id="image"
                                                                        size={60}
                                                                        maxLength={70}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>



                                                    </div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Employee Name</label>
                                                                <input
                                                                    onChange={handleChange}
                                                                    name="Name"
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter Your Designation"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Employee Designation</label>
                                                                <input
                                                                    onChange={handleChange}
                                                                    name="property"
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter Your Date/Place"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Email-Address</label>
                                                                <input
                                                                    onChange={handleChange}
                                                                    name="details"
                                                                    class="form-control"
                                                                    placeholder="Enter Your Heading"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputPassword1">Contact Number</label>
                                                                <input
                                                                    onChange={handleChange}
                                                                    name="details"
                                                                    class="form-control"
                                                                    placeholder="Enter Your Heading"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                                <div className="card-footer">
                                                    <button type="submit" onClick={FormSubmit} className="btn btn-primary">
                                                        Submit
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </section>

                    </div>
               
        </>
    )
}

export default AddFounder