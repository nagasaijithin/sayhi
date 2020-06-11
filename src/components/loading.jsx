import React from "react";
import styled, { keyframes } from "styled-components";
const ani = keyframes`
0%{
    transform: rotate(0deg);
}
100%{
    transform: rotate(360deg);
}
`;
const Loader = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5rem;
  height: 5rem;
  border: 2px solid var(--secondColor);
  border-radius: 50%;
  border-top-color: var(--mainColor);
  animation: ${ani} 1s linear infinite;
`;
const Loading = () => {
  return <Loader />;
};

export default Loading;
