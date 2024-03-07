import React, { useEffect, useRef, useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import ApiCalls from '../../ApiCalls/ApiCalls'
import { useNavigate } from 'react-router-dom'


const From = () => {
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
                    <h4>Add Banner</h4>
                    <Form onSubmit={() => FormSubmit} action="/post" method="POST" encType="multipart/form-data">

                        <Form.Group className="mb-3">
                            <Form.Label>heading</Form.Label>
                            <Form.Control type="text" placeholder="heading" value={inputs.heading || ""} onChange={handleChange} name='heading' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>SubHeading</Form.Label>
                            <Form.Control type="text" placeholder="SubHeading" value={inputs.subheading || ""} onChange={handleChange} name='subheading' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Paragraph</Form.Label>
                            <Form.Control type="text" placeholder="Short desc" value={inputs.shortdesc || ""} onChange={handleChange} name='shortdesc' />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Banner Image</Form.Label>
                            <Form.Control type="file" placeholder="Short desc" onChange={imagehandler} name="file" />
                            {/* <Form.Control type="file" ref={fileInputRef} onChange={imagehandler} name='banner' /> */}
                        </Form.Group>

                        <Button type="submit" onClick={FormSubmit}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default From
