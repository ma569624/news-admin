import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from "../../component/nav/Nav"

const EditTopLinks = () => {
    const [selectedValue, setSelectedValue] = useState([]);

    console.log(selectedValue)

    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    const [data, setdata] = useState([])
    const params = useParams()

    const [id, setid] = useState("");
    const getdata = () => {
        ApiCalls('toplinks').then((response) => {
            setSelectedValue(response);
            console.log(response)
        })
            .catch((error) => {
                // Handle error
            })

        ApiCalls(`toplinks?_id=${params.id}`).then((response) => {
            setInputs(response[0]);
        })
            .catch((error) => {
                // Handle error
            });


    }
    console.log(inputs)
    useEffect(() => {
        getdata();

    }, [])

    async function FormSubmit(event) {

        event.preventDefault();
        console.log(inputs);

        try {
            const response = await fetch(`http://localhost:5000/api/toplinks/${params.id}`, {
                method: 'PUT',
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
            navigate('/top-links')
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
                                                        value={inputs.name}
                                                        class="form-control"
                                                        placeholder="Enter Your Name"
                                                    />
                                                </div>
                                                {/*<div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Links's Name</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="link"
                                                        type="text"
                                                        value={inputs.link}
                                                        class="form-control"
                                                        placeholder="Enter Your Name"
                                                    />
                                                </div>*/}

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

export default EditTopLinks