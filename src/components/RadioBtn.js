import React from "react";
import { AiFillStar } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import "./RadioBtn.css";

function RadioBtn({ group, label, required, options, checkedHandler }) {
  const checkedChange = (e) => {
    checkedHandler(group, e.target.value);
  };

  return (
    <div className='radio-box'>
      <label>
        {label}
        {required ? (
          <sup>
            <AiFillStar color='#ff2020' size='8' />
          </sup>
        ) : (
          ""
        )}
      </label>
      <div className='radio-group-box'>
        {options.map((option) => (
          <div className='radio-btn' key={option.id}>
            <input
              name={group}
              type='radio'
              value={option.label}
              id={option.id}
              onClick={checkedChange}
            />
            <label htmlFor={option.id} className='radio-label'>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <div className='input-error'>
        <RiErrorWarningLine />
        <p className='error-msg'>error message</p>
      </div>
    </div>
  );
}

export default RadioBtn;
