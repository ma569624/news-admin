import React, { useEffect, useState } from 'react'
import ApiCalls from './../../ApiCalls/ApiCalls';
import { Button, Stack, Table, } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const Shubh = () => {
    const [bannerdata, setbannerdata] = useState([])

    const [id, setid] = useState("");
    const getdata = () => {
        ApiCalls('shubhkamna').then((response) => {
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
        ApiCalls(`shubhkamna/${id}`, 'DELETE').then((response) => {
            getdata()
            console.warn('sucessfully delete', id)
        })
            .catch((error) => {

            });

    }
    return (
        <>
            <div className="bg-dark mt-2"><h4 className='text-white p-2 text-center'>SHUBHKAMNA SANDESH Manger</h4></div>
            <Link to={'/addshubh'}><Button variant='primary' className='my-3'>Add Shubhkamna</Button></Link>
            <div className='table-responsive'>
                <div>
                    <thead>
                        <tr>
                            <th>#</th>
                            
                           
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bannerdata.map((item, key) =>
                                <tr key={key}>
                                    <td>{key + 1}</td>
                                   <td><img src={item.ReporterImage}width="80px" alt="" /></td>
                                    <td>{item.ReporterName}</td>
                                    <td>{item.Designation}</td>
                                    <td>{item.DatePlace.slice(0, 12)}</td>
                                    <td>{item.Heading}</td>
                                    <td>{item.Subheading}</td>
                                    <td><img src={item.Image} alt="pic" width="80px" /></td>
                                    <td>{item.Matter.slice(0, 12)}...</td>
                                    <td>
                                        <Stack direction='horizontal' gap={2}>
                                            {/* <Button variant='primary'>view</Button> */}
                                            {/*<Link to={`/form/${item._id}`}>
                                                <Button variant='primary'>Edit</Button>
                                            </Link> */}
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

export default Shubh
