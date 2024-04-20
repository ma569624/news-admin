import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ApiContext, AppProvider } from "../Context/ApiContext";

const Producted = () => {
    const navigate = useNavigate();
    const { isAuthenticated  } = useContext(ApiContext);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
      }, []);

    if (!isAuthenticated) {
        return navigate('/login');
    }

    return <Outlet />;
};

export default Producted;
