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
const createNotification = (obj) => {
  return admin
    .firestore()
    .collection("notifications")
    .add({
      ...obj,
    });
};
exports.postnotification = functions.firestore
  .document("posts/{postsId}")
  .onCreate((doc) => {
    const data = doc.data();
    const notificationObj = {
      userProfile: data.userprofile,
      username: data.username,
      msg: "Add The New Post",
      createAt: new Date(),
      useruid: data.useruid,
    };
    return createNotification(notificationObj);
  });
const firestore = admin.firestore();

exports.presencSystemforFirestore = functions.database
  .ref("/status/{uid}")
  .onUpdate((change, context) => {
    const eventStatus = change.after.val();
    const userStatusFirestoreRef = firestore
      .collection("users")
      .doc(context.params.uid);

    eventStatus.last_changed = new Date();
    console.log("function triggerd");
    return userStatusFirestoreRef.update({
      status: eventStatus.presence,
      lastsee: eventStatus.last_changed,
    });
  });
