// import React from 'react'
// const baseurl = "https://news-backend-production.up.railway.app";
const baseurl = "http://localhost:5000";

const Api = async (params = "", methods = 'GET', value = null) => {
  try {
    // const baseurl = "https://news-backend-production.up.railway.app";
    const baseurl = "http://localhost:5000";

    const url = `${baseurl} ${params}`;
    // const resdata = await fetch(`http://localhost:5000${params}`, {
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