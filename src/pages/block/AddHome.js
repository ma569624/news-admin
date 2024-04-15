import React, { useEffect, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'
import Api from "../../Api/Api"


const AddHome = () => {

    const [inputs, setInputs] = useState({})
    const [image1, setimage1] = useState({})
    const [image2, setimage2] = useState({})

    

    async function FormSubmit(event) {

        event.preventDefault();
        console.log(inputs);

        const formData = await new FormData();

        // if (inputs.name && inputs.name.length > 0) {
        formData.append('SectionName', inputs.SectionName);
        // }
        formData.append('SecondSection', inputs.SecondSection);


        if (inputs.background1) {
            formData.append('background1', inputs.background1);
        }
        
        // Check if 'inputs.background2' exists
        if (inputs.background2) {
            formData.append('background2', inputs.background2);
        }
        
        // Check if 'image1' array has data
        if (image1.length > 0) {
            formData.append('Image1', image1[0]);
        }
        
        // Check if 'image2' array has data
        if (image2.length > 0) {
            formData.append('Image2', image2[0]);
        }

        let newres = await ApiCalls(`blogdisplay`, 'POST', formData).then(() => {
            alert("data add successfully")
        })
        
        // try {
        //     const response = await fetch(`https://news-backend-production.up.railway.app/api/blogdisplay/${params.id}`, {
        //         method: 'PUT',
        //         body: formData // Pass the FormData object directly
        //     });

        //     if (!response.ok) {
        //         throw new Error('Network response was not ok');
        //     }

        //     const responseData = await response.json();
        //     console.log('Data sent successfully:', responseData);
        //     alert("data add successfully")
        //     // navigate('/top-links')
        // } catch (error) {
        //     console.error('Error sending data:', error);
        // }

        // let newres = await Api(`/api/blogdisplay/${id}`, 'PUT', inputs).then(() => {
        //     alert("data add successfully")
        //     // navigate('/');
        // })


    }

    const handleChange = (event) => {

        const name = event.target.name;
        const value = event.target.value;
        const checked = event.target.checked;
        setInputs({ ...inputs, [name]: value })

        if (name === "isHeader") {
            setInputs({ ...inputs, [name]: checked }); // Update the checkbox state only if its name is "isHeader"
        }
        // console.warn(inputs)
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
                                            <h3 className="card-title">Add Blog</h3>
                                        </div>
                                        <form onSubmit={() => FormSubmit} >

                                            <div className="card-body">

                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div class="form-group">
                                                            <label>Section Name</label>
                                                            <input
                                                                name='SectionName'
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter Your Section Name"
                                                                onChange={handleChange}
                                                                value={inputs.SectionName}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Background Color change</label>
                                                        <input
                                                            onChange={handleChange}
                                                            name="background1"
                                                            type="color"
                                                            style={{maxWidth: '99px'}}
                                                            value={inputs.background1}
                                                            class="form-control"
                                                            placeholder="Enter Your Name"
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="exampleInputEmail1">Select A logo</label>

                                                        <input
                                                            onChange={(e) => setimage1(e.target.files)}
                                                            name="file"
                                                            type="file"
                                                            class="form-control"
                                                            placeholder="Enter Your Name"
                                                            id="reporterimage"
                                                            size={60}
                                                            maxLength={70}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                   
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <h5>other</h5>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label for="exampleSelectRounded0">Section Name</label>
                                                                <input
                                                                    name="SecondSection"
                                                                    type="text"
                                                                    class="form-control"
                                                                    placeholder="Enter Your Section Name"
                                                                    onChange={handleChange}
                                                                    value={inputs.SecondSection}
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div class="form-check">
                                                                <input type="checkbox"
                                                                    name="isHeader"
                                                                    onChange={handleChange}
                                                                    value={inputs.isHeader}
                                                                    checked={inputs.isHeader}
                                                                    class="form-check-input"
                                                                    id="exampleCheck1" />
                                                                <label for="exampleCheck1">Menu</label>
                                                            </div>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Background Color change</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="background2"
                                                                type="color"
                                                                style={{maxWidth: '99px'}}
                                                                value={inputs.background2}
                                                                class="form-control"
                                                                placeholder="Enter Your Name"
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Select A logo</label>

                                                            <input
                                                                onChange={(e) => setimage2(e.target.files)}
                                                                name="file"
                                                                type="file"
                                                                class="form-control"
                                                                placeholder="Enter Your Name"
                                                                id="reporterimage"
                                                                size={60}
                                                                maxLength={70}
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

export default AddHome