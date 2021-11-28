import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import "./TarifTabRow.css";

function TarifTabRow({ tarif }) {
  const deleteTarif = () => {
    Window.knex("tarifs")
      .where("id", tarif.id)
      .del()
      .then(() => {
        Window.ipcRenderer.send("window:settings:tarifAdded");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <tr className='tab-tarif-row'>
        <td className='row-col-id'>{tarif.id}</td>
        <td>{tarif.label}</td>
        <td>{tarif.times_week}</td>
        <td>{tarif.price}</td>
        <td>{tarif.sexe}</td>
        <td className='row-icons'>
          <ul>
            <li>
              <AiOutlineEdit className='row-ic' />
            </li>
            <li>
              <AiOutlineDelete className='row-ic' onClick={deleteTarif} />
            </li>
          </ul>
        </td>
      </tr>
    </>
  );
}

export default TarifTabRow;
