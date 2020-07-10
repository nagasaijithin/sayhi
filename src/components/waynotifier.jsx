import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  clearTheNotifiSuccess,
  clearTheNotifiError,
} from "../store/actions/init";
const MsgWapper = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
  background-color: ${(props) => (props.color ? "#75e475" : "#f87889")};
  border-radius: 20px;
  margin: 1rem 0;
  width: 20vw;
  padding: 1rem;
  position: fixed;
  bottom: 11rem;
  right: 10px;
  text-align: center;
`;
const List = ({ msg, type, mathod }) => {
  useEffect(() => {
    setTimeout(() => {
      mathod();
    }, 9000);
  }, [mathod]);
  return (
    <>
      <MsgWapper color={type === "error" ? false : true}>{msg}</MsgWapper>
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
