import moment from "moment";
import React, { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import { MdHistory } from "react-icons/md";
import { useState } from "react/cjs/react.development";
import "./TabSubsRow.css";

function TabSubsRow({ user }) {
  const StyleGroup = { orange: "orange", red: "red" };
  const [style, setStyle] = useState("");
  const deleteUser = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm(`voulez-vous vraiment supprimer cet athlète?`)) {
      Window.ipcRenderer.send("window:delete-user", user.id);
    }
  };

  const showPayment = () => {
    Window.ipcRenderer.send("Window:show-dialog", {
      dialog: "payment",
      data: user.id,
    });
  };

  const showHistory = () => {
    Window.ipcRenderer.send("Window:show-dialog", {
      dialog: "history",
      data: user.id,
    });
  };

  const getRowState = () => {
    const today = moment();
    const after_five_days = moment().add(5, "days");
    let end_date = moment(user.end_date);
    if (end_date.isSameOrBefore(today)) {
      setStyle(StyleGroup.red);
    } else if (end_date.isBetween(today, after_five_days)) {
      setStyle(StyleGroup.orange);
    } else {
      setStyle("");
    }
  };

  useEffect(() => {
    getRowState();
  }, []);

  return (
    <>
      <tr className={`tab-subs-row ${style}`}>
        <td className='row-col-id'>{user.id}</td>
        <td>{user.last_name}</td>
        <td>{user.first_name}</td>
        <td>{user.birth_date}</td>
        <td>{user.sign_date}</td>
        <td>{user.end_date}</td>
        <td>x</td>
        <td className='row-icons'>
          <ul>
            <li>
              <AiOutlineDelete className='row-ic' onClick={deleteUser} />
              <span className='tooltip'>Supprimer</span>
            </li>

            <li>
              <FaRegMoneyBillAlt className='row-ic' onClick={showPayment} />
              <span className='tooltip'>Abonnement</span>
            </li>
            <li>
              <MdHistory className='row-ic' onClick={showHistory} />
              <span className='tooltip'>Historique</span>
            </li>
          </ul>
        </td>
      </tr>
    </>
  );
}

export default TabSubsRow;
