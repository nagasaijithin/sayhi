import React from "react";
import { MainButton, MainLink } from "../style/ui/components";
import styled from "styled-components";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { UserLogout } from "../store/actions/init";
import { Helmet } from "react-helmet";
const LogoutWapper = styled.div`
  height: 90vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  & > h1 {
    font-size: 3rem;
  }
  & > div {
    display: flex;
    justify-content: space-evenly;
    width: 50%;
  }
`;
const Logout = (props) => {
  const uid = props.firebase.auth.uid;
  if (!uid) {
    return <Redirect to="/login" />;
  }
  return (
    <LogoutWapper>
      <Helmet>
        <title>LogOut - sayHi</title>
      </Helmet>
      <h1>Are you sure to Logout...?</h1>
      <div>
        <MainButton onClick={() => props.UserLogout()}>Yes</MainButton>
        <MainLink to="/">No...</MainLink>
      </div>
    </LogoutWapper>
  );
};

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
  };
};
export default connect(mapStateToProps, {
  UserLogout,
})(Logout);
