import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import moment from "moment";
const PersonWapper = styled.div`
  display: flex;
  align-items: center;
  & > .img {
    width: 5rem;
    height: 5rem;
    background: var(--mainColor);
    border-radius: 50%;
    position: relative;
    & > img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
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
const Onlinesymble = styled.div`
  height: 15px;
  width: 15px;
  background-color: rgb(74, 240, 70);
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0px;
  border: 2px solid white;
`;
const Postheader = ({
  timeshow,
  message,
  path,
  date,
  username,
  userid,
  userprofile,
  lessthetext,
  status,
  lastsee,
}) => {
  const profileonlinearenot =
    status === "online" ? (
      <>
        <img src={`https://robohash.org/${username}`} alt={username} />
        <Onlinesymble />
      </>
    ) : (
      <>
        <img src={`https://robohash.org/${username}`} alt={username} />
      </>
    );

  const withoutimageonlinearenot =
    status === "online" ? (
      <>
        <img src={userprofile} alt={username} />
        <Onlinesymble />
      </>
    ) : (
      <img src={userprofile} alt={username} />
    );
  return (
    <PersonWapper>
      <Link to={path ? path : `/profile/${userid}`} className="img">
        {userprofile === "" || userprofile === "false" ? (
          status ? (
            profileonlinearenot
          ) : (
            <img src={`https://robohash.org/${username}`} alt={username} />
          )
        ) : status ? (
          withoutimageonlinearenot
        ) : (
          <img src={userprofile} alt={username} />
        )}
      </Link>
      <div>
        <Link to={path ? path : `/profile/${userid}`}>
          <h2>{lessthetext ? username.substr(0, 10) + "..." : username}</h2>
        </Link>
        {timeshow ? null : (
          <span>
            {message
              ? message
              : date
              ? date
              : status === "offline"
              ? lastsee && `Last see ${moment(lastsee.toDate()).fromNow()}`
              : status}
          </span>
        )}
      </div>
    </PersonWapper>
  );
};

export default Postheader;
