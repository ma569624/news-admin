import { Outlet, useNavigate, Navigate } from "react-router-dom"

const Producted = () => {
    const navigate = useNavigate();
    // const [isAuthenticated, setisAuthenticated] = useState(false)
    // Check if user is authenticated (example condition)
    const isAuthenticated =  localStorage.getItem('isAuthenticated') ; // Replace with your authentication logic
    console.log(isAuthenticated)
    if (isAuthenticated) {
        return <Outlet />;
    } else {
        // Redirect to the login page
        navigate('/login');
        // Return null (or a loading indicator) since there's nothing to render while redirecting
        return <Navigate to="/login" />;
    }
}

export default Producted;