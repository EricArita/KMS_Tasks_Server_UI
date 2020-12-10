import { useMemo } from "react";
import { createStore, Store, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const initialState: object = {
  authUserInfo: {
    userName: "",
    email: ""
  }
};

let store: Store = null;

function initStore(state: any) {
  console.log("initStore");
  return createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware())
  )
}

export const initializeStore = (previousState = initialState) => {
  console.log("initializeStore");
  let _store = store ?? initStore(previousState)

  if (previousState && store) {
    _store = initStore({
      ...store.getState(),
      ...previousState,
    });

    store = null;
  }

  if (!store) store = _store

  return _store
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
