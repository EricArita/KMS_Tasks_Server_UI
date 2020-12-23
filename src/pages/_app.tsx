import React, { useEffect } from "react";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { usePersistStore } from "../redux/configureStore";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const { store, persistor } = usePersistStore(pageProps.initialReduxState);
  const route = useRouter();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
