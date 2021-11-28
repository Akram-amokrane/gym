import React, { useEffect, useState } from "react";
import "./TarifTable.css";
import TarifTabRow from "./TarifTabRow";

function TarifTable() {
  const [tarifs, setTarifs] = useState([]);

  Window.ipcRenderer.on("window:settings:updateTarifs", () => {
    getTarifs();
  });

  function getTarifs() {
    Window.knex("tarifs")
      .select()
      .then((data) => {
        setTarifs(data);
      });
  }

  useEffect(() => {
    getTarifs();
  }, []);

  return (
    <>
      <table id='tab-tarif'>
        <thead>
          <tr>
            <th>Label</th>
            <th>Séance/semaine</th>
            <th>Praix</th>
            <th>Sexe</th>
          </tr>
        </thead>
        <tbody>
          {tarifs.map((tarif) => (
            <TarifTabRow tarif={tarif} key={tarif.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TarifTable;
