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
    comments: [{ uid: { comntcontent: "" } }],
    postcontent: postText,
    createAt: new Date(),
    username: username,
    useruid: state.firebase.auth.uid,
  };

  firestore.collection("posts").add({
    ...postObj,
  });
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
  };
  firestore
    .collection("posts")
    .doc(postid)
    .collection("comments")
    .add({
      ...commentobj,
    });
};
