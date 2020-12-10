import React from "react";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { useStore } from "../redux/configureStore";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  console.log(store.getState());

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
