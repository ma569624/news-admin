import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate, useParams } from 'react-router-dom'
import Editor from "../../component/editor/Editor"
import Nav from "../../component/nav/Nav"

const EditBadiKhabare = () => {

    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    const [image1, setimage1] = useState({})
    const [image2, setimage2] = useState({})
    const params = useParams()
    console.log(params.id)
    const getdata = () => {
        ApiCalls(`badikhabar?_id=${params.id}`).then((response) => {
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
    console.log(inputs);
    async function FormSubmit(event) {

        event.preventDefault();
        console.log(inputs);
        console.log(inputs.file)

        const formData = await new FormData();
        // formData.append('file', inputs.file);
        formData.append('ReporterName', inputs.ReporterName);
        formData.append('Designation', inputs.Designation);
        formData.append('DatePlace', inputs.DatePlace);
        formData.append('Heading', inputs.Heading);
        formData.append('Subheading', inputs.Subheading);
        // formData.append('Image1', image1[0]);
        // formData.append('Image2', image2[0]);
        formData.append('Matter', inputs.Matter);
        // formData.append('file', inputs.file);

        console.log(formData)

        // let result = await fetch('http://localhost:5000/api/shubhkamna', {
        //     method: 'POST',
        //     body: formData,
        // });
        // alert("data has set", result);

        let newres = await ApiCalls(`badikhabar/${params.id}`, 'PUT', formData).then(() => {
            alert("data add successfully")
            navigate('/badi-khabar');
        })

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

                <Nav />
                <SideNavBar />


                <div className="content-wrapper">


                    <section className="content mt-4">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="card card-primary">
                                        <div className="card-header">
                                            <h3 className="card-title">Edit Khabare</h3>
                                        </div>
                                        <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                                            <div className="card-body">
                                                <div class="form-group">
                                                    <label for="exampleInputFile">Reporter Image</label>
                                                    <div>
                                                        <input
                                                            onChange={(e) => setimage1(e.target.files)}
                                                            name="file"
                                                            type="file"
                                                            className="TextArea"
                                                            id="reporterimage"
                                                            size={60}
                                                            maxLength={70}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Reporter's Name</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="ReporterName"
                                                        type="text"
                                                        value={inputs.ReporterName}
                                                        class="form-control"
                                                        placeholder="Enter Your Name"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Designation</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="Designation"
                                                        type="text"
                                                        value={inputs.Designation}
                                                        class="form-control"
                                                        placeholder="Enter Your Designation"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Date/Place</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="DatePlace"
                                                        type="text"
                                                        value={inputs.DatePlace}
                                                        class="form-control"
                                                        placeholder="Enter Your Date/Place"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Heading</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="Heading"
                                                        value={inputs.Heading}
                                                        class="form-control"
                                                        placeholder="Enter Your Heading"

                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Sub-heading</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="Subheading"
                                                        type="text"
                                                        value={inputs.Subheading}
                                                        class="form-control"
                                                        placeholder="Enter Your subheading"

                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputFile">Image</label>
                                                    <div className="input-group">
                                                        <input
                                                            onChange={(e) => setimage2(e.target.files)}
                                                            name="file"
                                                            type="file"
                                                            className="TextField"
                                                            id="imagefirst"
                                                            size={60}
                                                            maxLength={60}
                                                        />
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label>Matter</label>
                                                    <textarea class="form-control" onChange={handleChange} value={inputs.Matter}
                                                        name="Matter" rows="8" placeholder="Enter ..."></textarea>
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

export default EditBadiKhabare