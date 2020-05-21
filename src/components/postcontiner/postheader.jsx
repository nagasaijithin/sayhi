import React from "react";
import styled from "styled-components";

const PersonWapper = styled.div`
  display: flex;
  align-items: center;
  & > .img {
    width: 5rem;
    height: 5rem;
    background: var(--mainColor);
    border-radius: 50%;
  }
  & > div > h2 {
    padding: 0 1rem;
  }
  & > div > span {
    color: var(--secondColor);
    padding: 0 1rem;
  }
`;
const Postheader = ({ timeshow }) => {
  return (
    <PersonWapper>
      <div className="img"></div>
      <div>
        <h2>Nagasai jithin</h2>
        {timeshow ? null : <span>today 3:00pm</span>}
      </div>
    </PersonWapper>
  );
};

export default Postheader;
