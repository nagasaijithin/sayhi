import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Logo from "../../svg/Logo.svg";
import addafriend from "../../svg/addafriend.svg";
import { Link } from "react-router-dom";
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
  display: flex;
  align-items: center;
  padding: 0rem 2rem;
  & > div {
    height: 100%;
    width: 100%;
    height: 100%;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    & > a {
      height: 100%;
      & > .addfriend {
        height: 70%;
      }
    }
    & > .MLogo {
      display: none;
      @media ${(props) => props.theme.mediaQuires.lapLarg} {
        height: 90%;
        display: inline-block;
      }
    }
  }
`;
const MaincontentWapper = ({ children, firebase }) => {
  return (
    <MainWapper>
      {firebase.auth.uid ? (
        <NavWapper>
          <div>
            <img src={Logo} alt="Logo" className="MLogo" />
            <Link to="/findfriends">
              <img src={addafriend} alt="add A Friend" className="addfriend" />
            </Link>
          </div>
        </NavWapper>
      ) : null}
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
