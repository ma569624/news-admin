import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'


const AddKhas = () => {
    const [inputs, setInputs] = useState({})
    const navigate = useNavigate()


    async function FormSubmit(event) {

        event.preventDefault();

        console.log(inputs.file)

        const formData = await new FormData();
        formData.append('heading', inputs.heading);
        formData.append('subheading', inputs.subheading);
        formData.append('shortdesc', inputs.shortdesc);
        formData.append('file', inputs.file);

        console.log(formData)

        // let result = await fetch('http://localhost:5000/api/home/banner', {
        //     method: 'POST',
        //     body: formData,
        // });
        // alert("data has set", result);

        let newres = await ApiCalls('home/banner', 'POST', formData).then(() => {
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
        <Container>
            <Row>
                <Col lg='12'>
                    <div className="bg-dark mt-2"><h4 className='text-white p-2 text-center'>ADD KHAS KHABRAIN</h4></div>
                    <form
                        name="sform"
                        id="sform"
                        method="post"
                        encType="multipart/form-data"
                        action="./SaveKhasKhabar"
                    >
                        <table
                            width={700}
                            height={666}
                            border={0}
                            align="center"
                            cellPadding={5}
                            cellSpacing={5}
                            className="table"
                        >
                            <tbody>

                                <tr>
                                    <td width={178} height={33} className="Label">
                                        <div align="left">Reporter's Image</div>
                                    </td>
                                    <td colSpan={2}>
                                        <div align="left">
                                            <input
                                                name="reporterimage"
                                                type="file"
                                                className="TextField"
                                                id="reporterimage"
                                                size={60}
                                                maxLength={70}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Reporter's Name</div>
                                    </td>
                                    <td colSpan={2} className="TextField">
                                        <div align="left">
                                            <input
                                                name="reportername"
                                                type="text"
                                                className="TextField"
                                                id="reportername"
                                                size={75}
                                                maxLength={75}
                                                fdprocessedid="mrysx8"
                                            />
                                        </div>{" "}
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left"> Designation</div>
                                    </td>
                                    <td colSpan={2} className="TextField">
                                        <div align="left">
                                            <input
                                                name="designation"
                                                type="text"
                                                className="TextField"
                                                id="designation"
                                                size={75}
                                                maxLength={75}
                                                fdprocessedid="1tqxgc"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Date/Place</div>
                                    </td>
                                    <td colSpan={2} className="TextField">
                                        <div align="left">
                                            <input
                                                name="place"
                                                type="text"
                                                className="TextField"
                                                id="place"
                                                size={75}
                                                maxLength={75}
                                                fdprocessedid="q4818j"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={43} valign="top" className="Label">
                                        <div align="left">Khas Khabar Title</div>
                                    </td>
                                    <td colSpan={2} className="TextField">
                                        <div align="left">
                                            <input
                                                name="subheading"
                                                type="text"
                                                className="TextField"
                                                id="subheading"
                                                size={75}
                                                maxLength={150}
                                                fdprocessedid="619dbd"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Subheading</div>
                                    </td>
                                    <td colSpan={2} className="TextField">
                                        <div align="left">
                                            <input
                                                name="subheading"
                                                type="text"
                                                className="TextField"
                                                id="subheading"
                                                size={75}
                                                maxLength={150}
                                                fdprocessedid="619dbd"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={33} className="Label">
                                        <div align="left"> Image First</div>
                                    </td>
                                    <td colSpan={2} className="TextField">
                                        <div align="left">
                                            <input
                                                name="khaskhabarimagefirst"
                                                type="file"
                                                className="TextField"
                                                id="khaskhabarimagefirst"
                                                size={60}
                                                maxLength={70}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="Label">
                                        <div align="left">Image First Caption</div>
                                    </td>
                                    <td colSpan={2} className="TextField">
                                        <div align="left">
                                            <input
                                                name="caption2"
                                                type="text"
                                                className="TextField"
                                                id="caption2"
                                                size={75}
                                                maxLength={150}
                                                fdprocessedid="wzt9rh"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={33} className="Label">
                                        <div align="left"> Image Second</div>
                                    </td>
                                    <td colSpan={2} className="TextField">
                                        <div align="left">
                                            <input
                                                name="khaskhabarimagesecond"
                                                type="file"
                                                className="TextField"
                                                id="khaskhabarimagesecond"
                                                size={60}
                                                maxLength={70}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Image Second Caption</div>
                                    </td>
                                    <td colSpan={2} className="TextField">
                                        <div align="left">
                                            <input
                                                name="caption3"
                                                type="text"
                                                className="TextField"
                                                id="caption3"
                                                size={75}
                                                maxLength={150}
                                                fdprocessedid="b6ntf"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={33} className="Label">
                                        <div align="left"> Image Third</div>
                                    </td>
                                    <td colSpan={2} className="TextField">
                                        <div align="left">
                                            <input
                                                name="khaskhabarimagethird"
                                                type="file"
                                                className="TextField"
                                                id="khaskhabarimagethird"
                                                size={60}
                                                maxLength={70}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={31} className="Label">
                                        <div align="left">Image Third Caption</div>
                                    </td>
                                    <td colSpan={2} className="TextField">
                                        <div align="left">
                                            <input
                                                name="caption4"
                                                type="text"
                                                className="TextField"
                                                id="caption4"
                                                size={75}
                                                maxLength={150}
                                                fdprocessedid="2amaj9"
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={29} className="Label">
                                        &nbsp;
                                    </td>
                                    <td colSpan={2} className="Label">
                                        *Please Press the Enter Key after every Paragraph
                                    </td>
                                </tr>
                                <tr>
                                    <td height={88} valign="top" className="Label">
                                        <div align="left">Khas Khabar Description</div>
                                    </td>
                                    <td>
                                        <textarea name="" id="" cols="75" rows="10"></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td height={33} colSpan={3}>
                                        <div align="center">
                                            <input
                                                name="save"
                                                type="submit"
                                                className="Button"
                                                id="save"
                                                defaultValue="Submit"
                                                fdprocessedid="wbg7a"
                                            />
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

export default AddKhas
