import { getTopPerformingVendor } from "../../../slices/thunks";
import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector, useDispatch } from "react-redux";
import "apexcharts/dist/apexcharts.css";

const TopPerformingReport = () => {
  const dispatch = useDispatch();

  const [chartData, setChartData] = useState({
    categories: [],

    series: [{ name: "Orders", data: [] }],
  });

  const { topPerformingVendor, updateDate } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getTopPerformingVendor(updateDate));
  }, [dispatch]);

  useEffect(() => {
    if (
      topPerformingVendor &&
      topPerformingVendor.data &&
      topPerformingVendor.data
    ) {
      const newCategories = topPerformingVendor.data.map(
        (row) => row.companyName
      );
      const orderData = topPerformingVendor.data.map((row) => row.totalSales);
      setChartData({
        categories: newCategories,
        series: [{ name: "Orders", data: orderData }],
      });
    }
  }, [topPerformingVendor]);

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

export default TopPerformingReport;
