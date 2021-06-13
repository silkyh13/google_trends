import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { stateOfquery } from "../../state/slices/query";
import { Line } from "react-chartjs-2";

export default function LineGraph() {
  const chartReference = useRef();
  const [entered, setEntered] = useState(false);
  const query = useSelector(stateOfquery).value;
  const [data, setData] = useState({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "First dataset",
        data: [33, 53, 85, 41, 44, 65],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: "Second dataset",
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: "#742774",
      },
    ],
  });
  useEffect(() => {
    if (query.length) {
      let label = [];
      let curr = query[0];
      for (let key in curr) {
        let searchQuery = curr[key];
        for (let i = 0; i < searchQuery.length; i++) {
          let day = searchQuery[i].formattedAxisTime;
          label.push(day);
        }
      }
      chartReference.current.data.labels = label;
      chartReference.current.update();
      //   console.log(chartReference.current.data);
      //   const chart = chartReference.current.chartInstance;
      //   chart.data.labels = label;
      //   chart.update();
      //   let copy = data;
      //   copy.labels = label;

      //   console.log("what is label now", data);
    }
  }, [query]);

  return (
    <div>
      <Line
        ref={chartReference}
        data={data}
        width={100}
        height={400}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
}
