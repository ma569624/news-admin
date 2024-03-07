import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'
import SideNav from '../sidenav/SideNav'


const AddShubhkamnaLinks = () => {
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()
    const [image1, setimage1] = useState({})
    const [image2, setimage2] = useState({})
    console.log(image1[0])
    console.log(image2[0])
    async function FormSubmit(event) {

        event.preventDefault();
        console.log(inputs);
        console.log(inputs.file)

        const formData = await new FormData();
        // formData.append('file', inputs.file);
        formData.append('ReporterName', inputs.reportername);
        formData.append('Designation', inputs.designation);
        formData.append('DatePlace', inputs.place);
        formData.append('Heading', inputs.heading);
        formData.append('Subheading', inputs.subheading);
        formData.append('Image1', image1[0]);
        formData.append('Image2', image2[0]);
        formData.append('Matter', inputs.matter);
        // formData.append('file', inputs.file);

        console.log(formData)

        // let result = await fetch('http://localhost:5000/api/shubhkamna', {
        //     method: 'POST',
        //     body: formData,
        // });
        // alert("data has set", result);

        let newres = await ApiCalls('shubhkamna', 'POST', formData).then(() => {
            alert("data add successfully")
            navigate('/');
        })


    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const imagehandler = (event) => {
        const value = event.target.files[0];
        const name = event.target.name;
        setInputs({ ...inputs, [name]: value })
    }

    return (
        <Container fluid className='g-0'>
            <Row>
                <Col lg='2'>
                <SideNav />
                </Col>
                <Col lg='10'>
                    <div className="bg-dark mt-2"><h4 className='text-white p-2 text-center'>ADD SHUBHKAMNA SANDESH LINKS 2</h4></div>
                    <form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">
                        <table
                            width={700}
                            height={780}
                            border={0}
                            align="center"
                            cellPadding={5}
                            cellSpacing={3}
                            className="table"
                            style={{ borderStyle: "solid" }}
                        >
                            {/* <thead className="thead">
                                <tr className="thead">
                                    <td height={29} colSpan={3}>
                                        <div align="center">ADD SHUBHKAMNA SANDESH LINKS</div>
                                    </td>
                                </tr>
                            </thead> */}
                            <tbody>
                                <tr>
                                    <td height={33} className="Label">
                                        <div align="left">Reporter Image</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
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
                                    </td>
                                </tr>

                                <tr>
                                    <td width={183} height={21} className="Label">
                                        <div align="left">Reporter's Name</div>
                                    </td>
                                    <td width={474} colSpan={2}>
                                        <div align="left">
                                            <input
                                                onChange={handleChange}
                                                name="reportername"
                                                type="text"
                                                className="TextField"
                                                id="reportername"
                                                tabIndex={2}
                                                size={75}
                                                maxLength={55}
                                                fdprocessedid="54omg"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Designation</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                onChange={handleChange}
                                                name="designation"
                                                type="text"
                                                className="TextField"
                                                id="designation"
                                                tabIndex={3}
                                                size={75}
                                                maxLength={75}
                                                fdprocessedid="grqzbc"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Date/Place</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                onChange={handleChange}
                                                name="place"
                                                type="text"
                                                className="TextArea"
                                                id="place"
                                                size={75}
                                                maxLength={75}
                                                fdprocessedid="0lz1qc"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={43} valign="top" className="Label">
                                        <div align="left">Heading</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                onChange={handleChange}
                                                name="heading"
                                                size={75}
                                                maxLength={200}
                                                className="TextArea"
                                                id="heading"
                                                tabIndex={4}
                                                defaultValue={""}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Sub-heading</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                onChange={handleChange}
                                                name="subheading"
                                                type="text"
                                                className="TextArea"
                                                id="subheading"
                                                size={75}
                                                maxLength={200}
                                                fdprocessedid="kq72dm"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={33} className="Label">
                                        <div align="left">Image First</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                onChange={(e) => setimage2(e.target.files)}
                                                name="file"
                                                type="file"
                                                className="TextField"
                                                id="imagefirst"
                                                size={60}
                                                maxLength={60}
                                            />
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td height={78} valign="top" className="Label">
                                        <div align="left">Matter</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <textarea
                                                onChange={handleChange}
                                                name="matter"
                                                cols={70}
                                                rows={5}
                                                className="TextArea"
                                                id="matter"
                                                // style={{ display: "none" }}
                                                defaultValue={""}
                                            />

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={23} colSpan={3}>
                                        <div align="center">
                                            <Button type="submit" onClick={FormSubmit}>Submit</Button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>


                    {/* <Form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">

                        <Form.Group className="mb-3">
                            <Form.Label>Reporter's Image</Form.Label>
                            <Form.Control type="text" placeholder="heading" value={inputs.heading || ""} onChange={handleChange} name='heading' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Reporter's Name</Form.Label>
                            <Form.Control type="text" placeholder="SubHeading" value={inputs.subheading || ""} onChange={handleChange} name='subheading' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Designation</Form.Label>
                            <Form.Control type="text" placeholder="Short desc" value={inputs.shortdesc || ""} onChange={handleChange} name='shortdesc' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Banner Image</Form.Label>
                            <Form.Control type="file" placeholder="Short desc" onChange={imagehandler} name="file" />
                        </Form.Group>

                        <Button type="submit" onClick={FormSubmit}>Submit</Button>
                    </Form> */}
                </Col>
            </Row>
        </Container>
    )
}

export default AddShubhkamnaLinks
