import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ApiContext, AppProvider } from "../Context/ApiContext";

const AdminRoutes = () => {
    const navigate = useNavigate();
    const { type } = useContext(ApiContext);

    if (type !== 'admin') {
        return navigate('/');
    }

    return <Outlet />;
};

export default AdminRoutes;
