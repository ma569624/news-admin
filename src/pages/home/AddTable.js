import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'
import Nav from "../../component/nav/Nav"


const AddTable = () => {
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    const [image1, setimage1] = useState({})
    const [image2, setimage2] = useState({})
    console.log(image1[0])
    console.log(image2[0])
    async function FormSubmit(event) {

        event.preventDefault();
        console.log(inputs);
        console.log(inputs.file)

        const formData = await new FormData();
        // formData.append('file', inputs.file);
        formData.append('ReporterName', inputs.reportername);
        formData.append('Designation', inputs.designation);
        formData.append('DatePlace', inputs.place);
        formData.append('Heading', inputs.heading);
        formData.append('Subheading', inputs.subheading);
        formData.append('Image1', image1[0]);
        formData.append('Image2', image2[0]);
        formData.append('Matter', inputs.matter);
        // formData.append('file', inputs.file);

        console.log(formData)

        // let result = await fetch('http://localhost:5000/api/shubhkamna', {
        //     method: 'POST',
        //     body: formData,
        // });
        // alert("data has set", result);

        let newres = await ApiCalls('jaraidhar', 'POST', formData).then(() => {
            alert("data add successfully")
            navigate('/jaraidhar');
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
                                            <h3 className="card-title">Home Khabare</h3>
                                        </div>
                                        <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                                            <div className="card-body">

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Name</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="reportername"
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Enter Your Name"
                                                    />
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Date/Place</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="place"
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Enter Your Date/Place"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="exampleInputPassword1">Heading</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="heading"
                                                        class="form-control"
                                                        placeholder="Enter Your Heading"

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
                                                    <textarea class="form-control" onChange={handleChange}
                                                        name="matter" rows="8" placeholder="Enter ..."></textarea>
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

export default AddTable