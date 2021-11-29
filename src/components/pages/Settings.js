import React, { useState } from "react";
import "./Settings.css";
import Accordion from "../Accordion";
import Input from "../Input";
import RadioBtn from "../RadioBtn";
import TarifTable from "../TarifTable";
import Toast from "../Toast";
import Button from "../Button";

function Settings() {
  const [tarifData, setTarifData] = useState({
    times_week: 0,
    price: 0,
    sexe: "",
    label: "",
  });

  const [toast, setToast] = useState({
    type: "",
    message: "",
    show: false,
  });

  const hideToast = () => {
    setToast((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  const tarifHandler = (tag, val) => {
    setTarifData((prevState) => ({ ...prevState, [tag]: val.toLowerCase() }));
    console.log(tarifData);
  };

  const addTarif = () => {
    if (
      tarifData.times_week !== "" &&
      tarifData.price !== "" &&
      tarifData.sexe !== "" &&
      tarifData.label !== ""
    ) {
      console.log(tarifData);

      Window.knex
        .select("id")
        .from("tarifs")
        .where("label", tarifData.label)
        .then((exists) => {
          if (exists.length === 0) {
            Window.knex("tarifs")
              .insert(tarifData)
              .then(() => {
                setToast({
                  message: "Un tarif ajouter",
                  type: "info",
                  show: true,
                });
                Window.ipcRenderer.send("window:settings:tarifAdded");
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            setToast({
              type: "error",
              message: "Label exist déja",
              show: true,
            });
          }
        });
    } else {
      setToast({
        message: "Tout les champs sont obligatoire",
        type: "error",
        show: true,
      });
      console.log(toast);
    }
  };

  return (
    <div id='settings'>
      <Toast
        type={toast.type}
        message={toast.message}
        show={toast.show}
        hideFunc={hideToast}
      />
      <div className='settings-header'>
        <h1>Settings</h1>
      </div>
      <div className='settings-body'>
        <Accordion title='Tarifs' id='tarif' group='settings'>
          <div id='tarif-c'>
            <div className='tarif-left'>
              <Input
                type='text'
                label='Label'
                required
                id='label'
                changeHandler={tarifHandler}
              />
              <Input
                type='number'
                label='Séances/semaine'
                required
                id='times_week'
                changeHandler={tarifHandler}
              />
              <Input
                type='number'
                label='Praix'
                required
                id='price'
                changeHandler={tarifHandler}
              />
              <RadioBtn
                group='sexe'
                label='Sexe'
                checkedHandler={tarifHandler}
                options={[
                  { id: 1, label: "Homme" },
                  { id: 2, label: "Femme" },
                ]}
              />
              <Button
                btnSize='large--btn'
                id='add-user-btn'
                clickEvent={addTarif}>
                Ajouter
              </Button>
            </div>
            <span className='tarif-devider'></span>
            <div className='tarif-right'>
              <TarifTable />
            </div>
          </div>
        </Accordion>
      </div>
    </div>
  );
}

export default Settings;
