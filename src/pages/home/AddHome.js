import React, { useEffect, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'
import Api from "../../Api/Api"


const AddHome = () => {

    const [selectedValue, setSelectedValue] = useState([]);
    const [selectedCategorie, setselectedCategorie] = useState([]);
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()

    const getdata = () => {

        ApiCalls('categories').then((response) => {
            setselectedCategorie(response);
            // console.log(response)
        })
            .catch((error) => {
                // Handle error
            });
    }

    useEffect(() => {
        getdata();
    }, [])

    // useEffect(() => {
    //     const filteredData = selectedCategorie.filter((item) => item._id === inputs.CategoryName)
    //     console.warn(filteredData[0].CategoryName)
    //     ApiCalls(`blogs?Category=${filteredData[0].CategoryName}`).then((response) => {
    //         setSelectedValue(response);
    //         // console.warn(response)
    //     })
    //         .catch((error) => {
    //             // Handle error
    //         });
    // }, [inputs.CategoryName])

    // console.log(selectedValue)

    async function FormSubmit(event) {
        event.preventDefault();
        console.log(inputs);
        // console.log(inputs.file)
        let newres = await Api('/api/blogdisplay', 'POST', inputs).then(() => {
            alert("data add successfully")
            navigate('/');
        })

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })

        // Assuming you want to filter based on the selected category
        if (name === "CategoryName") {
            const filteredData = selectedCategorie.filter((item) => item._id === value);
            if (filteredData.length > 0) {
                const categoryName = filteredData[0].CategoryName;
                ApiCalls(`blogs?Category=${categoryName}`).then((response) => {
                    setSelectedValue(response);
                }).catch((error) => {
                    // Handle error
                });
            }
        }
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
                <div className="row">
                    <div className="col-md-12">
                        <h5>Charcha Mai</h5>
                    </div>
                    <div className="col-md-12">
                        <div class="form-group">
                            <label for="exampleSelectRounded0">First News</label>
                            <select class="custom-select rounded-0" name="New1" value={inputs.New1} id="exampleSelectRounded0" onChange={handleChange}>
                                <option selected disabled>Please Select</option>

                                {
                                    selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div class="form-group">
                            <label for="exampleSelectRounded0">Second News</label>
                            <select class="custom-select rounded-0" name="New2" value={inputs.New2} id="exampleSelectRounded0" onChange={handleChange}>
                                <option selected disabled>Please Select</option>

                                {
                                    selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">

                        <div class="form-group">
                            <label for="exampleSelectRounded0">Third News</label>
                            <select class="custom-select rounded-0" name="New3" value={inputs.New3} id="exampleSelectRounded0" onChange={handleChange}>
                                <option selected disabled>Please Select</option>

                                {
                                    selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                }
                            </select>
                        </div>

                    </div>
                    <div className="col-md-12">

                        <div class="form-group">
                            <label for="exampleSelectRounded0">Forth News</label>
                            <select class="custom-select rounded-0" name="New4" value={inputs.New4} id="exampleSelectRounded0" onChange={handleChange}>
                                <option selected disabled>Please Select</option>

                                {
                                    selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                }
                            </select>
                        </div>

                    </div>
                    <div className="col-md-12">
                        <div class="form-group">
                            <label for="exampleSelectRounded0">Fifth News</label>
                            <select class="custom-select rounded-0" name="New5" value={inputs.New5} id="exampleSelectRounded0" onChange={handleChange}>
                                <option selected disabled>Please Select</option>

                                {
                                    selectedValue.map((item) => <option value={item._id}>{item.Heading}</option>)
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div class="form-group">
                            <label for="exampleSelectRounded0">Six News</label>
                            <select class="custom-select rounded-0" name="New6" value={inputs.New6} id="exampleSelectRounded0" onChange={handleChange}>
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

    const isFormValid = () => {
        return Object.values(inputs).every(value => value.trim() !== '');
    };
    console.log(isFormValid())

    const CardTable = () => {
        return (
            <div className="card card-primary">
                <div className="card-header">
                    <h3 className="card-title">Add Blog</h3>
                </div>
                <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                    <div className="card-body">

                        <div className="row">
                            <div className="col-md-12">
                                <div class="form-group">
                                    <label for="exampleSelectRounded0">Categorie's Name</label>
                                    <select class="custom-select rounded-0" name="CategoryName" value={inputs.CategoryName} id="exampleSelectRounded0" onChange={handleChange}>
                                        <option selected disabled>Please Select</option>
                                        {
                                            selectedCategorie.map((item) => <option value={item._id}>{item.CategoryName}</option>)
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        {inputs.CategoryName && (<CategoriesisSelected />)}

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

export default AddHome