import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Api from '../../Api/Api'
// import EmailContext from '../../components/context/Context'

const Sign = () => {
    const [signup, setsignup] = useState({})
    // const [response, setresponse] = useState([])
    const navigate = useNavigate()
    // const { setData } = useContext(EmailContext)

    const ChangeHandle = (e) => {
        const { name, value } = e.target;
        setsignup({
            ...signup, [name]: value
        })
        // console.log(signup)
    }

    const SubmitHandler = async (event) => {
        event.preventDefault();
        console.log("submit handler trigger", signup)
        Api('/api/signup', 'POST', signup).then((res) => {
            // setresponse(res);
            try {
                if (!res.ok) {
                    navigate('/')
                    // setData(signup.email)
                }
            } catch (error) {
                alert("Please try anthor email")
            }
        })
        
    }

    return (
        <section className="hold-transition register-page">
            <div className="register-box">
                <div className="card card-outline card-primary">

                    <div className="card-body">
                        <p className="login-box-msg">Register a new membership</p>
                        <form onSubmit={(e) => SubmitHandler(e)} className='mb-4'>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control"
                                    name="name"
                                    onChange={(e) => ChangeHandle(e)}
                                    required
                                    value={signup.name || ""} placeholder="Full name" />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    onChange={(e) => ChangeHandle(e)}
                                    value={signup.email || ""} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-envelope" />
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={signup.password || ""}
                                    onChange={(e) => ChangeHandle(e)}
                                    className="form-control"
                                    placeholder="Password"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            { /*<div className="input-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Retype password"
                                />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div> */}
                            <div className="row">

                                <div className="col-12">
                                    <button type="submit" className="btn btn-primary btn-block">
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>

                        <NavLink to={'/login'} className="text-center mt-5">
                            I already have a membership
                        </NavLink>
                    </div>
                </div>
            </div>



            {/* <section className='antialiased bg-gray-200 text-gray-900 font-sans'>

                <div className="flex items-center h-screen w-full">
                    <div className="w-full bg-white rounded shadow-lg p-8 m-4 md:max-w-sm md:mx-auto">
                        <span className="block w-full text-xl uppercase font-bold mb-4">Login</span>
                        <form className="mb-4" onSubmit={(e) => SubmitHandler(e)}>
                            <div className="mb-4 md:w-full">
                                <label htmlFor="email" className="block text-xs mb-1">
                                    Email
                                </label>
                                <input
                                    className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                    type="email"
                                    name="email"
                                    id="email"
                                    onChange={(e) => ChangeHandle(e)}
                                    value={login.email || ""}
                                    placeholder="Username or Email"
                                    required
                                />
                            </div>
                            <div className="mb-6 md:w-full">
                                <label htmlFor="password" className="block text-xs mb-1">
                                    Password
                                </label>
                                <input
                                    className="w-full border rounded p-2 outline-none focus:shadow-outline"
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Password"
                                    onChange={(e) => ChangeHandle(e)}
                                    value={login.password || ""}
                                    required
                                />
                            </div>
                            <button className="bg-green-500 hover:bg-green-700 text-white uppercase text-sm font-semibold px-4 py-2 rounded">
                                Login
                            </button>

                        </form>
                        <NavLink to={'/signup'}>Don't have Account</NavLink>
                    </div>
                </div>

            </section> */}
        </section>

    )
}

export default Sign