// import React from 'react'
const baseurl = "https://news-backend-production.up.railway.app";

const Api = async (params= "", methods= 'GET', value =null) => {
  try{
    const url = `${baseurl} ${params}`;
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
  } catch(error) {
    console.error('Api request error ', error)
  }
}

export default Api