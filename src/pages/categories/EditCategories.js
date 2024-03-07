import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from "../../component/nav/Nav"
import Api from "../../Api/Api"

const EditCategories = () => {

    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    

    const params = useParams()
    console.log(params.id)
    const getdata = () => {
        ApiCalls(`categories?_id=${params.id}`).then((response) => {
            setInputs(response[0]);
        })
            .catch((error) => {
                // Handle error
            });
    }
    console.log(inputs.CategoryName)
    useEffect(() => {
        getdata();

    }, [])
    console.log(inputs);
    async function FormSubmit(event) {

        event.preventDefault();
        console.log(inputs);

        let newres = await Api(`/api/categories/${params.id}`, 'PUT', inputs).then(() => {
            alert("data add successfully")
            navigate('/categories');
        })

        

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
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
                                                <label htmlFor="exampleInputEmail1">Categorie Name</label>
                                                <input
                                                    onChange={handleChange}
                                                    name="CategoryName"
                                                    type="text"
                                                    value={inputs.CategoryName}
                                                    class="form-control"
                                                    placeholder="Enter Your Name"
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

export default EditCategories