import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useState } from 'react'
// import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'
import Nav from "../../component/nav/Nav"
import Api from "../../Api/Api"
import Select from 'react-select';

const Colors = () => {
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
   
    const getcolor = () => {

        Api('/api/colors').then((response) => {
            setInputs(response[0]);

        })
            .catch((error) => {
                // Handle error
            });
    }


    useEffect(() => {
        getcolor()

    }, [])
    console.warn(inputs)
    async function FormSubmit(event) {

        event.preventDefault();
        console.log(inputs)

        await Api('/api/colors/65df89e7aec0f43ceb6e6681', 'PUT', inputs).then(() => {
            alert("data add successfully")
            navigate('/categories');
        })
        

    }


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
        console.log(inputs)
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


                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Background Color1</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="BackgroundColor1"
                                                                type="color"
                                                                value={inputs.BackgroundColor1}
                                                                style={{minHeight: '150px'}}
                                                                class="form-control"
                                                                placeholder="Enter Your Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Text Color1</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="TextColor1"
                                                                type="color"
                                                                value={inputs.TextColor1}
                                                                style={{minHeight: '150px'}}
                                                                class="form-control"
                                                                placeholder="Enter Your Name"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Background Color2</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="BackgroundColor2"
                                                                type="color"
                                                                value={inputs.BackgroundColor2}
                                                                style={{minHeight: '150px'}}
                                                                class="form-control"
                                                                placeholder="Enter Your Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Text Color2</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="TextColor2"
                                                                type="color"
                                                                value={inputs.TextColor2}
                                                                style={{minHeight: '150px'}}
                                                                class="form-control"
                                                                placeholder="Enter Your Name"
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

export default Colors