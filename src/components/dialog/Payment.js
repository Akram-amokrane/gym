import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { GetDate, getStrDate, parseURLParams } from "../../Constants";
import WindowBar from "../WindowBar";
import Toast from "../Toast";
import Input from "../Input";
import "./Payment.css";
import ComboBox from "../ComboBox";
import Button from "../Button";
import TarifCombo from "../TarifCombo";
import moment from "moment";

function Payment() {
  const userId = parseURLParams(window.location.href).data;
  const date = GetDate();
  const [user, setUser] = useState();
  const [toast, setToast] = useState({
    type: "",
    message: "",
    show: false,
  });
  const [data, setData] = useState({
    start_date: date,
    total: 0,
    unite: 1,
  });

  const changeData = (tag, value) => {
    setData((prevState) => ({
      ...prevState,
      [tag]: value,
    }));
  };

  const hideToast = () => {
    setToast((prevState) => ({
      ...prevState,
      show: false,
    }));
  };

  const getInfos = () => {
    console.log(userId);
    Window.knex
      .select()
      .from("users")
      .where({ id: userId })
      .then((data) => {
        setUser(data[0]);
      });
  };

  useEffect(() => {
    getInfos();
  }, []);

  const addPayment = () => {
    if (data.total == 0) {
      setToast({
        type: "error",
        message: "Tous les champs sont obligatoires",
        show: true,
      });
    } else {
      Window.knex("subscription")
        .insert({
          user_id: user.id,
          tarif_id: data.tarif.id,
          start_date: data.start_date,
          end_date: data.end_date,
          duration: data.duration,
          total: data.total,
        })
        .then(() => {
          setToast({
            type: "info",
            message: "Abonnement ajouter",
            show: true,
          });
        });
    }
  };

  useEffect(() => {
    console.log("data:", data);
    if (
      data.hasOwnProperty("start_date") &&
      data.hasOwnProperty("unite") &&
      data.hasOwnProperty("duration")
    ) {
      let total_price = data.duration * data.unite * data.tarif.price;
      let start_date = new Date(data.start_date);
      let final_date = moment(start_date).add(
        data.duration * data.unite,
        "months"
      );

      setData((prevState) => ({
        ...prevState,
        total: total_price,
        end_date: final_date.format("YYYY-MM-DD"),
      }));
    }
  }, [data.duration, data.start_date, data.unite, data.tarif]);

  return (
    <>
      <WindowBar
        title="Paiment d'abonnement"
        logo='/logo.png'
        resizable={false}
      />
      <Toast
        type={toast.type}
        show={toast.show}
        message={toast.message}
        hideFunc={hideToast}
      />
      {user !== undefined ? (
        <div id='dialog'>
          <div className='payment'>
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
                <h1>Nouvelle abonnement</h1>
                <span />
              </div>
              <div className='new-payment'>
                <Input
                  type='date'
                  id='start_date'
                  label="Debut d'abonnement"
                  value={date}
                  changeHandler={changeData}
                />
                <table className='duration'>
                  <tr>
                    <td>
                      <Input
                        type='number'
                        id='duration'
                        label='Durée'
                        changeHandler={changeData}
                      />
                    </td>
                    <td>
                      <ComboBox
                        options={[
                          { id: 1, label: "mois" },
                          { id: 12, label: "ans" },
                        ]}
                        data='unite'
                        selectHandler={changeData}
                        label='unité'
                      />
                    </td>
                  </tr>
                </table>

                <TarifCombo
                  data='tarif'
                  selectHandler={changeData}
                  label='Tarif'
                  sexe={user.sexe}
                />

                <table className='payment-total'>
                  <tr>
                    <td>Total</td>
                    <td>
                      {new Intl.NumberFormat("fr-DZ", {
                        style: "currency",
                        currency: "DZD",
                      }).format(data.total)}
                    </td>
                  </tr>
                </table>
                <Button id='add-payment-btn' clickEvent={addPayment}>
                  Ajouter l'abonnement
                </Button>
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

export default Payment;