import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";

export default function App() {
  useEffect(() => {
    getSearchResults();
  }, []);
  let getSearchResults = () => {
    axios
      .get("/api/googletrends")
      .then((res) => {
        console.log("made it hereeeeee");
        console.log(res);
      })
      .catch((err) => console.error(err));
  };
  return <div className="App">hihi</div>;
}
