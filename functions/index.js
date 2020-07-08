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

exports.checkUsermsgredarenot = functions.firestore
  .document("chats/{chatId}")
  .onUpdate((change, context) => {
    const data = change.after.data();
    const fullid = context.params.chatId;
    const user1 = fullid.slice(0, 28);
    const user2 = fullid.slice(28);
    const lastmsguser = data.msg[data.msg.length - 1];
    const lastmsguserUid = lastmsguser.uid;
    const lastmsguserTime = lastmsguser.createAt;
    const lastmsguserMsg = lastmsguser.msg;
    const witchOneUsertochange = user1 === lastmsguserUid ? user2 : user1;
    return admin
      .firestore()
      .collection("users")
      .doc(witchOneUsertochange)
      .get()
      .then((doc) => {
        if (doc.exists) {
          let userdata = doc.data();
          let userlastseeisfriend =
            userdata.chatlastsees[user1 === lastmsguserUid ? user1 : user2];
          let updatedata = {
            unreadmsguserid: lastmsguserUid,
            content: lastmsguserMsg,
          };
          if (userlastseeisfriend && userlastseeisfriend < lastmsguserTime) {
            return addtheunreadmsgInuser(witchOneUsertochange, updatedata);
          } else {
            return addtheunreadmsgInuser(witchOneUsertochange, updatedata);
          }
        } else {
          console.log("error");
        }
        return null;
      })
      .catch((err) => {
        throw err;
      });
  });
function addtheunreadmsgInuser(userid, data) {
  return admin
    .firestore()
    .collection("users")
    .doc(userid)
    .update({
      unreadmsg: admin.firestore.FieldValue.arrayUnion(data),
    });
}
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
