import React from 'react'
import { Card, Nav } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import './nav.scss'

const SideNav = () => {
    return (

        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark h-100 min-vh-100">
            <NavLink
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
                <svg className="bi me-2" width={40} height={32}>
                    <use xlinkHref="#bootstrap" />
                </svg>
                <span className="fs-6">ThirdEyeWorldNews</span>
            </NavLink>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink to={'/'} className="nav-link text-white" aria-current="page">
                    SHUBHKAMNA Manager
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/addshubh'} className="nav-link text-white" aria-current="page">
                        SHUBHKAMNA
                    </NavLink>
                </li>
                {/* <li>
                    <NavLink to={'/addkhas'} className="nav-link text-white">
                        KHAS KHABRAIN
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/addsamachar'} className="nav-link text-white">
                        TAJA SAMACHAR MANAGER
                    </NavLink>
                </li>
                <li>
                    <NavLink to={'/addcharchayen'} className="nav-link text-white">
                        CHARCHA MANAGER
                    </NavLink>
                </li> */}
                
                {/* <li>
                    <NavLink to={'/pehla'} className="nav-link text-white">
                        PEHLA PANNA MANAGER
                    </NavLink>
                    
                </li> */}
            </ul>
            <hr />
            <div className="dropdown">
                <a
                    href="#"
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img
                        src="https://github.com/mdo.png"
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-circle me-2"
                    />
                    <strong>mdo</strong>
                </a>
                <ul
                    className="dropdown-menu dropdown-menu-dark text-small shadow"
                    aria-labelledby="dropdownUser1"
                >
                    <li>
                        <a className="dropdown-item" href="#">
                            New project...
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Settings
                        </a>
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Profile
                        </a>
                    </li>
                    <li>
                        <hr className="dropdown-divider" />
                    </li>
                    <li>
                        <a className="dropdown-item" href="#">
                            Sign out
                        </a>
                    </li>
                </ul>
            </div>
        </div>

    )
}

export default SideNav
