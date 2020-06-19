import history from "../../history";
export const userLogin = (data) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then((data) => {
      dispatch({ type: "LOGIN_SUC" });
      history.push("/");
    })
    .catch((error) => dispatch({ type: "LOGIN_ERR", payload: error }));
};
export const createNewUser = (data) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const { email, password, firstname, lastname } = data;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      return firestore.collection("users").doc(data.user.uid).set({
        firstname,
        lastname,
        userid: data.user.uid,
      });
    })
    .then(() => {
      dispatch({ type: "CREATE_USE_SUC" });
    })
    .catch((error) => {
      dispatch({ type: "CREATE_USE_ERR", payload: error });
    });
};
export const UserLogout = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signOut()
    .then(() => {
      history.push("/login");
      dispatch({ type: "SIGNOUT_SUC" });
    });
};
export const getusername = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const state = getState();

  firestore
    .collection("users")
    .doc(state.firebase.auth.uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const name = doc.data().firstname + " " + doc.data().lastname;
        dispatch({ type: "GET_NAME", payload: name });
      }
    });
};
