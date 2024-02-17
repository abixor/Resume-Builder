import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./app/Store.jsx";
import { AppProvider } from "./AppContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>
);
