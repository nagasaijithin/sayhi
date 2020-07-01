import React from "react";
import styled from "styled-components";
import Postheader from "../components/postcontiner/postheader";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Loading from "../components/loading";
import moment from "moment";
const ContentContiner = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 1rem;

  & > .info {
    font-size: 1.5rem;
    padding: 0.5rem;
  }
`;
const NotificationsWapper = styled.div`
  margin: 2rem auto;
  width: 70%;
  padding: 2rem 0;
  @media ${(props) => props.theme.mediaQuires.lapMid2} {
    width: 90%;
  }
`;
const Notifications = ({ firebase, notifications }) => {
  const uid = firebase.auth.uid;

  if (!uid) {
    return <Redirect to="/login" />;
  }
  if (notifications) {
    return (
      <NotificationsWapper>
        {notifications.map((data, i) => {
          const { createAt, msg, userProfile, useruid, username } = data;
          return (
            <ContentContiner key={i}>
              <Postheader
                timeshow={true}
                userid={useruid}
                userprofile={userProfile}
                username={username}
              />
              <p className="info">{msg}</p>
              <p className="info">{moment(createAt.toDate()).fromNow()}</p>
            </ContentContiner>
          );
        })}
      </NotificationsWapper>
    );
  } else {
    return <Loading />;
  }
};

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
    notifications: state.firestore.ordered.notifications,
  };
};
export default compose(
  firestoreConnect(() => {
    return [{ collection: "notifications", orderBy: ["createAt", "desc"] }];
  }),
  connect(mapStateToProps)
)(Notifications);
