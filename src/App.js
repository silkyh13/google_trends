import React from "react";
import LineGraph from "./components";
import "./styles.css";
export default function App() {
  return (
    <div className="App">
      <LineGraph />
      {/* <Line
        data={data}
        width={100}
        height={400}
        options={{ maintainAspectRatio: false }}
      /> */}
    </div>
  );
}
