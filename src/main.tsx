import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/HH_frontend/serviceWorker.js")
      .then((res: ServiceWorkerRegistration) => {
        console.log("service worker registered", res);
      })
      .catch((err: Error) => {
        console.log("service worker not registered", err);
      });
  });
}


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/HH_frontend">
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
