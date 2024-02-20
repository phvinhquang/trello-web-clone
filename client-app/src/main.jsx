import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App.jsx";
import "./index.css";
// import { ThemeProvider } from "@mui/material/styles";

// Package gửi flash message
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Cấu hình theme và CSS Baseline
import theme from "./theme.js";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Confirm popup
import { ConfirmProvider } from "material-ui-confirm";

// Redux
import { Provider } from "react-redux";
import store from "./redux/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            dialogProps: { maxWidth: "xs" },
            confirmationButtonProps: { color: "error", variant: "outlined" },
            cancellationButtonProps: { color: "inherit" },
            allowClose: false,
          }}
        >
          <CssBaseline />
          <App />
          <ToastContainer position="bottom-left" theme="colored" />
        </ConfirmProvider>
      </CssVarsProvider>
    </Provider>
  </React.StrictMode>
);
