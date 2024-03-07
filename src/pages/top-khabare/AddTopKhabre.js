import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from "../../component/nav/Nav"
import ApiCalls from "../../ApiCalls/ApiCalls"
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const AddTopKhabre = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [IsHomevalue, setIsHomevalue] = useState('')
    console.log(IsHomevalue)
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    const [image1, setimage1] = useState({})
    const [image2, setimage2] = useState({})
    const [selectedValue, setSelectedValue] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [blogsSelect, setBlogsSelect] = useState([])
    const getdata = () => {
        ApiCalls('blogs').then((response) => {
            setBlogsSelect(response);
            console.log(response)
        })
            .catch((error) => {
                // Handle error
            });
    }
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    useEffect(() => {
        getdata();

    }, [])
    console.log(selectedValue)
    const SelecthandleChange = (event) => {
        setSelectedValue(event.target.value);
        console.log(selectedValue);
    };

    async function FormSubmit(event) {

        event.preventDefault();
        console.log(inputs);
        console.log(isChecked);
        const formData = await new FormData();
        formData.append('Category', inputs.CategoryName);
        formData.append('ReporterName', inputs.reportername);
        formData.append('Designation', inputs.designation);
        formData.append('DatePlace', inputs.place);
        formData.append('Heading', inputs.heading);
        formData.append('Subheading', inputs.subheading);
        formData.append('Image1', image1[0]);
        formData.append('Image2', image2[0]);
        formData.append('Matter', content);
        formData.append('home', isChecked);
        formData.append('new1', inputs.newfirst);
        formData.append('new2', inputs.newsecond);
        formData.append('new3', inputs.newthird);
        formData.append('new4', inputs.newfour);
        

        let newres = await ApiCalls('shubhkamna', 'POST', formData).then(() => {
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

    
    const IsHome = () => {

        return (
            <div className="row">
                
                <div className="col-md-3">
                    <div class="form-group">
                        <label for="exampleSelectRounded0">New Second</label>
                        <select class="custom-select rounded-0" name="newsecond" value={inputs.newsecond} id="exampleSelectRounded0" onChange={handleChange}>
                            {
                                blogsSelect.map((item) => <option value={item._id}>{item.Heading}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div class="form-group">
                        <label for="exampleSelectRounded0">New Third</label>
                        <select class="custom-select rounded-0" name="newthird" value={inputs.newthird} id="exampleSelectRounded0" onChange={handleChange}>
                            {
                                blogsSelect.map((item) => <option value={item._id}>{item.Heading}</option>)
                            }
                        </select>
                    </div>
                </div>
                <div className="col-md-3">
                    <div class="form-group">
                        <label for="exampleSelectRounded0">New Four</label>
                        <select class="custom-select rounded-0" name="newfour" value={inputs.newfour} id="exampleSelectRounded0" onChange={handleChange}>
                            {
                                blogsSelect.map((item) => <option value={item._id}>{item.Heading}</option>)
                            }
                        </select>
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
                                            <h3 className="card-title">Top Khabare</h3>
                                        </div>
                                        <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                                            <div className="card-body">

                                                <div className="row">
                                                    
                                                    <div className="col-md-12">
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
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Reporter's Name</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="reportername"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter Your Name"
                                                            />
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Designation</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="designation"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter Your Designation"
                                                                required
                                                            />
                                                        </div></div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Date/Place</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="place"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter Your Date/Place"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Heading</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="heading"
                                                                class="form-control"
                                                                placeholder="Enter Your Heading"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Sub-heading</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="subheading"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter Your subheading"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4">
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
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Capton</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="Capton"
                                                                class="form-control"
                                                                placeholder="Enter Your Heading"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>


                                                <div class="form-group">
                                                   
                                                    <label>Editor</label>
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
                                                <div className="row my-3">
                                                    <div className="col-md-12"><div class="form-check">
                                                        <input class="form-check-input" type="checkbox"
                                                            checked={isChecked}
                                                            onChange={handleCheckboxChange}
                                                            name="IsHome" id="flexCheckDefault" />
                                                        <label class="form-check-label" for="flexCheckDefault">
                                                            Home
                                                        </label>
                                                    </div>
                                                    </div>
                                                </div>
                                                {isChecked && (
                                                    <IsHome />
                                                )}
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

export default AddTopKhabre