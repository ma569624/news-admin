const Nav = () => {
    return (
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
                        <div className="image">
                            <img
                                src="dist/img/user2-160x160.jpg"
                                className="img-circle elevation-2"
                                alt="User Image"
                            />
                        </div>
                    </div>
                </li>

            </ul>
        </nav>
    )
}

export default Nav