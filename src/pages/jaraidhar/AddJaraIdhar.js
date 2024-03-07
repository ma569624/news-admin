import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'
import Nav from "../../component/nav/Nav"
import Api from "../../Api/Api"


const AddJaraIdhar = () => {
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    const [image1, setimage1] = useState({})
    console.log(image1[0])


    const [selectedValue, setSelectedValue] = useState([]);
    const [selectedCategorie, setselectedCategorie] = useState([]);

    const getdata = () => {

        ApiCalls('categories').then((response) => {
            setselectedCategorie(response);
            // console.log(response)
        })
            .catch((error) => {
                // Handle error
            });
        ApiCalls('blogs').then((response) => {
            setSelectedValue(response);
            // console.log(response)
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
        console.warn(inputs);
        console.log(inputs.file)


        let newres = await Api('/api/jaraidhar', 'POST', inputs).then(() => {
            alert("data add successfully")
            navigate('/');
        })

        // const formData = await new FormData();
        // formData.append('file', inputs.file);
        // formData.append('ReporterName', inputs.reportername);
        // formData.append('Designation', inputs.designation);
        // formData.append('DatePlace', inputs.place);
        // formData.append('Heading', inputs.heading);
        // formData.append('Subheading', inputs.subheading);
        // formData.append('Image1', image1[0]);
        // formData.append('Image2', image2[0]);
        // formData.append('Matter', inputs.matter);
        // formData.append('file', inputs.file);

        // console.log(formData)

        // let result = await fetch('http://localhost:5000/api/shubhkamna', {
        //     method: 'POST',
        //     body: formData,
        // });
        // alert("data has set", result);

        // let newres = await ApiCalls('jaraidhar', 'POST', formData).then(() => {
        //     alert("data add successfully")
        //     navigate('/jaraidhar');
        // })

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    
    const CategoriesisSelected = () => {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div class="form-group">
                            <label for="exampleSelectRounded0">First Link's Name</label>
                            <select class="custom-select rounded-0" name="FirstLink" value={inputs.FirstLink} id="exampleSelectRounded0" onChange={handleChange}>
                                <option selected disabled>Please Select</option>
                                {
                                    selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div class="form-group">
                            <label for="exampleSelectRounded0">Second Link's Name</label>
                            <select class="custom-select rounded-0" name="SecondLink" value={inputs.SecondLink} id="exampleSelectRounded0" onChange={handleChange}>
                                <option selected disabled>Please Select</option>

                                {
                                    selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">

                        <div class="form-group">
                            <label for="exampleSelectRounded0">Third Link's Name</label>
                            <select class="custom-select rounded-0" name="ThirdLink" value={inputs.ThirdLink} id="exampleSelectRounded0" onChange={handleChange}>
                                <option selected disabled>Please Select</option>
                                {
                                    selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                }
                            </select>
                        </div>

                    </div>
                    <div className="col-md-12">
                        <div class="form-group">
                            <label for="exampleSelectRounded0">Forth Link's Name</label>
                            <select class="custom-select rounded-0" name="ForthLink" value={inputs.ForthLink} id="exampleSelectRounded0" onChange={handleChange}>
                                <option selected disabled>Please Select</option>

                                {
                                    selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div class="form-group">
                            <label for="exampleSelectRounded0">Five Link's Name</label>
                            <select class="custom-select rounded-0" name="FiveLink" value={inputs.FiveLink} id="exampleSelectRounded0" onChange={handleChange}>
                                <option selected disabled>Please Select</option>
                                {
                                    selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>

            </div>
        )
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
                                            <h3 className="card-title">Main</h3>
                                        </div>
                                        <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                                            <div className="card-body">

                                                <div className="form-group">
                                                    <label htmlFor="exampleInputEmail1">Heading</label>
                                                    <input
                                                        onChange={handleChange}
                                                        name="Heading"
                                                        type="text"
                                                        class="form-control"
                                                        placeholder="Enter Your Heading"
                                                    />
                                                </div>

                                               

                                                <CategoriesisSelected />

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h5>Charcha Mai</h5>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">YouTube Link Heading</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="youTubeheading"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter Youtube Link"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">YouTube Link</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="youTubelink"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter Youtube Link"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Mutimedia heading</label>
                                                        <input
                                                            onChange={handleChange}
                                                            name="mutimediaheading"
                                                            type="text"
                                                            class="form-control"
                                                            placeholder="Enter Youtube Link"
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
            </div>


        </main>
    )
}

export default AddJaraIdhar