import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Postheader from "../components/postcontiner/postheader";
import Inputandbutton from "../components/inputandbutton";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getnameandprofile, sendmsg } from "../store/actions/init";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
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
function useTheUsercome(user, mathod, uid) {
  useEffect(() => {
    user &&
      user[0].followers.forEach((data) => {
        mathod(data);
      });
  }, [user, mathod, uid]);
}
const Messages = ({
  friendslist,
  userfirebase,
  user,
  getnameandprofile,
  match,
  sendmsg,
  msglist,
}) => {
  let chatWapperref = useRef();
  let chatContinerref = useRef();
  const uid = userfirebase.auth.uid;
  useTheUsercome(user, getnameandprofile, uid);
  if (!uid) {
    return <Redirect to="/login" />;
  }

  const mSize = match.params.uid ? true : false;
  const getmsgValue = (value) => {
    sendmsg(value, match.params.uid);
  };

  let mainMsgs = msglist ? msglist : [];
  if (mainMsgs) {
    if (chatWapperref.current && chatContinerref.current) {
      chatWapperref.current.scrollTop = chatContinerref.current.scrollHeight;
      console.log(chatWapperref.current.scrollHeight);
    }
  }
  return (
    <MessageWapper changeGrid={mSize}>
      <div className="first-element">
        {friendslist.map((data, i) => {
          return (
            <div key={i}>
              <Postheader
                message={"hi"}
                userid={data.uid}
                username={data.name}
                userprofile={data.profile}
                lessthetext={true}
                path={`/messages/${data.uid}`}
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
                    />
                  );
                } else {
                  return null;
                }
              })}
            </div>
            <div className="chat-wapper" ref={chatWapperref}>
              <ul ref={chatContinerref}>
                {mainMsgs.length > 0 ? (
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
};

const mapStateToProps = (state) => {
  return {
    userfirebase: state.firebase,
    user: state.firestore.ordered.users,
    friendslist: state.userfriends.friends,
    msglist: state.firestore.ordered.chats,
  };
};
export default compose(
  connect(mapStateToProps, {
    getnameandprofile,
    sendmsg,
  }),
  firestoreConnect((props) => {
    let flag;
    if (props.match.params.uid) {
      if (props.msglist) {
        if (props.msglist.length === 0) {
          const id = `${props.userfirebase.auth.uid}${props.match.params.uid}`;
          flag = id;
          return [
            {
              collection: "chats",
              doc: id,
            },
          ];
        } else if (props.msglist[0].id) {
          return [
            {
              collection: "chats",
              doc: flag,
            },
          ];
        }
      } else {
        const swapID = `${props.match.params.uid}${props.userfirebase.auth.uid}`;
        flag = swapID;
        return [
          {
            collection: "chats",
            doc: swapID,
          },
        ];
      }
    } else {
      return [];
    }
  })
)(Messages);
