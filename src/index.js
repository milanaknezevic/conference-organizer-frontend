import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store2 from "./redux/store2";

ReactDOM.render(
  <Provider store={store2}>
    <App />
  </Provider>,
  document.getElementById("root")
);
