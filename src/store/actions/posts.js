export const addPost = (postText, postImage, username) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const state = getState();

  console.log(postImage === "" ? "false" : postImage);

  const postObj = {
    image: postImage === "" ? "false" : postImage,
    likes: [],
    commentscount: 0,
    postcontent: postText,
    createAt: new Date(),
    username: username,
    useruid: state.firebase.auth.uid,
  };

  firestore.collection("posts").add({
    ...postObj,
  });
};
export const addPostWithImage = (postText, postImage, username) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const storageRef = firebase.storage().ref("postimages/" + postImage.name);
  storageRef.put(postImage).then((snapshot) => {
    // console.log(snapshot.metadata.downloadURLs[0]);
    storageRef.getDownloadUrl().then((url) => console.log(url));
  });
  // storageRef.on(
  //   "state_change",
  //   () => {},
  //   () => {},
  //   () => {
  //     storageRef.getDownloadUrl().then((url) => {
  //       console.log(url);
  //     });
  //   }
  // );
};
export const addPostComment = (comment, name, postid) => (
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
