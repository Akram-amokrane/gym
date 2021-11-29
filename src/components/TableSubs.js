import React, { useEffect, useState } from "react";
import "./TableSubs.css";
import TabSubsRow from "./TabSubsRow";

function TableSubs({ searchVal }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (searchVal === "") {
      Window.ipcRenderer.send("window:subs:getAll");
    } else {
      Window.ipcRenderer.send(
        "window:subs:getSearch",
        searchVal.trim().split(" ", 2)
      );
    }
    console.log(`Table : ${searchVal} || ${searchVal.trim().split(" ", 2)}`);
  }, [searchVal]);

  Window.ipcRenderer.on("window:subs:setAll", (event, data) => {
    setUsers(data);
    console.log(data);
  });

  return (
    <>
      <table id='tab-subs'>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Date de naissance</th>
            <th>Date d'inscription</th>
            <th>Fin d'abonnement</th>
            <th>Credit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <TabSubsRow user={user} key={user.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableSubs;
