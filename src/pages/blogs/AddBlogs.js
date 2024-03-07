import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Nav from "../../component/nav/Nav"
import ApiCalls from "../../ApiCalls/ApiCalls"
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Select from 'react-select';

const AddBlogs = () => {
    const navigate = useNavigate()
    const [image1, setimage1] = useState({})
    const [image2, setimage2] = useState({})
    const [video, setVideo] = useState([])
    const [audio, setAudio] = useState([])
    const [selectedValue, setSelectedValue] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [blogsSelect, setBlogsSelect] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedcategories, setSelectedcategories] = useState(null);
    const [muti, setMult] = useState([])

    const options = [
        ...muti.map((item) => ({ value: item.link, label: item.name })),
        // Add more options as needed
    ];
    const categoriesoptions = [
        ...selectedValue.map((item) => ({ value: item.CategoryName, label: item.CategoryName })),
        // Add more options as needed
    ];

    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [IsHomevalue, setIsHomevalue] = useState('')
    console.log(IsHomevalue)
    const [inputs, setInputs] = useState({})

    const getdata = () => {
        ApiCalls('categories').then((response) => {
            setSelectedValue(response);
            console.log(response)
        })
            .catch((error) => {
                // Handle error
            });
        ApiCalls('toplinks').then((response) => {
            setMult(response);
            console.log(response)
        })
            .catch((error) => {
                // Handle error
            });
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
        // formData.append('Category', selectedcategories);
        formData.append('StateName', inputs.StateName);
        formData.append('ReporterName', inputs.reportername);
        formData.append('Designation', inputs.designation);
        formData.append('DatePlace', inputs.place);
        formData.append('Heading', inputs.heading);
        formData.append('Capton', inputs.Capton);
        formData.append('Subheading', inputs.subheading);
        formData.append('Image1', image1[0]);
        formData.append('Image2', image2[0]);
        formData.append('Video', video[0]);
        formData.append('Audio', audio[0]);
        formData.append('Matter', content);

        // Serialize the Position field properly
        if (selectedOption) {
            const positionValues = selectedOption.map(option => option.value);
            console.warn(positionValues)
            formData.append('Position', JSON.stringify(positionValues));
        }

        if (selectedValue.length > 0) {
            selectedValue.forEach(option => {
                formData.append('selectedValue[]', option.value);
            });
        }

        if (selectedcategories) {
            const categeryValues = selectedcategories.map(option => option.value);
            console.warn(categeryValues)
            formData.append('Category', JSON.stringify(categeryValues));
        }

        if (selectedcategories.length > 0) {
            selectedcategories.forEach(option => {
                formData.append('selectedValue[]', option.value);
            });
        }


        let newres = await ApiCalls('blogs', 'POST', formData).then(() => {
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
                        <label for="exampleSelectRounded0">New First</label>
                        <select class="custom-select rounded-0" name="newfirst" value={inputs.newfirst} id="exampleSelectRounded0" onChange={handleChange}>
                            {
                                blogsSelect.map((item) => <option value={item._id}>{item.Heading}</option>)
                            }
                        </select>
                    </div>
                </div>
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

    const nhandleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.warn(selectedOption)
    };
    const categorieshandleChange = (selectedOption) => {
        setSelectedcategories(selectedOption);
        console.warn(selectedOption)
    };

    const indianStates = [
        "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
        "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli", "Daman and Diu", "Delhi",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
        "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra",
        "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
        "Uttarakhand", "West Bengal"
    ];
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
                                                <h3 className="card-title">Khabare</h3>
                                            </div>
                                            <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                                                <div className="card-body">

                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label htmlFor="Position">Position Name</label>

                                                                <Select
                                                                    id="selectOption"
                                                                    name="Position" // Adding the name attribute
                                                                    value={selectedOption}
                                                                    onChange={nhandleChange}
                                                                    options={options}
                                                                    isMulti
                                                                />

                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label for="exampleSelectRounded0">Select Rajiya</label>
                                                                <select class="custom-select rounded-0" name="StateName" value={inputs.StateName} id="exampleSelectRounded0" onChange={handleChange}>
                                                                    <option selected disabled>Please Select</option>
                                                                    {indianStates.map(state => (
                                                                        <option key={state} value={state}>{state}</option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label htmlFor="CategoryName">Categorie's Name</label>
                                                                <Select
                                                                    id="selectOption"
                                                                    name="Position" // Adding the name attribute
                                                                    value={selectedcategories}
                                                                    onChange={categorieshandleChange}
                                                                    options={categoriesoptions}
                                                                    isMulti
                                                                />

                                                            </div>
                                                        </div>

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
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputFile">Video</label>
                                                                <div className="input-group">
                                                                    <input
                                                                        onChange={(e) => setVideo(e.target.files)}
                                                                        name="Video"
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
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputFile">Audio</label>
                                                                <div className="input-group">
                                                                    <input
                                                                        onChange={(e) => setAudio(e.target.files)}
                                                                        name="Audio"
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
                                                        {/* <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Tags</label>
                                                            <Select
                                                                id="selectOption"
                                                                name="Position" // Adding the name attribute
                                                                value={selectedcategories}
                                                                onChange={categorieshandleChange}
                                                                options={categoriesoptions}
                                                                isMulti
                                                            />
                                                        </div>
                                                    </div> */}
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
        </>
    )
}

export default AddBlogs