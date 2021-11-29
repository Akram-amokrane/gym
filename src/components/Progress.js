import React from "react";
import "./Progress.css";

function Progress({ show }) {
  return (
    <div className={`progress ${show ? "show" : ""}`}>
      <div className='circular'></div>
      <div className='logo-container'>
        <img src='/logo.png' alt='logo' />
      </div>
    </div>
  );
}

export default Progress;
