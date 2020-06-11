import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
const MainWapper = styled.div`
  background-color: var(--mainColor);
  border-radius: 3rem;
`;
const NavWapper = styled.div`
  height: 8vh;
  position: sticky;
  top: 0;
  z-index: 20;

  width: 100%;
  background-color: var(--mainColor);
  border-radius: 30px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  box-shadow: 0px 6px 6px -4px black;
`;
const MaincontentWapper = ({ children, firebase }) => {
  return (
    <MainWapper>
      {firebase.auth.uid ? <NavWapper></NavWapper> : null}
      {children}
    </MainWapper>
  );
};
const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
  };
};
export default connect(mapStateToProps)(MaincontentWapper);
