const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);

exports.commentCounter = functions.firestore
  .document("posts/{postId}/{comments}/{commentsId}")
  .onCreate((doc) => {
    const info = doc.data();
    const postid = info.postid;
    return admin
      .firestore()
      .collection("posts")
      .doc(postid)
      .collection("comments")
      .get()
      .then((value) => {
        var i = 0;
        value.forEach((ele) => {
          i++;
        });
        return admin.firestore().collection("posts").doc(postid).update({
          commentscount: i,
        });
      });
  });
