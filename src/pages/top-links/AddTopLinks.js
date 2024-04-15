import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useRef, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'
import Editor from "../../component/Editor"
import Nav from "../../component/nav/Nav"
import Api from "../../Api/Api"


const AddTopLinks = () => {

   

    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()

    async function FormSubmit(event) {

        event.preventDefault();
        console.log(inputs);

        try {
            const response = await fetch('https://news-backend-production.up.railway.app/api/toplinks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(inputs)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const responseData = await response.json();
            console.log('Data sent successfully:', responseData);
            // navigate('/top-links')
            alert('sucess')
        } catch (error) {
            console.error('Error sending data:', error);
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const imagehandler = (event) => {
        const value = event.target.files[0];
        const name = event.target.name;
        setInputs({ ...inputs, [name]: value })
    }

    return (
        <main>
            <div className="wrapper">


                <div className="content-wrapper">

                    <section className="content mt-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">Top Khabare</h3>
                                        </div>
                                        <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                                            <div className="card-body">

                                                
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Links's Name</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="name"
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Enter Your Name"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Link</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="link"
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Enter Your Designation"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Links's Postion</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="Position"
                                                        type="text"
                                                        value={inputs.Position}
                                                        class="form-control"
                                                        placeholder="Enter Your Postion"
                                                    />
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
            </div>


        </main>
    )
}

export default AddTopLinks