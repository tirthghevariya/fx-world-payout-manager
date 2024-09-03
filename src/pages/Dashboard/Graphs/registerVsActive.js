import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import "apexcharts/dist/apexcharts.css";
import { registerVsActiveUser } from "../../../slices/thunks";

const RegisterVsActive = () => {
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    categories: [],

    series: [
      { name: "Registered", data: [] },
      { name: "Active", data: [] },
    ],
  });

  const { registerVsActive, updateDate } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(registerVsActiveUser(updateDate));
  }, [dispatch]);

  useEffect(() => {
    if (
      registerVsActive &&
      registerVsActive.data &&
      registerVsActive.data.rows
    ) {
      const newCategories = registerVsActive.data.rows.map((row) => row.date);
      const registeredData = registerVsActive.data.rows.map(
        (row) => row.registeredUsers
      );
      const activeData = registerVsActive.data.rows.map(
        (row) => row.activeUsers
      );

      setChartData({
        categories: newCategories,
        series: [
          { name: "Registered", data: registeredData },
          { name: "Active", data: activeData },
        ],
      });
    }
  }, [registerVsActive]);

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

export default RegisterVsActive;
