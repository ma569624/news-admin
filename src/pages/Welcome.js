import React, { useContext } from "react";
import { ApiContext } from "../Context/ApiContext";

export const Welcome = () => {
  const { name } = useContext(ApiContext);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-12">
          <h3 className="text-center text-white mt-5 fw-bold">
            Welcome {name} to Third Eye World News Admin Section
          </h3>
        </div>
      </div>
    </div>
  );
};
