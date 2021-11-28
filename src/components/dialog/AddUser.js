import React, { useState } from "react";
import { Regex, GetDate } from "../../Constants";
import Button from "../Button";
import Input from "../Input";
import RadioBtn from "../RadioBtn";
import Toast from "../Toast";
import WindowBar from "../WindowBar";
import "./AddUser.css";

function AddUser() {
  const date = GetDate();
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    sign_date: date,
    sexe: "",
  });
  const [toast, setToast] = useState({
    type: "",
    message: "",
    show: false,
  });

  const setValue = (tag, value) => {
    setData((prevState) => ({ ...prevState, [tag]: value }));
  };

  const hideToast = () => {
    setToast((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  const addUser = () => {
    if (
      data.firstName === "" ||
      data.lastName === "" ||
      data.signDate === "" ||
      data.sexe === ""
    ) {
      setToast({
        type: "error",
        message: "error d'ajouter a la  base de donnees",
        show: true,
      });
    } else {
      Window.ipcRenderer.send("addUser:user", data);
    }
  };

  Window.ipcRenderer.on("window:state", (event, data) => {
    setToast({
      type: data.type,
      message: data.message,
      show: true,
    });
  });

  Window.ipcRenderer.on("addUser:initFields", () => {
    setData({
      first_name: "",
      last_name: "",
      birth_date: "",
      sign_date: date,
      sexe: "",
    });
    document.querySelector("#last_name").value = "";
    document.querySelector("#first_name").value = "";
    document.querySelector("#birth_date").value = "";
    document.querySelector("#sign_date").value = "";
    document.querySelector("input[name='sexe']").checked = false;
  });
  return (
    <>
      <WindowBar resizable={false} logo='/logo.png' title='Ajouter un atléte' />
      <Toast
        type={toast.type}
        show={toast.show}
        message={toast.message}
        hideFunc={hideToast}
      />
      <div id='dialog'>
        <div className='add-user-form'>
          <Input
            type='text'
            label='Nom'
            id='last_name'
            required={true}
            regex={Regex.name}
            changeHandler={setValue}
            focused
          />
          <Input
            type='text'
            label='Prénom'
            id='first_name'
            required={true}
            regex={Regex.name}
            changeHandler={setValue}
          />
          <Input
            type='date'
            label='Date de Naissance'
            id='birth_date'
            changeHandler={setValue}
            required={true}
          />
          <Input
            type='date'
            label="Date d'inscription"
            id='sign_date'
            changeHandler={setValue}
            required={true}
            value={date}
          />
          <RadioBtn
            group='sexe'
            label='Sexe'
            checkedHandler={setValue}
            required
            options={[
              { id: 2, label: "Homme" },
              { id: 1, label: "femme" },
            ]}
          />
          <Button btnSize='large--btn' id='add-user-btn' clickEvent={addUser}>
            Ajouter
          </Button>
        </div>
      </div>
    </>
  );
}

export default AddUser;
