
import { NavLink } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import ApiCalls from "../../ApiCalls/ApiCalls";
import './nav.css'

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


    const [shubhkamana, setShubhkamana] = useState(false)
    const [khas, setKhas] = useState(false)
    const [taja, setTaja] = useState(false)
    const [pahala, setPahala] = useState(false)
    const [admin, setAdmin] = useState(false)
    const [rajiya, setRajiya] = useState(false)
    const [blocks, setBlocks] = useState(false)
    const [samachar, setSamachar] = useState(false)
    const [links, setLinks] = useState(false)
    const [ads, setAds] = useState(false)
    const [gallery, setGallery] = useState(false)


    return (
        <aside className="main-sidebar  elevation-4 h-100 min-vh-100" style={{ backgroundColor: 'rgb(32 28 28)' }}>
            <div className="sidebar">
                <div className="mt-3">
                    <div className="image text-center">
                        <img
                            src="logo.png"
                            className="img-fluid w-50 "
                            alt="User Image"
                        />
                    </div>

                </div>

                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        {/* <li className="nav-item">
                            <button className="nav-link " onClick={(e) => setAdmin(!admin)}>
                                Admin
                            </button>
                            {
                                admin && (
                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        <li>
                                            <NavLink to={`/edit-founder/edit`} className="nav-link">
                                                Founder Details
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/rules`} className="nav-link">
                                                Niyam Aur Shartain
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/add-team`} className="nav-link">
                                                Hamain Jane
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/team`} className="nav-link">
                                                Hamain Jane Manager
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to={`/address`} className="nav-link">
                                                Hamara Pata
                                            </NavLink>
                                        </li>



                                        <li>
                                            <NavLink to={`https://analytics.google.com`} target="_black" className="nav-link">
                                                WEBALIZER
                                            </NavLink>
                                        </li>
                                    </ul>)
                            }
                        </li> */}
                        <li>
                            <NavLink to={`/add-blogs/all`} className="nav-link">
                                Add Khabare
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/blogs/primenews`} className="nav-link">
                                प्रमुख समाचार Manager
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/tagline`} className="nav-link">
                                Header Tagline
                            </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <button className="nav-link " onClick={(e) => setPahala(!pahala)}>
                                प्रमुख समाचार
                            </button>
                            {
                                pahala && (
                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        <li>
                                            <NavLink to={`/add-blogs/primenews`} className="nav-link">

                                                Add pahala panna
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/blogs/primenews`} className="nav-link">

                                                pahala panna Manager

                                            </NavLink>
                                        </li>
                                    </ul>)
                            }
                        </li> */}


                        <li>
                            <NavLink to={`/blogs/TopKhabare`} className="nav-link">
                                Scroll News Manager
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={`/top-links`} className="nav-link">
                                Master Link Manager
                            </NavLink>
                        </li>

                        {/* <li className="nav-item">
                            <button className="nav-link " onClick={(e) => setShubhkamana(!shubhkamana)}>

                                SHUBHKAMNA
                            </button>
                            {
                                shubhkamana && (

                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        <li>
                                            <NavLink to={`/add-blogs/TopKhabare`} className="nav-link">

                                                Add SHUBHKAMNA
                                            </NavLink>

                                        </li>
                                        <li>
                                            <NavLink to={`/blogs/TopKhabare`} className="nav-link">
                                                SHUBHKAMNA Manager
                                            </NavLink>
                                        </li>
                                       
                                    </ul>)
                            }
                        </li> */}

                        {/* <li className="nav-item">
                            <button className="nav-link" onClick={(e) => setGallery(!gallery)}>
                                Gallery
                            </button>
                            {
                                gallery && (

                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        <li>
                                            <NavLink to={`/multimedia`} className="nav-link">
                                                Add Multimedia Gallery
                                            </NavLink>
                                        </li>

                                        <li>
                                            <NavLink to={`/add-video`} className="nav-link">
                                                Add Video
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/video`} className="nav-link">
                                                Video Gallery Manager
                                            </NavLink>
                                        </li>
                                    </ul>)
                            }
                        </li> */}
                        <li>
                            <NavLink to={`/blogs/mainnews`} className="nav-link">
                                Khas Khabre manager
                            </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <button className="nav-link " onClick={(e) => setKhas(!khas)}>
                                बड़ी ख़बर
                            </button>
                            {
                                khas && (
                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        <li>
                                            <NavLink to={`/add-blogs/mainnews`} className="nav-link">

                                                Add Khas Khabre

                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/blogs/mainnews`} className="nav-link">
                                                Khas Khabre manager
                                            </NavLink>
                                        </li>
                                    </ul>)
                            }
                        </li> */}
                        <li>
                            <NavLink to={`/blogs/idharbhi`} className="nav-link">
                                जरा इधर भी Manager
                            </NavLink>
                        </li>
                        {/* <li className="nav-item">
                            <button className="nav-link " onClick={(e) => setTaja(!taja)}>
                                जरा इधर भी
                            </button>
                            {
                                taja && (
                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        <li>
                                            <NavLink to={`/add-blogs/idharbhi`} className="nav-link">

                                                Add जरा इधर भी
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/blogs/idharbhi`} className="nav-link">
                                                जरा इधर भी Manager

                                            </NavLink>
                                        </li>
                                    </ul>)
                            }
                        </li> */}
                        <li className="nav-item">
                            <button className="nav-link " onClick={(e) => setRajiya(!rajiya)}>
                                ख़बरें राज्यों से
                            </button>
                            {
                                rajiya && (
                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>

                                        {/* <li>
                                            <NavLink to={`/add-blogs/rajiya`} className="nav-link">
                                                Add ख़बरें राज्यों से
                                            </NavLink>
                                        </li> */}
                                        <li>
                                            <NavLink to={`/blogs/rajiya`} className="nav-link">
                                                ख़बरें राज्यों से Manager
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/addrajiya`} className="nav-link">
                                                राज्य Add Block
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/rajiya`} className="nav-link">
                                                राज्य Block Manager
                                            </NavLink>
                                        </li>
                                    </ul>)
                            }
                        </li>

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
                        <li className="nav-item">
                            <button className="nav-link " onClick={(e) => setBlocks(!blocks)}>
                                Block
                            </button>
                            {
                                blocks && (
                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        {/* <li>
                                            <NavLink to={`/add-blogs/block`} className="nav-link">
                                                Add Block News
                                            </NavLink>
                                        </li> */}
                                        <li>
                                            <NavLink to={`/blogs/block`} className="nav-link">
                                                Block News Manger
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/homeview`} className="nav-link">

                                                Add Block Name
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/home`} className="nav-link">

                                                Block Name Manger

                                            </NavLink>
                                        </li>
                                    </ul>)
                            }
                        </li>
                        {/* <li className="nav-item">
                            <button to={'#'} className="nav-link " onClick={(e) => setSamachar(!samachar)}>
                                Taja Samachar
                            </button>
                            {
                                samachar && (
                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        <li>
                                            <NavLink to={`/add-blogs/taja-samachar`} className="nav-link">
                                                Add Taja Samachar Style

                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/blogs/taja-samachar`} className="nav-link">
                                                Taja Samachar  Manger
                                            </NavLink>
                                        </li>

                                    </ul>)
                            }
                        </li> */}
                        <li>
                            <NavLink to={`/blogs/tajasamachar`} className="nav-link">
                                Taja Samachar  Manger
                            </NavLink>
                        </li>

                        {/* <li className="nav-item">
                            <button className="nav-link " onClick={(e) => setLinks(!links)}>
                                Links
                            </button>
                            {
                                links && (
                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        <li>
                                            <NavLink to={`/add-blogs/all`} className="nav-link">
                                                Links
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/blogs/all`} className="nav-link">
                                                Links Manger
                                            </NavLink>
                                        </li>

                                    </ul>)
                            }
                        </li> */}
                        <li className="nav-item">
                            <button className="nav-link " onClick={(e) => setAds(!ads)}>
                                Ads/Polls
                            </button>
                            {
                                ads && (
                                    <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
                                        <li>
                                            <NavLink to={`/add-advert`} className="nav-link">
                                                Add Advertisement Details
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/advert`} className="nav-link">
                                                Advertisement Manager
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/add-poll`} className="nav-link">
                                                Add Opinion Poll
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/poll`} className="nav-link">
                                                Opinion Poll Manager
                                            </NavLink>
                                        </li>

                                    </ul>)
                            }
                        </li>

                        <li>
                            <NavLink to={`/advert`} className="nav-link">
                                Advert
                            </NavLink>
                        </li>
                        {/* <List name={'Block ख़बरें राज्यों से'} link={'/rajiya'} icon={'fa-edit'} /> */}
                        {/* <List name={'Link Manager'} link={'/top-links'} icon={'fa-chart-pie'} /> */}
                        {/* <List name={'Poll'} link={'/poll'} icon={'fa-edit'} /> */}
                        {/* <List name={'Advert'} link={'/advert'} icon={'fa-edit'} /> */}


                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default SideNavBar