import * as React from "react";
import ReactDOMServer from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom/server";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";
import App from "./App";
import { configureStore } from "./store";

export function render(url) {
  const store = configureStore();
  const persistor = persistStore(store);

  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}
