import React from "react";
import styled from "styled-components";
import { MainButton } from "../style/ui/components";

const ButtonOnSave = styled(MainButton)`
  padding: 1rem;
  border-radius: var(--mainborderRadius);
  cursor: pointer;
  font-size: 2rem;
`;
const ContentWapper = styled.div`
  height: 90%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  & > label {
    width: 15%;
    height: 30%;
    background: var(--WhiteColor);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    & > span {
      font-size: 3rem;
      font-weight: 900;
      display: inline-block;
      position: absolute;
      top: 100%;
      left: 100%;
      transform: translate(-100%, -100%);
      padding: 0.5rem 1.5rem;
      border-radius: 50%;
      background: var(--secondColor);
      color: var(--mainColor);
    }
  }
  & > #profile {
    display: none;
  }
`;
const NameBioWapper = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 2rem;
  & > div {
    & > label {
      display: block;
    }
    & > input {
      padding: 1rem;
      font-size: 2rem;
      border: none;
      border-bottom: 3px solid var(--secondColor);
      background: var(--mainColor);
    }
  }
`;
const Editprofile = () => {
  return (
    <ContentWapper>
      <label htmlFor="profile">
        {" "}
        <span>+</span>
      </label>
      <input type="file" id="profile" />
      <NameBioWapper>
        <div>
          <label htmlFor="name">Name</label>
          <input placeholder="Type you'r Name" type="text" id="name" />
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <input type="text" id="bio" placeholder="Type you'r Bio" />
        </div>
      </NameBioWapper>
      <ButtonOnSave>Save </ButtonOnSave>
    </ContentWapper>
  );
};

export default Editprofile;
