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
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { email, password } = data;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((data) => {
      console.log(data);
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
