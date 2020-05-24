import React from "react";
import { MainButton, MainLink } from "../style/ui/components";
import styled from "styled-components";

const LogoutWapper = styled.div`
  height: 90%;
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
const Logout = () => {
  return (
    <LogoutWapper>
      <h1>Are you sure to Logout...?</h1>
      <div>
        <MainButton>Yes</MainButton>
        <MainLink to="/">No...</MainLink>
      </div>
    </LogoutWapper>
  );
};

export default Logout;
