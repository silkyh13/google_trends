import React, { useState, useEffect } from "react";
import { InputGroup, Button, FormControl } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setQuery } from "../../state/slices/query";

const Input = () => {
  const dispatch = useDispatch();
  const [values, setValues] = useState("");
  const [entered, setEntered] = useState(false);

  const handleChange = (event) => {
    setValues(event.target.value);
  };
  useEffect(() => {
    let elem = document.getElementById("search-input");
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        setEntered(true);
      }
    };
    if (elem) {
      elem.addEventListener("keydown", listener);
    }
  }, []);
  useEffect(() => {
    if (entered) {
      getSearchResults();
      setValues("");
      setEntered(false);
    }
  }, [entered]);
  let getSearchResults = () => {
    axios
      .post("/api/googletrends", { keyword: values })
      .then((res) => {
        let obj = {};
        obj[values] = res.data.timelineData;
        dispatch(setQuery(obj));
      })
      .catch((err) => console.error(err));
  };
  return (
    <InputGroup className="search ml-3 mt-3 mb-3">
      <FormControl
        id="search-input"
        placeholder="Search here"
        value={values}
        type="text"
        onChange={handleChange}
      />
      <Button variant="outline-secondary" id="button-addon2">
        Button
      </Button>
    </InputGroup>
  );
};

export default Input;
