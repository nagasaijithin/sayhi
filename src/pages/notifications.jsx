import React from "react";
import styled from "styled-components";
import Postheader from "../components/postcontiner/postheader";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ContentContiner = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  padding: 1rem;

  & > .info {
    font-size: 1.3rem;
  }
`;
const NotificationsWapper = styled.div`
  margin: 2rem auto;
  width: 70%;
  padding: 2rem 0;
`;
const Notifications = (props) => {
  const uid = props.firebase.auth.uid;
  if (!uid) {
    return <Redirect to="/login" />;
  }
  return (
    <NotificationsWapper>
      <ContentContiner>
        <Postheader timeshow={true} />
        <p className="info">is Join at today 4:30pm</p>
      </ContentContiner>
      <hr />
      <ContentContiner>
        <Postheader timeshow={true} />
        <p className="info">is Join at today 4:30pm</p>
      </ContentContiner>
      <hr />
      <ContentContiner>
        <Postheader timeshow={true} />
        <p className="info">is Join at today 4:30pm</p>
      </ContentContiner>
      <hr />
      <ContentContiner>
        <Postheader timeshow={true} />
        <p className="info">is Join at today 4:30pm</p>
      </ContentContiner>
    </NotificationsWapper>
  );
};

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
  };
};
export default connect(mapStateToProps)(Notifications);
