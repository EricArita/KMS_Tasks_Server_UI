import React from "react";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { usePersistStore } from "../redux/configureStore";

export default function App({ Component, pageProps }) {
  console.log("reload App");
  const { store, persistor } = usePersistStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
