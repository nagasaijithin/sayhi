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
        bio: "There is no bio yet",
        followers: [],
        profile: "false",
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
        const profile = doc.data().profile;
        const payload = {
          name: name,
          profile: profile,
        };
        dispatch({ type: "GET_NAME", payload: payload });
      }
    });
};

export const followAuser = (uid, followeduserid, cond) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  firestore
    .collection("users")
    .doc(uid)
    .update({
      followers: cond
        ? firestore.FieldValue.arrayRemove(followeduserid)
        : firestore.FieldValue.arrayUnion(followeduserid),
    });
};

export const editeProfile = (profileimg, userData) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const state = getState();
  if (profileimg.value === "") {
    dispatch(editeuserName(false, userData));
    history.push(`profile/${state.firebase.auth.uid}`);
  } else {
    let storageRef = firebase.storage().ref();
    storageRef
      .child("profile/" + state.firebase.auth.uid)
      .put(profileimg.files[0])
      .then(() => {
        storageRef
          .child("/profile/" + state.firebase.auth.uid)
          .getDownloadURL()
          .then((url) => {
            firestore
              .collection("posts")
              .where("useruid", "==", state.firebase.auth.uid)
              .get()
              .then((doc) => {
                doc.forEach((ele) => {
                  firestore.collection("posts").doc(ele.id).update({
                    userprofile: url,
                  });
                });
              });
            dispatch(editeuserName(url, userData));
            history.push(`/profile/${state.firebase.auth.uid}`);
          });
      });
  }
};
export const editeuserName = (image, userData) => (
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
        let storeddata = doc.data();
        let { firstname, lastname, bio, userprofile } = storeddata;
        let editfirstname = userData.firstname;
        let editlastname = userData.lastname;
        let editbio = userData.bio;
        return firestore
          .collection("users")
          .doc(state.firebase.auth.uid)
          .update({
            firstname: editfirstname === "" ? firstname : editfirstname,
            lastname: editlastname === "" ? lastname : editlastname,
            bio: editbio === "" ? bio : editbio,
            profile: image
              ? image
              : userprofile === "false"
              ? "false"
              : userprofile,
          })
          .then(() => {
            let editfirstname = userData.firstname;
            let editlastname = userData.lastname;
            if (editfirstname !== "" && editlastname !== "") {
              firestore
                .collection("posts")
                .where("useruid", "==", state.firebase.auth.uid)
                .get()
                .then((doc) => {
                  doc.forEach((ele) => {
                    firestore
                      .collection("posts")
                      .doc(ele.id)
                      .update({
                        username: editfirstname + " " + editlastname,
                      });
                  });
                });
            }
          });
      }
    });
};
