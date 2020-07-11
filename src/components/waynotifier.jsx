import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  clearTheNotifiSuccess,
  clearTheNotifiError,
} from "../store/actions/init";

import check from "../svg/check.svg";
import into from "../svg/into.svg";
const MsgWapper = styled.div`
  font-size: 1.5rem;
  background-color: ${(props) => (props.color ? "#75e475" : "#f87889")};
  border-radius: 20px;
  margin: 1rem 0;
  width: 20vw;
  padding: 1rem;
  position: fixed;
  bottom: 11rem;
  right: 10px;
  text-align: center;
  & > img {
    height: 1.5rem;
    margin: 0 5px 0 0;
  }
`;
const List = ({ msg, type, mathod }) => {
  useEffect(() => {
    setTimeout(() => {
      mathod();
    }, 9000);
  }, [mathod]);
  return (
    <>
      <MsgWapper color={type === "error" ? false : true}>
        {type === "error" ? (
          <img src={into} alt="intoo" />
        ) : (
          <img src={check} alt="check" />
        )}
        {msg}
      </MsgWapper>
    </>
  );
};
const WayNotifier = ({
  notifiList,
  clearTheNotifiError,
  clearTheNotifiSuccess,
}) => {
  return (
    <>
      {notifiList.error !== "" ? (
        <List
          type="error"
          msg={notifiList.error}
          mathod={clearTheNotifiError}
        />
      ) : null}
      {notifiList.success !== "" ? (
        <List
          type="success"
          msg={notifiList.success}
          mathod={clearTheNotifiSuccess}
        />
      ) : null}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    notifiList: state.notifier,
  };
};
export default connect(mapStateToProps, {
  clearTheNotifiError,
  clearTheNotifiSuccess,
})(WayNotifier);
