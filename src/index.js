import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "playbook-ui/dist/reset.css";
import "playbook-ui/dist/playbook.css";
import App from "./App";

import store from "./state";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  rootElement
);
