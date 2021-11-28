import React from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import "./TabSubsRow.css";

function TabSubsRow({ user }) {
  const deleteUser = () => {
    Window.ipcRenderer.send("window:delete-user", user.id);
  };

  const showPayment = () => {
    Window.ipcRenderer.send("Window:show-dialog", {
      dialog: "payment",
      data: user.id,
    });
  };

  return (
    <>
      <tr className='tab-subs-row'>
        <td className='row-col-id'>{user.id}</td>
        <td>{user.last_name}</td>
        <td>{user.first_name}</td>
        <td>{user.birth_date}</td>
        <td>{user.sign_date}</td>
        <td>x</td>
        <td>x</td>
        <td className='row-icons'>
          <ul>
            <li>
              <AiOutlineEdit className='row-ic' />
            </li>
            <li>
              <AiOutlineDelete className='row-ic' onClick={deleteUser} />
            </li>
            <li>
              <FaRegMoneyBillAlt className='row-ic' onClick={showPayment} />
            </li>
          </ul>
        </td>
      </tr>
    </>
  );
}

export default TabSubsRow;
