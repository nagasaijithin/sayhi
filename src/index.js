import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import theme from "./style/theme";
import GlobalStyle from "./style/globalstyles";
import { Router } from "react-router-dom";
import history from "./history";
import { Provider } from "react-redux";
import { store } from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import fbConfig from "./firebase/fbconfig";

import Loading from "./components/loading";
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true, // attaches auth is ready promise to store
};
const rrfProp = {
  firebase: fbConfig,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  if (!isLoaded(auth)) return <Loading />;
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProp}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AuthIsLoaded>
            <App />
          </AuthIsLoaded>
        </ThemeProvider>
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
