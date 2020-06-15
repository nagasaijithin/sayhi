export const addPost = (postText, postImage) => (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const state = getState();
  firestore.collection("testpost").add({
    posttext: postText,
    postimage: postImage,
  });
};
