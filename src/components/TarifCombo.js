import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineDown } from "react-icons/ai";
import "./TarifCombo.css";

function TarifCombo({ selectHandler, data, label, required, sexe }) {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState();
  const [tarifs, setTarifs] = useState([]);

  const toggleOptionsShow = () => {
    setShow(!show);
  };

  const changeSelected = (e) => {
    // eslint-disable-next-line eqeqeq
    let sel = tarifs.find((tarif) => tarif.id == e.currentTarget.id);
    setSelected(sel);
    selectHandler(data, sel);
    setShow(false);
  };

  useEffect(() => {
    Window.knex
      .select()
      .from("tarifs")
      .where({ sexe: sexe })
      .then((tarifs) => {
        setTarifs(tarifs);
        setSelected(tarifs[0]);
        selectHandler(data, tarifs[0]);
      });
  }, []);

  return (
    <div className='tarifbox'>
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
      <div className='tarif-box'>
        <label className='tarif-view' onClick={toggleOptionsShow}>
          {selected !== undefined ? (
            <p id={selected.id}>{selected.label}</p>
          ) : (
            ""
          )}
          <AiOutlineDown />
        </label>
        <div className={`tarifs-view ${show ? "tarifs-show" : ""}`}>
          {tarifs.constructor === Array && tarifs.length !== 0
            ? tarifs.map((option) => (
                <div
                  className='tarif-item'
                  id={option.id}
                  onClick={changeSelected}>
                  <div className='tarif-top'>
                    <div className='tarif-title'>{option.label}</div>
                    <div className='tarif-times'>
                      {option.times_week} séances
                    </div>
                  </div>
                  <div className='tarif-bottom'>
                    <div className='tarif-price'>{option.price}DA</div>
                    <div className='tarif-sexe'>{option.sexe}</div>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

export default TarifCombo;
