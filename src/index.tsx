import React from "react";
// rsuite
import "rsuite/styles/index.less";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "./sass/app.scss";
import { Provider } from "react-redux";
import { store } from "./state/redux/store";
import ReactDOM from "react-dom";
import App from "./App";

// ANCHOR styles

// ANCHOR redux

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
