import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { RiErrorWarningLine } from "react-icons/ri";
import "./Input.css";

function Input({
  type,
  id,
  label,
  required,
  regex,
  focused,
  changeHandler,
  value,
}) {
  const [error, setError] = useState("");
  const [success, setsuccess] = useState(false);

  const blurHandler = (e) => {
    if (regex) {
      var value = e.target.value;
      if (value === "" && required) {
        setError("le champ est obligatoire");
      } else if (!regex.test(e.target.value) && required) {
        setError("La syntaxe n'est pas valide");
      } else {
        setError("");
        setsuccess(true);
      }
    }
  };

  const valueChange = (e) => {
    changeHandler(id, e.target.value);
  };

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
      <input
        type={type}
        {...(value ? (value = { value }) : "")}
        autoFocus={focused ? focused : false}
        id={id}
        onBlur={blurHandler}
        onChange={valueChange}
        className={`${error !== "" ? "input-wrong" : ""} ${
          success && error === "" ? "input-success" : ""
        }`}></input>
      <div className={`input-error ${error !== "" ? "error-show" : ""}`}>
        <RiErrorWarningLine />
        <p className='error-msg'>{error}</p>
      </div>
    </div>
  );
}

export default Input;
