import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import ApiCalls from "../../ApiCalls/ApiCalls"
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Api from "../../Api/Api"

const Rules = () => {


    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [inputs, setInputs] = useState({})

    const getdata = () => {

        ApiCalls(`rules`).then((response) => {
            setInputs(response[0]);
            console.warn(response)
            setContent(response[0].CompleteDetails)
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

       await setInputs({ ...inputs, ['CompleteDetails']: content })

        let newres = await Api(`/api/rules/65f9274e20f9d2761a82aae7`, 'PUT', inputs).then(() => {
            alert("data add successfully")
            // navigate('/');
        })


    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
        console.log(inputs)
    }



    return (
        <>
            <main>
                <div className="wrapper">
                    <div className="content-wrapper">
                        <section className="content mt-4">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card card-primary">
                                            <div className="card-header">
                                                <h3 className="card-title">Niyam Aur Shartain</h3>
                                            </div>
                                            <form onSubmit={FormSubmit}>
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">Heading</label>
                                                                <input
                                                                    onChange={handleChange}
                                                                    name="heading"
                                                                    type="text"
                                                                    value={inputs.heading}
                                                                    class="form-control"
                                                                    placeholder="Enter Your Name"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label for="exampleInputFile">Complete Address</label>
                                                                <JoditEditor
                                                                    ref={editor}
                                                                    value={content}
                                                                    // value={inputs.Matter}
                                                                    // config={config}
                                                                    tabIndex={1} // tabIndex of textarea
                                                                    onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                                                    onChange={newContent => { }}
                                                                    required
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
            <Outlet />
        </>
    )
}

export default Rules