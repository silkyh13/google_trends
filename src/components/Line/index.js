import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { stateOfquery } from "../../state/slices/query";
import { Line } from "react-chartjs-2";
const axios = require("axios");
var colorArray = [
  "#81BEF7",
  "#ffff96",
  "#FF4000",
  "#5882FA",
  "#009688",
  "#f6cd61",
  "#c99789",
  "#f6abb6",
  "#04B404",
  "#A901DB",
  "#F5A9BC",
  "#4b3832",
  "#4a4e4d",
  "#0e9aa7",
  "#ead5dc",
  "#fe8a71",
  "#eec9d2",
  "#f4b6c2",
  "#3da4ab",
];

export default function LineGraph() {
  const chartReference = useRef();
  const [prevData, setPrevData] = useState([]);
  const query = useSelector(stateOfquery).value;
  const [data, setData] = useState();
  const [theLabels, setTheLabels] = useState([]);
  let querying = (key) => {
    let labels = [];
    let data = [];
    axios
      .post("/api/googletrends", { keyword: key })
      .then((res) => {
        res.data.timelineData.forEach((item) => {
          labels.push(item.formattedAxisTime);
          data.push(item.value[0]);
        });
        chartReference.current.data.labels = labels;

        let datasets = {
          label: key,
          data,
          fill: false,
        };
        if (chartReference.current.data.datasets) {
          datasets.borderColor =
            colorArray[chartReference.current.data.datasets.length];
          chartReference.current.data.datasets.push(datasets);
        } else {
          datasets.borderColor = colorArray[0];
          chartReference.current.data.datasets = [datasets];
        }
        chartReference.current.update();
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    querying("happy");
    querying("sad");
  }, []);
  useEffect(() => {
    if (query.length) {
      let curr = query[query.length - 1];
      let data = [];
      let datasets = {};
      let labels = [];
      for (let key in curr) {
        datasets.label = key;
        datasets.fill = false;
        let searchQuery = curr[key];
        for (let i = 0; i < searchQuery.length; i++) {
          labels.push(searchQuery[i].formattedAxisTime);
          data.push(searchQuery[i].value[0]);
        }
      }
      datasets.data = data;
      datasets.borderColor = colorArray[prevData.length - 1];
      setTheLabels(labels);
      setPrevData([...prevData, datasets]);

      //   console.log(chartReference.current.data);
      //   const chart = chartReference.current.chartInstance;
      //   chart.data.labels = label;
      //   chart.update();
      //   let copy = data;
      //   copy.labels = label;

      //   console.log("what is label now", data);
    }
  }, [query]);
  useEffect(() => {
    if (prevData.length) {
      //   chartReference.current.destroy();
      let data = { labels: theLabels };
      data.datasets = prevData;
      console.log(data);
      chartReference.current.data = data;

      chartReference.current.update();
    }
  }, [prevData]);
  return (
    <div>
      <Line
        ref={chartReference}
        data={data}
        width={30}
        height={400}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}
