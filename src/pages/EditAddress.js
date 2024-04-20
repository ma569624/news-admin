import SideNavBar from "../component/sidenav/SideNavBar"
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import ApiCalls from "../ApiCalls/ApiCalls"
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Api from "../Api/Api";


const EditAddress = () => {
    const navigate = useNavigate()
    const [image1, setimage1] = useState({})

    const editor = useRef(null);
    const editor2 = useRef(null);
    const [content, setContent] = useState('');
    const [content2, setContent2] = useState('');
    const [inputs, setInputs] = useState({})

    const getdata = async () => {

        ApiCalls(`address`).then((response) => {
            setInputs(response[0]);
            // console.warn(response[0])
            setContent(response[0].CompleteAddress);
            setContent2(response[0].OtherDetails);
        })
            .catch((error) => {
                // Handle error
            });
    }


    useEffect(() => {
        getdata();
    }, [])
    

    async function FormSubmit(event) {
        event.preventDefault();
        setInputs({ ...inputs, ['CompleteAddress']: content })
        console.warn(inputs);
        
        let newres = await Api(`/api/address/65f921ca41c0560e07a10771`, 'PUT', inputs).then(() => {
            alert("data add successfully")
            // navigate('/');
        })
        // let newres = await ApiCalls('address/65f921ca41c0560e07a10771', 'PUT', inputs).then(() => {
        //     alert("data add successfully")
        //     // navigate('/');
        // })

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
                                                <h3 className="card-title">EDIT HAMARA PATA</h3>
                                            </div>
                                            <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                                                <div className="card-body">

                                                    <div className="row">

                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Heading1</label>
                                                                <input
                                                                    onChange={handleChange}
                                                                    name="heading"
                                                                    value={inputs.heading}
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter Your Name"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label for="exampleInputFile">Complete Address</label>
                                                                <JoditEditor
                                                                    ref={editor}
                                                                    value={content}
                                                                    // value={inputs.Matter}
                                                                    // config={config}
                                                                    tabIndex={1} // tabIndex of textarea
                                                                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                                                    onChange={newContent => { }}
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

export default EditAddress