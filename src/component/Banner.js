import React, { useEffect, useState } from 'react'
import ApiCalls from '../ApiCalls/ApiCalls';
import { Button, Stack, Table, } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Banner = () => {
    const [bannerdata, setbannerdata] = useState([])

    const [id, setid] = useState("");
    const getdata = () => {
        ApiCalls('home/banner').then((response) => {
            setbannerdata(response);
            
        })
            .catch((error) => {
                // Handle error
            });
    }

    useEffect(() => {
        getdata();
        
    }, [])
    console.log(bannerdata);

    const Delethandler = (id) => {
        ApiCalls(`home/banner/${id}`, 'DELETE').then((response) => {
            getdata()
            console.warn('sucessfully delete', id)
        })
            .catch((error) => {

            });

    }
    return (
        <>
            <h4>Banners</h4>
            <Link to={'/form'}><Button variant='primary' className='my-3'>Add New</Button></Link>
            <div className='table-responsive'>
            <div>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Reporter's Image</th>
                        <th>Reporter's Name</th>
                        <th>Designation</th>
                        <th>Date/Place</th>
                        <th>Sub-Heading</th>
                        <th>Image First</th>
                        <th>Image First Caption</th>
                        <th>Image Second</th>
                        <th>Image Second Caption</th>
                        <th>Image Third</th>
                        <th>Image Third Caption</th>
                        <th>Samachar Matter</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bannerdata.map((item, key) =>
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{item.heading}</td>
                                <td>{item.subheading}</td>
                                <td><img src={item.banner} alt="pic" width="80px" /></td>
                                <td>{item.shortdesc}</td>
                                <td>
                                    <Stack direction='horizontal' gap={2}>
                                        <Button variant='primary'>view</Button>
                                        <Link to={`/form/${item._id}`}>
                                            <Button variant='primary'>Edit</Button>
                                        </Link>
                                        <Button variant="danger" onClick={() => Delethandler(item._id)}>Delete</Button>
                                    </Stack>
                                </td>
                            </tr>
                        )

                    }

                </tbody>
            </div>
            </div>
        </>
    )
}

export default Banner
