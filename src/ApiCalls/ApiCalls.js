import { useContext } from "react";
import { ApiContext } from "../Context/ApiContext";

const ApiCalls = async (params, method = 'GET', value) => {
//   const API = useContext(ApiContext);
const API = 'https://api.techdeveloper.in'

    try {
        const resdata = await fetch(`${API}/api/${params}`, {
            method: method,
            body: value,
        })
        if (!resdata.ok) {
            throw new Error(`HTTP error! Status: ${resdata.status}`);
        }
        const Data = await resdata.json();
        return Data
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

export default ApiCalls