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
