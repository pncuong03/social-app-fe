import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import theme from "./theme";
import initRequest from "./utilities/services/initRequest";

const container = document.getElementById("root")!;
const root = createRoot(container);

initRequest();

root.render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <CssBaseline />

      <App />
    </CssVarsProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
