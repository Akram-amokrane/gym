import React from "react";
import { VscWarning } from "react-icons/vsc";
import { BiErrorCircle } from "react-icons/bi";
import { BsInfoCircle } from "react-icons/bs";
import "./Toast.css";

function Toast({ message, type, show, hideFunc }) {
  const Icon = () => {
    switch (type) {
      case "error":
        return <BiErrorCircle size={20} />;
      case "warning":
        return <VscWarning size={20} />;
      default:
        return <BsInfoCircle size={20} />;
    }
  };

  if (show === true) {
    setInterval(() => {
      hideFunc();
    }, 3000);
  }

  return (
    <div id='toast' className={` ${show ? "toast-show" : ""}`}>
      <div className={`toast-container ${type}`}>
        <Icon />
        <p className='toast-msg'>{message}</p>
      </div>
    </div>
  );
}

export default Toast;
