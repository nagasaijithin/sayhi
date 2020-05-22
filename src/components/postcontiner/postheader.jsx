import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
const PersonWapper = styled.div`
  display: flex;
  align-items: center;
  & > .img {
    width: 5rem;
    height: 5rem;
    background: var(--mainColor);
    border-radius: 50%;
  }
  & > div {
    & > a {
      text-decoration: none;
      color: var(--mainTextColor);
      & > h2 {
        padding: 0 1rem;
      }
    }
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
        <Link to="/profile/098">
          <h2>Nagasai jithin</h2>
        </Link>
        {timeshow ? null : <span>today 3:00pm</span>}
      </div>
    </PersonWapper>
  );
};

export default Postheader;
