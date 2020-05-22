import React from "react";
import styled from "styled-components";

const FormWapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 1rem;

  & > input {
    font-size: 1.4rem;
    padding: 0.5rem 1rem;
    flex: 1;
    border: none;
    border-radius: var(--mainborderRadius);
    border-bottom: 3px solid var(--secondColor);
  }
  & > button {
    padding: 0.5rem 1rem;
    border: 0;
    background: var(--secondColor);
    color: var(--mainColor);
    margin: 0rem 1rem;
    border-radius: var(--mainborderRadius);
    cursor: pointer;
  }
`;
const Inputandbutton = ({ placeholder, buttonContent }) => {
  return (
    <FormWapper>
      <input type="text" placeholder={placeholder} />
      <button>{buttonContent}</button>
    </FormWapper>
  );
};

export default Inputandbutton;
