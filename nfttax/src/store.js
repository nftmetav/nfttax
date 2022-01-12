import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer } from "redux-persist";
// import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { auth } from "./open/reducers";


const reducers = {
  auth,
};
const persistConfig = {
  key: "root",
  storage,
  // stateReconciler: autoMergeLevel2,
};
const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () =>
  createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk))
);
