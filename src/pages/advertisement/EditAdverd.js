import React, { useContext, useEffect, useState } from 'react'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate, useParams } from 'react-router-dom'
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Select from 'react-select';
import { ApiContext } from '../../Context/ApiContext';


const EditAdverd = () => {
    const navigate = useNavigate()
    const [image1, setimage1] = useState({})
    const [image2, setimage2] = useState({})
    const [video, setVideo] = useState([])
    const [selectedValue, setSelectedValue] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [selectedcategories, setSelectedcategories] = useState(null);
    const {API} = useContext(ApiContext)

    const params = useParams()
    const { id } = params;


    const categoriesoptions = [
        ...selectedValue.map((item) => ({ value: item.CategoryName, label: item.CategoryName })),
        // Add more options as needed
    ];
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const getdata = () => {

        ApiCalls(`advert?_id=${id}`).then((response) => {
            setInputs(response[0]);
            console.warn(response)
            setImageUrl(`${API}${response[0].Image1}`);
            // const selectedCategories = categoriesoptions.map(option => ({ value: response[0].location, label: response[0].location }));

            setSelectedcategories(response[0].location.map((item) => ({ value: item, label: item })));

            // console.log(response)
        })
            .catch((error) => {
                // Handle error
            });
    }

    useEffect(() => {
        getdata();
    }, [])

    const [inputs, setInputs] = useState({})

    async function FormSubmit(event) {

        event.preventDefault();
        console.log(inputs);
        console.log(isChecked);

        const formData = await new FormData();
        // formData.append('Category', selectedcategories);
        if (inputs.url) {
            formData.append('url', inputs.url);
        }
        formData.append('Image1', image1[0]);
        formData.append('Image2', image2[0]);


        if (selectedcategories) {
            const categeryValues = selectedcategories.map(option => option.value);
            console.warn(categeryValues)
            formData.append('location', JSON.stringify(categeryValues));
        }

        if (selectedcategories.length > 0) {
            selectedcategories.forEach(option => {
                formData.append('selectedValue[]', option.value);
            });
        }


        let newres = await ApiCalls(`advert/${id}`, 'PuT', formData).then(() => {
            alert("data edit successfully")
            // navigate('/');
        })

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
        console.log(inputs)
    }

    const categorieshandleChange = (selectedOption) => {
        setSelectedcategories(selectedOption);
        console.warn(selectedOption)
    };

    useEffect(() => {
        const sectionNames = [
            'top of header',
            'below header',
            'top menu',
            'below menu',
            'below breaking News',
            'below scroll news',
            'left home',
            'right home',
            'top badi khabar',
            'jara idhar bhi top',
            'jara idhar below',
            'khabare rajiyo top',
            'upper vote poll',
            'side mousam news',
            'footer upper',
            'footer main',
            'footer below',
            'copyright upper'
        ];

        const formattedSectionNames = sectionNames.map((item) => ({ CategoryName: item, CategoryName: item }));
        setSelectedValue(formattedSectionNames);
    }, [])

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
                                                                    isMulti
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-md-12">
                                                            <div className="form-group">
                                                                <label htmlFor="exampleInputEmail1">URL</label>
                                                                <input
                                                                    onChange={handleChange}
                                                                    name="url"
                                                                    value={inputs.url}
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
                                                                        onChange={(e) => setimage1(e.target.files[0])}
                                                                        name="file"
                                                                        type="file"
                                                                        className="TextArea"
                                                                        id="reporterimage"
                                                                        size={60}
                                                                        maxLength={70}
                                                                    />
                                                                </div>
                                                            </div>

                                                            {image1 && image1 instanceof Blob ? (
                                                                <img style={{ width: '150px' }} src={URL.createObjectURL(image1)} alt="Local File" />
                                                            ) : (
                                                                imageUrl && <img style={{ width: '150px' }} src={imageUrl} alt="Uploaded" />
                                                            )}

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

                                                        <div className="col-md-12">
                                                            <div class="form-group">
                                                                <label for="exampleInputFile">Video</label>
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
        </>
    )
}

export default EditAdverd