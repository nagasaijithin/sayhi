import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Postheader from "../components/postcontiner/postheader";
import Inputandbutton from "../components/inputandbutton";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  getnameandprofile,
  sendmsg,
  cleanup,
  addtheuserfriendchatlastsee,
} from "../store/actions/init";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Loading from "../components/loading";
const MessageWapper = styled.div`
  display: flex;
  background: white;
  height: 90%;
  width: 90%;
  margin: 0 auto;
  border-radius: var(--mainborderRadius);
  & > .first-element {
    padding: 1rem;
    height: 90vh;
    overflow-y: scroll;
    @media ${(props) => props.theme.mediaQuires.messageGrid} {
      display: ${(props) => (props.changeGrid ? "none" : "unset")};
      flex: 1;
    }
    &::-webkit-scrollbar {
      width: 1rem;
    }
    &::-webkit-scrollbar-track {
      background: white;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--secondColor);
      border-radius: var(--mainborderRadius);
    }
    & > div {
      padding: 1rem;
    }
  }
  & > .last-element {
    flex: 1;
    @media ${(props) => props.theme.mediaQuires.messageGrid} {
      display: ${(props) => (props.changeGrid ? "unset" : "none")};
    }
  }
`;

const SideMessageWapper = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  padding: 1rem;
  & > .message-head {
    padding: 1rem 2rem;
  }
  & > .chat-wapper {
    flex: 1;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 1rem;
    }
    &::-webkit-scrollbar-track {
      background: white;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--secondColor);
      border-radius: var(--mainborderRadius);
    }
    & > ul {
      height: 69vh;
      display: flex;
      flex-direction: column;
      & .even {
        align-self: flex-end;
        border-radius: 30px 30px 0px 30px;
        background: rgba(66, 141, 255, 0.86);
      }
      & > li {
        background: var(--secondColor);
        color: var(--mainColor);
        padding: 1rem;
        width: 30%;
        border-radius: 30px 30px 30px 0px;
        font-size: 1.4rem;
        margin: 1rem;
        list-style-type: none;
      }
    }
  }
`;
const StartingInbox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  & > h1 {
    font-size: 3rem;
  }
  & > p {
    font-size: 1.5rem;
  }
`;
function useTheUsercome(user, mathod, uid, cleanup) {
  useEffect(() => {
    if (user) {
      const mainuser = user.filter((data) => data.userid === uid);
      mainuser.forEach((ele, i) => {
        ele.followers.forEach((data) => {
          mathod(data);
        });
      });
    }
    return () => cleanup();
  }, [user, mathod, uid, cleanup]);
}
const Messages = ({
  friendslist,
  cleanup,
  userfirebase,
  user,
  getnameandprofile,
  match,
  sendmsg,
  msglist,
  addtheuserfriendchatlastsee,
}) => {
  let chatWapperref = useRef();
  let chatContinerref = useRef();
  const uid = userfirebase.auth.uid;
  useTheUsercome(user, getnameandprofile, uid, cleanup);

  if (!uid) {
    return <Redirect to="/login" />;
  }

  if (user && userfirebase && friendslist) {
    const mSize = match.params.uid ? true : false;
    const getmsgValue = (value) => {
      sendmsg(value, match.params.uid);
    };

    let mainMsgs = msglist ? msglist : [];
    if (mainMsgs.length > 0) {
      if (chatWapperref.current && chatContinerref.current) {
        setTimeout(() => {
          chatWapperref.current.scrollTop = chatWapperref.current.scrollHeight;
        }, 1000);
      }
    }
    const updatethelastsee = (uid) => {
      addtheuserfriendchatlastsee(uid);
    };
    return (
      <MessageWapper changeGrid={mSize}>
        <div className="first-element">
          {friendslist.map((data, i) => {
            return (
              <div key={i} onClick={() => updatethelastsee(data.uid)}>
                <Postheader
                  userid={data.uid}
                  username={data.name}
                  userprofile={data.profile}
                  lessthetext={true}
                  path={`/messages/${data.uid}`}
                  status={data.status}
                />
              </div>
            );
          })}
        </div>
        <div className="last-element">
          {match.params.uid ? (
            <SideMessageWapper>
              <div className="message-head">
                {friendslist.map((data, i) => {
                  if (data.uid === match.params.uid) {
                    return (
                      <Postheader
                        userid={data.uid}
                        username={data.name}
                        userprofile={data.profile}
                        key={i}
                        status={data.status}
                        lastsee={data.lastsee}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
              <div className="chat-wapper" ref={chatWapperref}>
                <ul ref={chatContinerref}>
                  {msglist ? (
                    mainMsgs.length > 0 ? (
                      mainMsgs[0].msg.map((data, i) => {
                        if (data.uid === uid) {
                          return (
                            <li className="even" key={i}>
                              {data.msg}
                            </li>
                          );
                        } else {
                          return <li key={i}>{data.msg}</li>;
                        }
                      })
                    ) : (
                      <StartingInbox>
                        <h1>Send private messages to friend .</h1>
                      </StartingInbox>
                    )
                  ) : (
                    <Loading />
                  )}
                </ul>
              </div>
              <div>
                <Inputandbutton
                  placeholder="Enter you'r message"
                  buttonContent="Send"
                  method={getmsgValue}
                />
              </div>
            </SideMessageWapper>
          ) : (
            <StartingInbox>
              <h1>Wellcome To SayHi Messenger</h1>
              <p>
                find new friends and chat with them, we clear the all chat in
                every 24hours
              </p>
            </StartingInbox>
          )}
        </div>
      </MessageWapper>
    );
  } else {
    return <Loading />;
  }
};

const mapStateToProps = (state) => {
  return {
    userfirebase: state.firebase,
    userid: state.firebase.auth.uid,
    user: state.firestore.ordered.users,
    friendslist: state.userfriends.friends,
    msglist: state.firestore.ordered.chats,
  };
};
export default compose(
  connect(mapStateToProps, {
    getnameandprofile,
    sendmsg,
    cleanup,
    addtheuserfriendchatlastsee,
  }),
  firestoreConnect((props) => {
    if (props.match.params.uid) {
      const friendUid = props.match.params.uid;
      const mainUser = props.userid;
      const newid =
        mainUser < friendUid
          ? `${mainUser}${friendUid}`
          : `${friendUid}${mainUser}`;
      return [
        {
          collection: "chats",
          doc: newid,
        },
        { collection: "users", doc: props.userid },
      ];
    } else {
      return [{ collection: "users", doc: props.userid }];
    }
  })
)(Messages);
