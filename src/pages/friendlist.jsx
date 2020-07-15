import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Postheader from "../components/postcontiner/postheader";
import styled from "styled-components";
const FriendlistWapper = styled.div`
  padding: 2rem;
  width: 80%;
  margin: 0 auto;
  & > ul {
    & > li {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 1rem;
      & > .followBtn {
        padding: 1rem;
        background: var(--secondColor);
        color: var(--mainColor);
        border-radius: 20px;
        font-size: 1.3rem;
      }
    }
  }
`;
const Friendlist = ({ userFirebase }) => {
  console.log(userFirebase.auth.uid);
  if (!userFirebase.auth.uid) {
    return <Redirect to="/login" />;
  }
  return (
    <FriendlistWapper>
      <ul>
        <li>
          <Postheader userid={4325345234} username={"hahahha"} userprofile="" />
          <div className="followBtn">Follow</div>
        </li>
        <hr />
        <li>
          <Postheader userid={4325345234} username={"hahahha"} userprofile="" />
          <div className="followBtn">Follow</div>
        </li>
        <hr />
        <li>
          <Postheader userid={4325345234} username={"hahahha"} userprofile="" />
          <div className="followBtn">Follow</div>
        </li>
        <hr />
        <li>
          <Postheader userid={4325345234} username={"hahahha"} userprofile="" />
          <div className="followBtn">Follow</div>
        </li>
        <hr />
        <li>
          <Postheader userid={4325345234} username={"hahahha"} userprofile="" />
          <div className="followBtn">Follow</div>
        </li>
        <hr />
        <li>
          <Postheader userid={4325345234} username={"hahahha"} userprofile="" />
          <div className="followBtn">Follow</div>
        </li>
        <hr />
        <li>
          <Postheader userid={4325345234} username={"hahahha"} userprofile="" />
          <div className="followBtn">Follow</div>
        </li>
        <hr />
        <li>
          <Postheader userid={4325345234} username={"hahahha"} userprofile="" />
          <div className="followBtn">Follow</div>
        </li>
        <hr />
      </ul>
    </FriendlistWapper>
  );
};
const mapStateToProps = (state) => {
  return {
    userFirebase: state.firebase,
  };
};
export default connect(mapStateToProps)(Friendlist);
