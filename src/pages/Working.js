import React from "react";
import { useNavigate } from "react-router-dom";

const Working = () => {
  const navigation = useNavigate();
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12">
            <h1 className="text-center text-white">
              Working on this page Please go home page ....
            </h1>
            <div className="text-center mt-5">
              <button
                className="btn btn-primary"
                onClick={() => navigation("/")}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Working;
