import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { stateOfquery, setDefault } from "../../state/slices/query";
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

export default function TrendLineGraph({ isOpen }) {
  const chartReference = useRef();
  const dispatch = useDispatch();
  const [prevData, setPrevData] = useState([]);
  const query = useSelector(stateOfquery);
  let querying = (key, color, results) => {
    let labels = [];
    let apidata = [];
    return axios
      .post("/api/googletrends", { keyword: key })
      .then((res) => {
        res.data.timelineData.forEach((item) => {
          labels.push(item.formattedAxisTime);
          apidata.push(item.value[0]);
        });
        let datasets = {
          label: key,
          data: apidata,
          fill: false,
        };
        datasets.borderColor = colorArray[color];

        if (key == "happy") {
          results.labels = labels;
          results.datasets.push(datasets);
        } else {
          results.datasets.push(datasets);
        }
        return results;
      })
      .catch((err) => console.error(err));
  };
  let genereateDefault = async () => {
    let results = { labels: [], datasets: [] };
    querying("happy", 0, results)
      .then((results) => {
        return querying("sad", 1, results);
      })
      .then(() => {
        dispatch(setDefault(results));
      });
  };
  useEffect(() => {
    let userQuery = query.value;
    if (userQuery.length) {
      let curr = userQuery[userQuery.length - 1];
      let data = [];
      let datasets = {};
      for (let key in curr) {
        datasets.label = key;
        datasets.fill = false;
        let searchQuery = curr[key];
        for (let i = 0; i < searchQuery.length; i++) {
          data.push(searchQuery[i].value[0]);
        }
      }
      datasets.data = data;
      datasets.borderColor = colorArray[prevData.length - 1];
      setPrevData([...prevData, datasets]);
    }
  }, [query.value]);
  useEffect(() => {
    genereateDefault();
  }, []);
  useEffect(() => {
    if (prevData.length) {
      let data = { labels: query.default.labels };
      data.datasets = prevData;
      chartReference.current.data = data;
      chartReference.current.update("none");
    }
  }, [prevData, isOpen]);
  return (
    <div>
      <Line
        ref={chartReference}
        data={query.default}
        width={30}
        height={400}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}
