import React, { useState, useEffect } from "react";
import { TextInput, Button, Flex, FlexItem } from "playbook-ui";
import axios from "axios";

const TextInputCustom = (props) => {
  const [value, setValues] = useState("");
  const handleChange = (event) => {
    setValues(event.target.value);
  };
  useEffect(() => {
    let elem = document.getElementById("search-input");

    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        getSearchResults();
      }
    };
    if (elem) {
      elem.addEventListener("keydown", listener);
    }
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
  return (
    <Flex>
      <TextInput>
        <input
          id="search-input"
          name={value}
          onChange={handleChange}
          placeholder="Search"
          type="text"
          value={value}
        />
      </TextInput>
    </Flex>
  );
};

export default TextInputCustom;
