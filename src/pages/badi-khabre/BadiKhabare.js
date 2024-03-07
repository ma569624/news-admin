import React from 'react'

import SideNavBar from '../../component/sidenav/SideNavBar'
import Nav from '../../component/nav/Nav'
import Table from './Table'

const BadiKhabare = () => {
    // <Container className="g-0" fluid>
    //     <Row >
    //         <Col xs='2'>
    //             <SideNav />
    //         </Col>
    //         <Col xs='10'>
    //             <Shubh />
    //         </Col>
    //     </Row>
    // </Container>
    return (
        <main>
            <div className="wrapper">

                <Nav />
                <SideNavBar />
                <Table />


            </div>


        </main>
    )
}

export default BadiKhabare
