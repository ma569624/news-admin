import { useState } from "react"
import { NavLink } from "react-router-dom"

const Nav = () => {
    const [shubhkamana, setShubhkamana] = useState(false)
    const [khas, setKhas] = useState(false)
    const [taja, setTaja] = useState(false)
    const [pahala, setPahala] = useState(false)
    const [rajiya, setRajiya] = useState(false)
    const [blocks, setBlocks] = useState(false)

    return (
        // <nav className="navbar navbar-expand-lg navbar-light bg-white">
        //     <div className="container-fluid">
        //         <a className="navbar-brand w-25" href="#">
        //             <img
        //                 src="logo.png"
        //                 className="img-fluid w-50 "
        //                 alt="User Image"
        //             />
        //         </a>
        //         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        //             <span className="navbar-toggler-icon" />
        //         </button>
        //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
        //             <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        //                 <li className="nav-item dropdown">
        //                     <NavLink className="nav-link dropdown-toggle" onClick={(e) => setPahala(!pahala)}>
        //                         pahala panna / प्रमुख समाचार
        //                     </NavLink>
        //                     {
        //                         pahala && (
        //                             <ul className="dropdown-menu d-block p-0" aria-labelledby="navbarDropdown">
        //                                 <li>
        //                                     <NavLink to={`/add-blogs/primenews`} className="dropdown-item" >

        //                                         Add pahala panna
        //                                     </NavLink>

        //                                 </li>
        //                                 <li>
        //                                     <NavLink to={`/blogs/primenews`} className="dropdown-item" >

        //                                         pahala panna Manager
        //                                     </NavLink>
        //                                 </li>
        //                             </ul>)
        //                     }

        //                 </li>
        //                 <li className="nav-item dropdown">
                            
        //                     <NavLink className="nav-link dropdown-toggle" onClick={(e) => setShubhkamana(!shubhkamana)}>
        //                         SHUBHKAMNA / Scroll News
        //                     </NavLink>
        //                     {
        //                         shubhkamana && (

        //                             <ul class="dropdown-menu d-block p-0" style={{ display: 'block' }}>
        //                                 <li>
        //                                     <NavLink to={`/add-blogs/TopKhabare`}  className="dropdown-item" >
                                                
        //                                             Add SHUBHKAMNA
        //                                     </NavLink>

        //                                 </li>
        //                                 <li>
        //                                     <NavLink to={`/blogs/TopKhabare`}  className="dropdown-item" >
        //                                         <i class="far fa-circle nav-icon"></i>
        //                                         <p>
        //                                             SHUBHKAMNA Manager
        //                                         </p>
        //                                     </NavLink>
        //                                 </li>
        //                                 {/* {
        //                                     position.map((item) =>
        //                                         <li className="nav-item">
        //                                             <NavLink to={`/top-khabre/${item.link}`} className="nav-link">
        //                                                 <i class="far fa-circle nav-icon"></i>
        //                                                 <p>
        //                                                     {item.name}
        //                                                 </p>
        //                                             </NavLink>
        //                                         </li>
        //                                     )
        //                                 } */}
        //                             </ul>)
        //                     }
        //                 </li>
        //                 <li className="nav-item dropdown">
        //                     <div className="nav-link " onClick={(e) => setKhas(!khas)}>
        //                         <i className="nav-icon fas fa-th" />
        //                         <p>
        //                             Khas Khabre / बड़ी ख़बर
        //                         </p>
        //                     </div>
        //                     {
        //                         khas && (
        //                             <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
        //                                 <li>
        //                                     <NavLink to={`/add-blogs/mainnews`} className="nav-link">
        //                                         <i class="far fa-circle nav-icon"></i>
        //                                         <p>
        //                                             Add Khas Khabre
        //                                         </p>
        //                                     </NavLink>
        //                                 </li>
        //                                 <li>
        //                                     <NavLink to={`/blogs/mainnews`} className="nav-link">
        //                                         <i class="far fa-circle nav-icon"></i>
        //                                         <p>
        //                                             Khas Khabre manager
        //                                         </p>
        //                                     </NavLink>
        //                                 </li>
        //                             </ul>)
        //                     }
        //                 </li>
        //                 <li className="nav-item dropdown">
        //                     <div className="nav-link " onClick={(e) => setTaja(!taja)}>
        //                         <i className="nav-icon fas fa-th" />
        //                         <p>
        //                             जरा इधर भी
        //                         </p>
        //                     </div>
        //                     {
        //                         taja && (
        //                             <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>
        //                                 <li>
        //                                     <NavLink to={`/add-blogs/idharbhi`} className="nav-link">
        //                                         <i class="far fa-circle nav-icon"></i>
        //                                         <p>
        //                                             Add जरा इधर भी
        //                                         </p>
        //                                     </NavLink>
        //                                 </li>
        //                                 <li>
        //                                     <NavLink to={`/blogs/idharbhi`} className="nav-link">
        //                                         <i class="far fa-circle nav-icon"></i>
        //                                         <p>
        //                                             जरा इधर भी Manager
        //                                         </p>
        //                                     </NavLink>
        //                                 </li>
        //                             </ul>)
        //                     }
        //                 </li>
        //                 <li className="nav-item dropdown">
        //                     <div className="nav-link " onClick={(e) => setRajiya(!rajiya)}>
        //                         <i className="nav-icon fas fa-th" />
        //                         <p>
        //                             ख़बरें राज्यों से
        //                         </p>
        //                     </div>
        //                     {
        //                         rajiya && (
        //                             <ul class="nav nav-treeview ms-2" style={{ display: 'block' }}>

        //                                 <li>
        //                                     <NavLink to={`/add-blogs/rajiya`} className="nav-link">
        //                                         <i class="far fa-circle nav-icon"></i>
        //                                         <p>
        //                                             Add ख़बरें राज्यों से
        //                                         </p>
        //                                     </NavLink>
        //                                 </li>
        //                                 <li>
        //                                     <NavLink to={`/blogs/rajiya`} className="nav-link">
        //                                         <i class="far fa-circle nav-icon"></i>
        //                                         <p>
        //                                             ख़बरें राज्यों से Manager
        //                                         </p>
        //                                     </NavLink>
        //                                 </li>
        //                                 <li>
        //                                     <NavLink to={`/addrajiya`} className="nav-link">
        //                                         <i class="far fa-circle nav-icon"></i>
        //                                         <p>
        //                                             राज्य Add Block
        //                                         </p>
        //                                     </NavLink>
        //                                 </li>
        //                                 <li>
        //                                     <NavLink to={`/rajiya`} className="nav-link">
        //                                         <i class="far fa-circle nav-icon"></i>
        //                                         <p>
        //                                             राज्य Block Manager
        //                                         </p>
        //                                     </NavLink>
        //                                 </li>
        //                             </ul>)
        //                     }
        //                 </li>

        //             </ul>
        //             <form className="d-flex user-panel">
        //                 <div className="info">
        //                     <div className="d-block ">
        //                         आकाश श्रीवास्तव
        //                     </div>
        //                 </div>
        //                 <div className="image">
        //                     <img
        //                         src="dist/img/user2-160x160.jpg"
        //                         className="img-circle elevation-2"
        //                         alt="User Image"
        //                     />
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </nav>
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav ms-4">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                        <i className="fas fa-bars" />
                    </a>
                </li>

            </ul>
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <div className="user-panel me-4 d-flex">

                        <div className="info">
                            <div className="d-block ">
                                आकाश श्रीवास्तव
                            </div>
                        </div>
                        {/* <div className="image">
                            <img
                                src="dist/img/user2-160x160.jpg"
                                className="img-circle elevation-2"
                                alt="User Image"
                            />
                        </div> */}
                    </div>
                </li>


            </ul>
        </nav>
    )
}

export default Nav