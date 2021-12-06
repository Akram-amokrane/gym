import React, { useEffect, useState } from "react";
import "./Income.css";
import Input from "./Input";
import moment from "moment";
import "moment/locale/fr";
import {
  CategoryScale,
  Chart,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { currencyFormat } from "../Constants";

Chart.register(
  CategoryScale,
  Filler,
  Legend,
  Title,
  Tooltip,
  LinearScale,
  PointElement,
  LineElement
);

function Income() {
  moment.locale("fr");
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: "Revenu",
        data: [],
        fill: true,
        backgroundColor: "#ff6060",
        borderColor: "#FF2020",
      },
    ],
  });
  const [date, setDate] = useState({
    start_date: moment().startOf("month").add(-1, "month").format("YYYY-MM-DD"),
    end_date: moment().endOf("month").add(-1, "month").format("YYYY-MM-DD"),
  });

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: `Revenu entre ${date.start_date} et ${date.end_date}`,
        position: "bottom",
        font: {
          size: 18,
          family: "tahoma",
          weight: "bold",
          style: "italic",
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (label, index, labels) {
            return currencyFormat(label);
          },
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  const monthHandler = (tag, value) => {
    setDate((old) => ({
      ...old,
      [tag]: value,
    }));
    console.log(date);
  };

  useEffect(() => {
    Window.knex("subscription")
      .sum("total as data")
      .select("start_date as label")
      .where("start_date", ">=", date.start_date)
      .where("start_date", "<=", date.end_date)
      .groupBy("start_date")
      .then((rows) => {
        let data = [];
        let labels = [];
        rows.forEach((obj) => {
          data.push(obj.data);
          labels.push(obj.label);
        });
        let chartData = {
          labels: labels,
          datasets: [
            {
              label: "Revenu",
              data: data,
              fill: true,
              backgroundColor: "#FF606020",
              borderColor: "#ff6060",
            },
          ],
        };

        setData(chartData);
        console.log(data);
      });
  }, [date]);

  return (
    <div className='income-chart'>
      <div className='chart-option'>
        <div>
          <Input
            type='date'
            id='start_date'
            value={date.start_date}
            max={date.end_date}
            changeHandler={monthHandler}
            label='De'
          />
        </div>
        <div>
          <Input
            type='date'
            id='end_date'
            value={date.end_date}
            min={date.start_date}
            changeHandler={monthHandler}
            label='à'
          />
        </div>
      </div>
      <div className='chart'>
        <Line data={data} options={chartOptions} lang='fr' />
      </div>
    </div>
  );
}

export default Income;
