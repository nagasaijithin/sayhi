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
    & > img {
      height: 100%;
      width: 100%;
    }
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
    font-size: 1.2rem;
  }
`;
const Postheader = ({ timeshow, message, path, date, username, userid }) => {
  return (
    <PersonWapper>
      <Link to={path ? path : `/profile/${userid}`} className="img">
        <img src={`https://robohash.org/${username}`} alt={username} />
      </Link>
      <div>
        <Link to={path ? path : `/profile/${userid}`}>
          <h2>{username}</h2>
        </Link>
        {timeshow ? null : <span>{message ? message : date}</span>}
      </div>
    </PersonWapper>
  );
};

export default Postheader;
