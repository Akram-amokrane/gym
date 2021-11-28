import React, { useEffect } from "react";
import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import Button from "../Button";
import Search from "../Search";
import TableSubs from "../TableSubs";
import "./Subscribers.css";

function Subscribers() {
  const [search, setSearch] = useState("");

  const showAddUser = () => {
    Window.ipcRenderer.send("Window:show-dialog", { dialog: "addUser" });
  };

  useEffect(() => {
    Window.ipcRenderer.on("react:add-user", (event, data) => {
      console.log(data);
    });
  }, []);

  const searchHandler = (search) => {
    setSearch(search);
  };

  return (
    <div id='subs'>
      <div className='subs-header'>
        <h1>Les abonnées</h1>
        <Search searchVal={searchHandler} />
        <Button
          id='subs-add-user'
          btnStyle='secondary--btn'
          btnSize='medium--btn'
          clickEvent={showAddUser}
          icon={<AiOutlineUserAdd strokeWidth='2px' />}>
          Ajouter
        </Button>
      </div>
      <div className='subs-body'>
        <TableSubs searchVal={search !== "" ? search : ""} />
      </div>
    </div>
  );
}

export default Subscribers;
