import React from "react";
import { AiFillStar } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import "./ComboBox.css";

function ComboBox({ id, label, required, options }) {
  return (
    <div className='input-box'>
      <label htmlFor={id}>
        {label}
        {required ? (
          <sup>
            <AiFillStar color='#ff2020' size='8' />
          </sup>
        ) : (
          ""
        )}
      </label>

      <select id={id}>
        <option value='null' selected hidden>{`--${label}--`}</option>
        {options.map((option) => (
          <option value={option.id} key={option.id}>
            {option.label}
          </option>
        ))}
      </select>

      <div className='input-error'>
        <RiErrorWarningLine />
        <p className='error-msg'>error message</p>
      </div>
    </div>
  );
}

export default ComboBox;
