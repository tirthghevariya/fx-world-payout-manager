import { last15DaysOrder } from "../../../slices/thunks";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import "apexcharts/dist/apexcharts.css";

const Last15DaysOrderReport = () => {
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    categories: [],

    series: [{ name: "Orders", data: [] }],
  });

  const { last15DaysOrderReport, updateDate } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(last15DaysOrder(updateDate));
  }, [dispatch]);

  useEffect(() => {
    if (
      last15DaysOrderReport &&
      last15DaysOrderReport.data &&
      last15DaysOrderReport.data.rows
    ) {
      const newCategories = last15DaysOrderReport.data.rows.map(
        (row) => row.date
      );
      const orderData = last15DaysOrderReport.data.rows.map(
        (row) => row.totalOrders
      );

      setChartData({
        categories: newCategories,
        series: [{ name: "Orders", data: orderData }],
      });
    }
  }, [last15DaysOrderReport]);

  const { categories, series } = chartData;

  const options = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default Last15DaysOrderReport;
