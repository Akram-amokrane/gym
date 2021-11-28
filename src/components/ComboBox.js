import React, { useEffect } from "react";
import { AiFillStar, AiOutlineDown } from "react-icons/ai";
import { useState } from "react/cjs/react.development";
import "./ComboBox.css";

function ComboBox({ options, selectHandler, data, label, required }) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState({
    id: options[0].id,
    label: options[0].label,
  });

  const toggleOptionsShow = () => {
    setShow(!show);
  };

  const changeSelected = (e) => {
    setSelected({
      id: e.target.id,
      label: document.getElementById(e.target.id).innerText,
    });
    selectHandler(data, e.target.id);
  };

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className='combobox'>
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
      <div className='combo-box'>
        <label className='combo-view' onClick={toggleOptionsShow}>
          <p id={selected.id}>{selected.label}</p>
          <AiOutlineDown />
        </label>
        <div className={`options-view ${show ? "options-show" : ""}`}>
          {options
            ? options.map((option) => (
                <div id={option.id} onClick={changeSelected}>
                  {option.label}
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default ComboBox;
