// app/Providers.jsx
"use client";

import { Provider } from "react-redux";
import { store } from "../reducer/store";     
import ToasterProvider from "./ToasterProvider";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
     
      <ToasterProvider />
      {children}
    </Provider>
  );
}
