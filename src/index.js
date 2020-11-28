import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Router } from "react-router-dom";
import { Provider } from "react-redux";
// Provider kao parametar prima store koji je napravljen od combineReducera
import store from "./utils/configureStore";
//history je modul koji nam je potreban zbog browsovanja kroz aplikaciju, ukoliko je potrebna navigacija
import history from "./utils/history";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Router history={history}>
          <App />
        </Router>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
