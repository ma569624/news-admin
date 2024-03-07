import React from 'react'
import SideNavBar from '../../component/sidenav/SideNavBar'
import Nav from '../../component/nav/Nav'

import Home from '../home/Home'
import { Outlet } from 'react-router-dom'

const Page = () => {

    return (
        <div className="wrapper">
            <Nav />
            <SideNavBar />
            <Outlet />
        </div>

    )
}

export default Page
