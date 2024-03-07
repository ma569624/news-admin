import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useState } from 'react'
// import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'
import Nav from "../../component/nav/Nav"
import Api from "../../Api/Api"
import Select from 'react-select';
import UploadModal from "./Model"

const Media = () => {
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
    // console.warn(inputs)
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
        // console.log(inputs)
    }

    return (
        <main>
            <div className="wrapper">

                <div className="content-wrapper">

                    <section className="content pt-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="d-flex gap-2">
                                        <h4>Media Library</h4>
                                        
                                        <UploadModal />
                                    </div>
                                </div>

                            </div>

                            <div className="card card-primary mt-3">
                                <div className="card-header" style={{backgroundColor: 'white'}}>
                                    <label className="text-dark">Search</label>
                                    <input type="text" className="ms-2" placeholder="Seach..." />
                                </div>
                                <div className="card-body">
                                    <div className="row g-3">
                                        <div className="col-md-3">
                                            <img src="https://easywpguide.com/wp-content/uploads/2019/12/media-library-grid.jpg" alt="" className="img-fluid" />
                                        </div>
                                        <div className="col-md-3">
                                            <img src="https://easywpguide.com/wp-content/uploads/2019/12/media-library-grid.jpg" alt="" className="img-fluid" />
                                        </div> <div className="col-md-3">
                                            <img src="https://easywpguide.com/wp-content/uploads/2019/12/media-library-grid.jpg" alt="" className="img-fluid" />
                                        </div>
                                        <div className="col-md-3">
                                            <img src="https://easywpguide.com/wp-content/uploads/2019/12/media-library-grid.jpg" alt="" className="img-fluid" />
                                        </div>
                                        <div className="col-md-3">
                                            <img src="https://easywpguide.com/wp-content/uploads/2019/12/media-library-grid.jpg" alt="" className="img-fluid" />
                                        </div>
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

export default Media