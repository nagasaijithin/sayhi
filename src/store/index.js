import InitReducer from "./reducers/initreducer";
import getProfileReducer from "./reducers/getprofilereducer.js";
import getFriends from "./reducers/getfriends";
import notifierReducer from "./reducers/notifier";

import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { getFirestore } from "redux-firestore";
import { getFirebase } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import fbConfig from "../firebase/fbconfig";
const state = combineReducers({
  init: InitReducer,
  userfriends: getFriends,
  notifier: notifierReducer,
  fullprofile: getProfileReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
  attachAuthIsReady: true, // attaches auth is ready promise to store
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  state,
  composeEnhancers(
    reduxFirestore(fbConfig, rrfConfig),
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
  )
);
