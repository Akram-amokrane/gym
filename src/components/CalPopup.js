import React, { useEffect, useState } from "react";
import "./CalPopup.css";
function CalPopup({ show, date, x, y }) {
  const [users, setUsers] = useState([]);

  //   useEffect(() => {
  Window.knex("users")
    .where("subscription.end_date", date)
    .leftJoin("subscription", "users.last_payment", "=", "subscription.id")
    .select("users.first_name", "users.last_name")
    .then((data) => {
      setUsers(data);
      console.log(data);
    });
  //   }, []);
  return (
    <div
      id='cal-pop'
      className={show ? "show" : ""}
      style={x && y ? { left: x, top: y } : null}>
      <ul>
        {users.length === 0
          ? ""
          : users.map((user, index) => (
              <li key={index}>{`${user.first_name} ${user.last_name}`}</li>
            ))}
      </ul>
    </div>
  );
}

export default CalPopup;
