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
      dispatch({ type: "NTFY_SUCCESS_MSG", payload: "Login SuccessFully" });
      history.push("/");
    })
    .catch((error) => {
      dispatch({ type: "NTFY_ERROR_MSG", payload: error.message });
      dispatch({ type: "LOGIN_ERR", payload: error });
    });
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
      return firestore
        .collection("users")
        .doc(data.user.uid)
        .set({
          firstname,
          lastname,
          userid: data.user.uid,
          bio: "There is no bio yet",
          followers: [],
          profile: "false",
          status: "online",
          noticationtime: new Date(),
          lastsee: new Date(),
          chatlastsees: {},
          unreadmsg: [],
          following: [],
        })
        .then(() => {
          return firebase
            .database()
            .ref("status/" + data.user.uid)
            .set({
              presence: "online",
              last_changed: "",
            });
        });
    })
    .then(() => {
      dispatch({ type: "CREATE_USE_SUC" });
      dispatch({ type: "NTFY_SUCCESS_MSG", payload: "SignUp SuccessFully" });
    })
    .catch((error) => {
      dispatch({ type: "CREATE_USE_ERR", payload: error.message });
      dispatch({ type: "NTFY_ERROR_MSG", payload: error.message });
    });
};
export const cleartAc = () => {
  return { type: "CLEAR_THE_POPUP" };
};
export const UserLogout = () => (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signOut()
    .then(() => {
      history.push("/login");
      dispatch({ type: "NTFY_SUCCESS_MSG", payload: "LogOut SuccessFully" });
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
    })
    .then(() => {
      firestore
        .collection("users")
        .doc(followeduserid)
        .update({
          following: cond
            ? firestore.FieldValue.arrayRemove(uid)
            : firestore.FieldValue.arrayUnion(uid),
        });
    });
};
// editing profile
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
    history.push(`/profile/${state.firebase.auth.uid}`);
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
        let { firstname, lastname, bio, profile, userid } = storeddata;
        let editfirstname = userData.firstname;
        let editlastname = userData.lastname;
        let editbio = userData.bio;
        const editUserProfile = image
          ? image
          : profile === "false"
          ? "false"
          : profile;
        return firestore
          .collection("users")
          .doc(userid)
          .update({
            firstname: editfirstname === "" ? firstname : editfirstname,
            lastname: editlastname === "" ? lastname : editlastname,
            bio: editbio === "" ? bio : editbio,
            profile: editUserProfile,
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
                  return doc.forEach((ele) => {
                    firestore
                      .collection("posts")
                      .doc(ele.id)
                      .update({
                        username: editfirstname + " " + editlastname,
                      });
                  });
                })
                .then(() => {
                  dispatch({
                    type: "NTFY_SUCCESS_MSG",
                    payload: "Edite You'r SuccessFully",
                  });
                })
                .catch((err) => {
                  dispatch({ type: "NTFY_ERROR_MSG", payload: err.message });
                });
            }
          });
      }
    });
};

export const addnotificationtime = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const state = getState();
  const firestore = getFirestore();
  firestore.collection("users").doc(state.firebase.auth.uid).update({
    noticationtime: new Date(),
  });
};
export const cleanup = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  dispatch({ type: "GET_FIREND_CLERE" });
};
export const getnameandprofile = (uid) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      return doc.data();
    })
    .then((data) => {
      const stateUseinfo = {
        name: data.firstname + " " + data.lastname,
        profile: data.profile,
        uid: data.userid,
        status: data.status,
        lastsee: data.lastsee,
      };
      dispatch({ type: "GET_FRIENDS", payload: stateUseinfo });
    })
    .catch((err) => {
      // dispatch({ type: "GET_FIREND_ERROR", payload: err });
    });
};
export const sendmsg = (msg, friendid) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const state = getState();
  const data = {
    createAt: new Date(),
    msg: msg,
    uid: state.firebase.auth.uid,
  };
  const mainUser = state.firebase.auth.uid;
  const friendUid = friendid;
  const newid =
    mainUser < friendUid
      ? `${mainUser}${friendUid}`
      : `${friendUid}${mainUser}`;

  firestore
    .collection("chats")
    .doc(newid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        firestore
          .collection("chats")
          .doc(newid)
          .update({
            msg: firestore.FieldValue.arrayUnion(data),
          });
      } else {
        firestore
          .collection("chats")
          .doc(newid)
          .set({
            msg: [data],
          });
      }
    });
};

export const getfullUserdata = (uid) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const firebase = getFirebase();
  firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        dispatch({ type: "GET_PROFILE", payload: doc.data() });
      }
    });
};

export const intiPresence = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const state = getState();
  const uid = state.firebase.auth.uid;
  if (uid) {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const userFirestoreRef = firestore.collection("users").doc(uid);
    const userFirebaseDatabaseRef = firebase.database().ref("/status/" + uid);

    let isOfflineForDatabase = {
      presence: "offline",
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    };

    let isOnlineForDatabase = {
      presence: "online",
      last_changed: firebase.firestore.FieldValue.serverTimestamp(),
    };
    let isOnlineForfirestore = {
      status: "online",
    };
    let isOfflineForfirestore = {
      status: "offline",
    };
    firebase
      .database()
      .ref(".info/connected")
      .on("value", function (snapshot) {
        if (snapshot.val() == false) {
          userFirestoreRef.update(isOfflineForfirestore);
          return;
        }
        userFirebaseDatabaseRef
          .onDisconnect()
          .set(isOfflineForDatabase)
          .then(function () {
            userFirebaseDatabaseRef.set(isOnlineForDatabase);
            userFirestoreRef.update(isOnlineForfirestore);
          });
      });
  }
};
export const clearthemsgsee = (frienduid) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const state = getState();
  const firestore = getFirestore();
  const uid = state.firebase.auth.uid;

  firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const unreadmsglist = data.unreadmsg;
        unreadmsglist.forEach((ele) => {
          if (ele.unreadmsguserid === frienduid) {
            firestore
              .collection("users")
              .doc(uid)
              .update({
                unreadmsg: firestore.FieldValue.arrayRemove(ele),
              });
          }
        });
      }
    });
};
export const addtheuserfriendchatlastsee = (frienduid) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const state = getState();
  const firestore = getFirestore();
  const uid = state.firebase.auth.uid;

  dispatch(clearthemsgsee(frienduid));
  firestore
    .collection("users")
    .doc(uid)
    .update({
      [`chatlastsees.${frienduid}`]: new Date(),
    });
};

export const clearTheNotifiSuccess = () => (dispatch) => {
  dispatch({ type: "NTFY_SUCCESS_MSG_CLEAR" });
};

export const clearTheNotifiError = () => (dispatch) => {
  dispatch({ type: "NTFY_ERROR_MSG_CLEAR" });
};

export const sendNotifi = (type, msg) => (dispatch) => {
  const checkTheError = type ? "NTFY_SUCCESS_MSG" : "NTFY_ERROR_MSG";
  dispatch({ type: checkTheError, payload: msg });
};

export const getAllUsers = () => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const Users = [];
  firestore
    .collection("users")
    .get()
    .then((snapShot) => {
      return snapShot.docs.forEach((data) => {
        let currentID = data.id;
        let appObj = { ...data.data(), id: currentID };
        Users.push(appObj);
      });
    })
    .then(() => {
      dispatch({ type: "GET_ALL_USERS", payload: Users });
    });
};
export const clearthefriends = () => (dispatch) => {
  dispatch({ type: "CLEAR_THE_USERS" });
};
