import SideNavBar from "../../component/sidenav/SideNavBar"
import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Nav from "../../component/nav/Nav"
import ApiCalls from "../../ApiCalls/ApiCalls"
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Select from 'react-select';

const AddAdverd = () => {
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
   
    
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    
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
        formData.append('ReporterName', inputs.reportername);
        formData.append('Designation', inputs.designation);
        formData.append('DatePlace', inputs.place);
        formData.append('heading', inputs.heading);
        formData.append('Subheading', inputs.subheading);
        formData.append('Image1', image1[0]);
        formData.append('Image2', image2[0]);
        

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


        let newres = await ApiCalls('advert', 'POST', formData).then(() => {
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


    

    const nhandleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        console.warn(selectedOption)
    };
    const categorieshandleChange = (selectedOption) => {
        setSelectedcategories(selectedOption);
        console.warn(selectedOption)
    };
    

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
                                            <h3 className="card-title">Add Advertisement</h3>
                                        </div>
                                        <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                                            <div className="card-body">

                                                <div className="row">
                                                    
                                                    <div className="col-md-12">
                                                        <div class="form-group">
                                                            <label htmlFor="CategoryName">Locattion</label>
                                                            <Select
                                                                id="selectOption"
                                                                name="Position" // Adding the name attribute
                                                                value={selectedcategories}
                                                                onChange={categorieshandleChange}
                                                                options={categoriesoptions}
                                                            />
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">URL</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="reportername"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter Your Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="col-md-12">
                                                        <div class="form-group">
                                                            <label for="exampleInputFile">Image1</label>
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
                                                        <div class="form-group">
                                                            <label for="exampleInputFile">Image2</label>
                                                            <div>
                                                                <input
                                                                    onChange={(e) => setimage2(e.target.files)}
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

export default AddAdverd