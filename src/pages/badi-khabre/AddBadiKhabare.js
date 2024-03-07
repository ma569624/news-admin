import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'
import Nav from "../../component/nav/Nav"
import Api from "../../Api/Api"


const AddBadiKhabare = () => {

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
    // console.log(selectedValue)
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()

    async function FormSubmit(event) {

        event.preventDefault();
        console.log(inputs);
        // console.log(inputs.file)

        let newres = await Api('/api/badikhabar', 'POST', inputs).then(() => {
            alert("data add successfully")
            navigate('/');
        })

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
                            <label for="exampleSelectRounded0">Heading</label>
                            <input name="reportername" type="text" class="form-control" placeholder="Enter Your Name" fdprocessedid="twpze9"></input>
                        </div>
                    </div>
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
                <div className="row">
                    <div className="col-md-12">
                        <h5>Side View</h5>
                    </div>
                    <div className="col-md-12">
                        <div class="form-group">
                            <label for="exampleSelectRounded0">Heading</label>
                            <input name="reportername" type="text" class="form-control" placeholder="Enter Your Name" fdprocessedid="twpze9"></input>
                        </div>
                    </div>
                    <div className="col-md-12">
                    <div class="form-group">
                        <label for="exampleSelectRounded0">YouTube Video Link</label>
                        <input name="reportername" type="text" class="form-control" placeholder="Enter Your Name" fdprocessedid="twpze9"></input>
                    </div>
                    
                </div>
                </div>
            </div>
        )
    }

    const isFormValid = () => {
        return Object.values(inputs).every(value => value.trim() !== '');
    };
    console.log(isFormValid())

    const CardTable = () => {
        return (
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Khabare</h3>
                </div>
                <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                    <div className="card-body">



                        <CategoriesisSelected />



                    </div>
                    <div className="card-footer">
                        <button type="submit" onClick={FormSubmit} className="btn btn-primary" disabled={!isFormValid()}>
                            Submit
                        </button>
                    </div>
                </form>
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
                                    <CardTable />

                                </div>

                            </div>
                        </div>
                    </section>

                </div>
            </div>


        </main>
    )
}

export default AddBadiKhabare