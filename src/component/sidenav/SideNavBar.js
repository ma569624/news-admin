
import { NavLink } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import ApiCalls from "../../ApiCalls/ApiCalls";

const SideNavBar = () => {

    const [categories, setcategories] = useState([])
    const [position, setposition] = useState([])
    const [IsShow, setIsShow] = useState(false)
    const [IsShowPostion, setIsShowPostion] = useState(false)
    const [color, setColor] = useState([])

    const [id, setid] = useState("");
    const getdata = () => {
        ApiCalls('categories').then((response) => {
            setcategories(response);
        })
            .catch((error) => {
                // Handle error
            });
        ApiCalls('toplinks').then((response) => {
            setposition(response);
        })
            .catch((error) => {
                // Handle error
            });
    }
    const getcolor = () => {

        ApiCalls('colors').then((response) => {
            setColor(response[0]);
            localStorage.setItem('Colors', response)
        })
            .catch((error) => {
                // Handle error
            });
    }

    useEffect(() => {
        getdata();

    }, [])
    useEffect(() => {
        getcolor()

    }, [])
    // console.log(categories);
    // console.warn(color)
    // style={{backgroundColor: color[0].BackgroundColor1}}

    const List = ({ name, link, icon }) => {
        return (
            <li className="nav-item menu-open">
                <NavLink to={`${link}`} className="nav-link" >
                    <i className={`nav-icon fas ${icon}`} />
                    <p>
                        {name}
                    </p>
                </NavLink>
            </li>
        )
    }
    return (
        <aside className="main-sidebar  elevation-4 h-100 min-vh-100" style={{ backgroundColor: color.BackgroundColor1 }}>
            <div className="sidebar">
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src="dist/img/user2-160x160.jpg"
                            className="img-circle elevation-2"
                            alt="User Image"
                        />
                    </div>
                    <div className="info">
                        <div className="d-block text-white">
                            आकाश श्रीवास्तव
                        </div>
                    </div>
                </div>

                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        {/*<List name={'Top kabare'} link={'/top-khabre'} icon={'fa-edit'} />*/}
                        <li className="nav-item">
                            <div className="nav-link " onClick={(e) => setIsShowPostion(!IsShowPostion)}>
                                <i className="nav-icon fas fa-th" />
                                <p>
                                    Position
                                </p>
                            </div>
                            {
                                IsShowPostion && (

                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        {
                                            position.map((item) =>
                                                <li className="nav-item">
                                                    <NavLink to={`/top-khabre/${item.link}`} className="nav-link">
                                                        <i class="far fa-circle nav-icon"></i>
                                                        <p>
                                                            {item.name}
                                                        </p>
                                                    </NavLink>
                                                </li>
                                            )
                                        }
                                    </ul>)
                            }
                        </li>
                        {/*<List name={'Badi Khabar'} link={'/badi-khabar'} icon={'fa-edit'} />*/}
                        <List name={'Colors'} link={'/colors'} icon={'fa-chart-pie'} />
                        <List name={'All Categories'} link={'/categories'} icon={'fa-th'} />
                        <List name={'Link Manager'} link={'/top-links'} icon={'fa-chart-pie'} />
                        {/*<List name={'Add Categories'} link={'/add-categories'} icon={'fa-edit'} />
                        <List name={'Add Khabare'} link={'/add-blogs/new'} icon={'fa-edit'} />*/}
                        <List name={'All Khabre'} link={'/blogs'} icon={'fa-edit'} />
                        {/* <List name={'Add Home Blogs'} link={'/homeview'} icon={'fa-edit'} /> */}
                        {/* <List name={'Add Main New'} link={'/addmainnew'} icon={'fa-edit'} /> */}
                        <List name={'Main New'} link={'/mainnew'} icon={'fa-edit'} />
                        <List name={'Home Blogs'} link={'/home'} icon={'fa-edit'} />
                        <List name={'ख़बरें राज्यों से'} link={'/rajiya'} icon={'fa-edit'} />
                        <List name={'Poll'} link={'/poll'} icon={'fa-edit'} />
                        <List name={'Advert'} link={'/advert'} icon={'fa-edit'} />
                        <List name={'RashiFal'} link={'/rashifal'} icon={'fa-edit'} />
                        <List name={'हमारी टीम'} link={'/team'} icon={'fa-edit'} />
                        <List name={'हमारा पता'} link={'/address'} icon={'fa-edit'} />
                        <List name={'नियम और शर्तें'} link={'/rules'} icon={'fa-edit'} />
                        <List name={'MultiMedia'} link={'/multimedia'} icon={'fa-edit'} />

                        {/* <li className="nav-item">
                            <div className="nav-link " onClick={(e) => setIsShow(!IsShow)}>
                                <i className="nav-icon fas fa-th" />
                                <p>
                                    Khabare
                                </p>
                            </div>
                            {
                                IsShow && (

                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        <li><NavLink to={'/blogs/All Khabare'} className="nav-link">
                                            <i class="far fa-circle nav-icon"></i>
                                            <p>
                                                Khabare
                                            </p>
                                        </NavLink>
                                        </li>
                                        {
                                            categories.map((item) =>
                                                <li className="nav-item">
                                                    <NavLink to={`/blogs/${item.CategoryName}`} className="nav-link">
                                                        <i class="far fa-circle nav-icon"></i>
                                                        <p>
                                                            {item.CategoryName}
                                                        </p>
                                                    </NavLink>
                                                </li>
                                            )
                                        }
                                    </ul>)
                            }
                        </li> */}


                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default SideNavBar