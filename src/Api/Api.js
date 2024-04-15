import { useContext } from "react";
import { ApiContext } from "../Context/ApiContext";

const Api = async (params = "", methods = 'GET', value = null) => {
  const API = useContext(ApiContext);

  try {

    const url = `${API} ${params}`;
    const resdata = await fetch(url, {
      method: methods,
      headers: {
        'Content-Type': 'application/json'
      },
      body: methods === 'GET' ? value = null : JSON.stringify(value)
    })
    if (!resdata.ok) {
      throw new Error(`HTTP error Status : ${resdata.status}`)
    }
    const Data = await resdata.json();
    return Data;
  } catch (error) {
    console.error('Api request error ', error)
  }

}

export default Api