import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// import reportWebVitals from './reportWebVitals';

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

export const petOwnersReducer = (state = [], action) => {
  if (action.type === "SET_PETOWNERS") return action.payload;
  return state;
};

export const petsReducer = (state = [], action) => {
  if (action.type === "SET_PETS") return action.payload;
  return state;
};

const reduxStore = createStore(
  combineReducers({
    petOwners: petOwnersReducer,
    pets: petsReducer,
  })
);
window.store = reduxStore;

root.render(
  <BrowserRouter basename={baseUrl}>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
