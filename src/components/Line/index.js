import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Container, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { stateOfquery, setDefault } from "../../state/slices/query";
import { Line } from "react-chartjs-2";
import colorArray from "./color/";
const axios = require("axios");

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
      let data = { labels: query.default.labels, datasets: prevData };
      chartReference.current.data = data;
      chartReference.current.update("none");
    }
  }, [prevData, isOpen]);
  return (
    <Container className="mt-3">
      <Row className="justify-content-md-center">
        <Card style={{ width: "80%" }}>
          <Card.Header as="h5">Interest over time</Card.Header>
          <Card.Body>
            <Line
              ref={chartReference}
              data={query.default}
              width={30}
              height={400}
              options={{ maintainAspectRatio: false }}
            />
          </Card.Body>
          {/* <Line
          ref={chartReference}
          data={query.default}
          width={30}
          height={400}
          options={{ maintainAspectRatio: false }}
        /> */}
        </Card>
      </Row>
    </Container>
  );
}
