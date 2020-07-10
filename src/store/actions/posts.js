//// posting new post to feed

export const addPost = (postText, postImage, username, profile) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const state = getState();
  const firebase = getFirebase();

  const postObj = {
    image: "false",
    likes: [],
    commentscount: 0,
    postcontent: postText,
    createAt: new Date(),
    username: username,
    useruid: state.firebase.auth.uid,
    userprofile: profile === "" ? "" : profile,
  };

  firestore
    .collection("posts")
    .add({
      ...postObj,
    })
    .then((data) => {
      const postId = data.id;
      const image = postImage.files[0];
      const storageRef = firebase.storage().ref();
      if (postImage.value !== "") {
        storageRef
          .child("postimages/" + postId)
          .put(image)
          .then((data) => {
            storageRef
              .child("postimages/" + postId)
              .getDownloadURL()
              .then((url) => {
                firestore
                  .collection("posts")
                  .doc(postId)
                  .update({
                    image: url,
                  })
                  .then(() => {
                    dispatch({
                      type: "NTFY_SUCCESS_MSG",
                      payload: "Posted SuccessFully",
                    });
                  });
              });
          });
      } else {
        dispatch({ type: "NTFY_SUCCESS_MSG", payload: "Posted SuccessFully" });
      }
    });
};
export const addPostComment = (comment, name, postid, image) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const state = getState();
  const firestore = getFirestore();

  const commentobj = {
    comment,
    username: name,
    userid: state.firebase.auth.uid,
    createAt: new Date(),
    postid,
    likes: [],
    commenteduserprofile: image === "false" ? "" : image,
  };
  firestore
    .collection("posts")
    .doc(postid)
    .collection("comments")
    .add({
      ...commentobj,
    });
};

export const likeaPost = (uid, postid) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  firestore
    .collection("posts")
    .doc(postid)
    .update({
      likes: firestore.FieldValue.arrayUnion(uid),
    });
};

export const unlikeaPost = (uid, postid) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  firestore
    .collection("posts")
    .doc(postid)
    .update({
      likes: firestore.FieldValue.arrayRemove(uid),
    });
};

export const liketheComment = (postid, commentId, cond) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const state = getState();
  const uid = state.firebase.auth.uid;
  firestore
    .collection("posts")
    .doc(postid)
    .collection("comments")
    .doc(commentId)
    .update({
      likes: cond
        ? firestore.FieldValue.arrayRemove(uid)
        : firestore.FieldValue.arrayUnion(uid),
    });
};
