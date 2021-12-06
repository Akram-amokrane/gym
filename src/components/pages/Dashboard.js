import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Income from "../Income";
import moment from "moment";

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [userActive, setUserActive] = useState(0);
  const [userInactive, setUserInactive] = useState(0);

  useEffect(() => {
    Window.knex("users")
      .leftJoin("subscription", "users.last_payment", "=", "subscription.id")
      .select("subscription.end_date")
      .then((data) => {
        var active = 0,
          inactive = 0;
        data.map((row) => {
          let current = moment(row.end_date);
          let today = moment();

          if (current.isBefore(today)) {
            inactive++;
          } else {
            active++;
          }
        });
        setUserCount(data.length);
        setUserActive(active);
        setUserInactive(inactive);
      });
  }, []);

  return (
    <div id='dashboard'>
      <div className='dash-head'>
        <h1>Tableau de bord</h1>
      </div>
      <div className='dash-body'>
        <div className='dash-container'>
          <div className='dash-income'>
            <Income />
          </div>
          <div className='dash-infos'>
            <div className='dash-info nbr'>
              <div className='title'>Nombre d'athlètes</div>
              <div className='data'>
                <p className='value'>{userCount}</p>
                <p className='unite'>Athlètes</p>
              </div>
            </div>
            <div className='dash-info active'>
              <div className='title'>athlètes active</div>
              <div className='data'>
                <p className='value'>{userActive}</p>
                <p className='unite'>Athlètes</p>
              </div>
            </div>
            <div className='dash-info inactive'>
              <div className='title'>Athlète inactive</div>
              <div className='data'>
                <p className='value'>{userInactive}</p>
                <p className='unite'>Athlètes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
