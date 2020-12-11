import { createStore, Store, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState: object = {
  authUserInfo: {
    userName: "",
    email: "",
  },
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function usePersistStore(state = initialState) {
  const store = createStore(
    persistedReducer,
    state,
    composeWithDevTools(applyMiddleware())
  );
  const persistor = persistStore(store);
  return { store, persistor };
}
