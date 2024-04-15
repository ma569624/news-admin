import { useEffect, useState } from "react";
// const baseurl = "https://news-backend-production.up.railway.app"
const baseurl = "http://localhost:5000"

const ApiCalls = async (params, method = 'GET', value) => {
    try {
        const resdata = await fetch(`${baseurl}/api/${params}`, {
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