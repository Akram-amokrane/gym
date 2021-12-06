import React, { useState, useEffect } from "react";
import "./Calendar.css";

import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid";

import frLocale from "@fullcalendar/core/locales/fr";

import moment from "moment";
import CalPopup from "../CalPopup";

function Calendar() {
  const [events, setEvents] = useState([]);
  const [calPop, setCalPop] = useState({
    x: 0,
    y: 0,
    show: false,
    date: "",
    color: "#333",
  });

  useEffect(() => {
    Window.knex("users")
      .count("* as nbr")
      .groupBy("subscription.end_date")
      .leftJoin("subscription", "users.last_payment", "=", "subscription.id")
      .select("subscription.end_date")
      .then((data) => {
        data.forEach((event) => {
          const today = moment();
          const after_five_days = moment().add(5, "days");
          let end_date = moment(event.end_date);
          var color;
          if (end_date.isSameOrBefore(today)) {
            color = "#ff6060";
          } else if (end_date.isBetween(today, after_five_days)) {
            color = "#ffBB40";
          } else {
            color = "#3760ff";
          }
          setEvents((old) => [
            ...old,
            {
              title: `${event.nbr} fin d'abonnement`,
              allDay: true,
              start: event.end_date,
              color: color,
            },
          ]);
        });
      });
  }, []);

  const eventHandler = (e) => {
    let mX = e.jsEvent.pageX - 70;
    let mY = e.jsEvent.pageY - 30;
    let eventDate = moment(e.event.start).format("YYYY-MM-DD");

    setCalPop({
      x: mX,
      y: mY,
      date: eventDate,
      show: true,
    });
  };

  const calMouseMove = (e) => {
    if (calPop.show) {
      let x = e.pageX - 70;
      let y = e.pageY - 30;
      if (
        calPop.x > x + 50 ||
        calPop.x < x - 50 ||
        calPop.y > y + 50 ||
        calPop.y < y - 50
      ) {
        setCalPop({ show: false });
      }
    }
  };

  return (
    <div id='calendar' onMouseMove={calMouseMove}>
      <CalPopup
        show={calPop.show}
        x={calPop.x}
        y={calPop.y}
        date={calPop.date}
      />
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView='dayGridMonth'
        events={events}
        height='100%'
        eventClick={eventHandler}
        locale={frLocale}
      />
    </div>
  );
}

export default Calendar;
