import React, { useState } from "react";
import styled from "styled-components";

const FormWapper = styled.form`
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
const Inputandbutton = ({ placeholder, buttonContent, method }) => {
  const [inptVal, setInpVal] = useState("");
  const formHandler = (e) => {
    e.preventDefault();
    e.persist();
    if (inptVal !== "") {
      method(e.target.filed.value);
      setInpVal("");
    }
  };
  return (
    <FormWapper onSubmit={formHandler}>
      <input
        type="text"
        name="filed"
        value={inptVal}
        onChange={(e) => setInpVal(e.target.value)}
        placeholder={placeholder}
      />
      <button>{buttonContent}</button>
    </FormWapper>
  );
};

export default Inputandbutton;
