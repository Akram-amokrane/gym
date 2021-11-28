import React from "react";
import "./Accordion.css";
import { AiOutlineDown } from "react-icons/ai";

function Accordion({ children, title, id, group }) {
  return (
    <div className='accordion'>
      <div className='accord-header'>
        <h4 className='accord-title'>{title}</h4>
        <label htmlFor={id}>
          <AiOutlineDown />
        </label>
      </div>
      <input type={group ? "radio" : "checkbox"} name={group} id={id} />
      <div className='accord-body'>{children}</div>
    </div>
  );
}

export default Accordion;
