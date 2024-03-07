import React, { useEffect, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Select from 'react-select';


const EditRashiFal = () => {
    const params = useParams()
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [IsHomevalue, setIsHomevalue] = useState('')
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedcategories, setSelectedcategories] = useState([]);
    const [video, setVideo] = useState([])
    const [audio, setAudio] = useState([])

    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    const [image1, setimage1] = useState({})
    const [image2, setimage2] = useState({})
    const [selectedValue, setSelectedValue] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [blogsSelect, setBlogsSelect] = useState([])
    const [muti, setMult] = useState([])

    const options = [
        ...muti.map((item) => ({ value: item.link, label: item.name })),
    ];

    const categoriesoptions = [
        ...selectedValue.map((item) => ({ value: item.CategoryName, label: item.CategoryName })),
    ];

    const [selectedPostionArray, setSelectedPostionArray] = useState([]);
    const [selectedCategoryArray, setSelectedCategoryArray] = useState([]);

    // Run the effect whenever 'muti' changes

    const getdata = async () => {

        ApiCalls(`rashifal?_id=${params.id}`).then((response) => {
            setInputs(response[0]);
            const Category = JSON.parse(response[0].Category);
            const position = JSON.parse(response[0].Position[0]);
            console.warn(Category);
            setSelectedPostionArray(position);
            setSelectedCategoryArray(Category)

            const res = Category.forEach((val) => ({ value: val, label: val }))
            // console.warn(res);


            // Check if position is an array before joining
            if (Array.isArray(position)) {
                // Using Array.join()
                const singleValue = position.join(', '); // Joins array elements into a single string separated by ', '
                console.log(singleValue);
                // setSelectedValue(singleValue)
            } else {
                console.log('position is not an array');
            }

            setContent(response[0].Matter);
        })
            .catch((error) => {
                // Handle error
            });
        ApiCalls('categories').then((response) => {
            setSelectedValue(response);
            // console.log(response)
        })
            .catch((error) => {
                // Handle error
            });
        ApiCalls('toplinks').then((response) => {
            setMult(response);
            // console.log(response)
        })
            .catch((error) => {
                // Handle error
            });
        ApiCalls('blogs').then((response) => {
            setBlogsSelect(response);
            // console.log(response)
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

    useEffect(() => {

        // Perform filtering and mapping operations
        const filteredOptions = muti.filter(item => selectedPostionArray.includes(item.link))
            .map(item => ({ value: item.link, label: item.name }));
        console.warn(filteredOptions)
        // Update the state with the filtered options
        // setSelectedCategoriesArray(filteredOptions);
        setSelectedOption(filteredOptions);
    }, [muti]);

    useEffect(() => {

        // Perform filtering and mapping operations
        const filteredOptions = selectedValue.filter(item => selectedCategoryArray.includes(item.CategoryName))
            .map(item => ({ value: item.CategoryName, label: item.CategoryName }));
        console.warn(filteredOptions)
        setSelectedcategories(filteredOptions)
        // setSelectedOption(filteredOptions);
    }, [selectedValue]);



    const SelecthandleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    async function FormSubmit(event) {
        event.preventDefault();

        const formData = await new FormData();
        formData.append('ReporterName', inputs.ReporterName);
        formData.append('Designation', inputs.Designation);
        formData.append('DatePlace', inputs.DatePlace);
        formData.append('Heading', inputs.Heading);
        formData.append('Subheading', inputs.Subheading);
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


        let newres = await ApiCalls(`rashifal/${params.id}`, 'PUT', formData).then(() => {
            alert("data add successfully")
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
        console.warn(selectedcategories)

    };

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
                                            <h3 className="card-title">Edit Khabar</h3>
                                        </div>
                                        <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                                            <div className="card-body">

                                                <div className="row">

                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputEmail1">Heading</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="heading"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter Your Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div class="form-group">
                                                            <label for="exampleInputFile">Image</label>
                                                            <div>
                                                                <input
                                                                    onChange={(e) => setimage1(e.target.files)}
                                                                    name="file"
                                                                    type="file"
                                                                    className="TextArea"
                                                                    id="image"
                                                                    size={60}
                                                                    maxLength={70}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Name</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="Name"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter Your Designation"
                                                                required
                                                            />
                                                        </div></div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Property</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="property"
                                                                type="text"
                                                                class="form-control"
                                                                placeholder="Enter Your Date/Place"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="exampleInputPassword1">Details</label>
                                                            <input
                                                                onChange={handleChange}
                                                                name="details"
                                                                class="form-control"
                                                                placeholder="Enter Your Heading"
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
    )
}

export default EditRashiFal