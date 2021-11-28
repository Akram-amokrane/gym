import React from "react";
import "./Button.css";

const BTN_STYLE = ["primary--btn", "secondary--btn"];
const BTN_SIZE = ["medium--btn", "large--btn"];

function Button({ btnStyle, btnSize, icon, children, id, clickEvent }) {
  const checkBtnStyle = BTN_STYLE.includes(btnStyle) ? btnStyle : BTN_STYLE[0];
  const checkBtnSize = BTN_SIZE.includes(btnSize) ? btnSize : BTN_SIZE[0];

  return (
    <>
      <button
        type='button'
        id={id}
        className={`btn ${checkBtnStyle} ${checkBtnSize}`}
        onClick={clickEvent}>
        <div className='btn-icon'>{icon}</div>
        {children}
      </button>
    </>
  );
}

export default Button;
