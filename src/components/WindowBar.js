import React from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { MdOutlineHomeMax } from "react-icons/md";
import "./WindowBar.css";

function windowBar({ resizable, logo, title }) {
  const resizeStyle = resizable ? {} : { display: "none" };

  const closeMainWindow = () => {
    Window.ipcRenderer.send("Window:close");
  };

  const minMainWindow = () => {
    Window.ipcRenderer.send("Window:min");
  };

  const maxMainWindow = () => {
    Window.ipcRenderer.send("Window:max");
  };

  return (
    <>
      <div id='winbar'>
        <div className='winbar-drag'>
          {logo ? <img src={logo} className='winbar-logo' alt='logo' /> : ""}
          {title ? <h1 className='winbar-title'>{title}</h1> : ""}
        </div>
        <ul className='winbar-opt'>
          <li
            className='winbar-opt-def'
            onClick={minMainWindow}
            style={resizeStyle}>
            <AiOutlineMinus />
          </li>
          <li
            className='winbar-opt-def'
            onClick={maxMainWindow}
            style={resizeStyle}>
            <MdOutlineHomeMax />
          </li>
          <li className='winbar-opt-close' onClick={closeMainWindow}>
            <IoCloseSharp />
          </li>
        </ul>
      </div>
    </>
  );
}

export default windowBar;
