import React, { useEffect, useState } from "react";
import "./History.css";
import Toast from "../Toast";
import WindowBar from "../WindowBar";
import { parseURLParams, GetDate } from "../../Constants";

import ComboBox from "../ComboBox";
import Button from "../Button";
import TarifCombo from "../TarifCombo";
import moment from "moment";
import Progress from "../Progress";

import Input from "../Input";

function History() {
  const userId = parseURLParams(window.location.href).data;
  const [user, setUser] = useState();
  const [payments, setPayments] = useState([]);

  const getInfos = () => {
    console.log(userId);
    Window.knex
      .select()
      .from("users")
      .where({ id: userId })
      .then((data) => {
        setUser(data[0]);
        getPayments();
        console.log(data[0]);
      });
  };

  const getPayments = () => {
    Window.knex("subscription")
      .join("tarifs", "subscription.tarif_id", "=", "tarifs.id")
      .where("subscription.user_id", userId)
      .select(
        "tarifs.label",
        "subscription.start_date",
        "subscription.end_date",
        "subscription.duration",
        "subscription.total"
      )
      .then((data) => {
        setPayments(data);
        console.log(data);
      });
  };

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <>
      <WindowBar title='Histourique' logo='/logo.png' resizable={false} />

      {user !== undefined ? (
        <div id='dialog'>
          <div className='history'>
            <div>
              <div className='user-info-title'>
                <span />
                <h1>Information d'athlète</h1>
                <span />
              </div>

              <table className='user-info'>
                {user ? (
                  <tbody>
                    <tr>
                      <td>Nom</td>
                      <td>{user.last_name}</td>
                    </tr>
                    <tr>
                      <td>Prénom</td>
                      <td>{user.first_name}</td>
                    </tr>
                    <tr>
                      <td>date de naissance</td>
                      <td>{user.birth_date}</td>
                    </tr>
                    <tr>
                      <td>date d'inscription</td>
                      <td>{user.sign_date}</td>
                    </tr>
                    <tr>
                      <td>Sexe</td>
                      <td>{user.sexe}</td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    <tr>
                      <td>Aucune donnée</td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            <div>
              <div className='user-info-title'>
                <span />
                <h1>Histourique</h1>
                <span />
              </div>
              <div className='new-history'>
                <table>
                  <thead>
                    <tr>
                      <td>debut</td>
                      <td>Fin</td>
                      <td>tarif</td>
                      <td>durée</td>
                      <td>Somme</td>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.length !== 0
                      ? payments.map((payment, index) => (
                          <tr>
                            <td>{payment.start_date}</td>
                            <td>{payment.end_date}</td>
                            <td>{payment.label}</td>
                            <td>{payment.duration} mois</td>
                            <td>{payment.total}</td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>User undefined</p>
      )}
    </>
  );
}

export default History;
