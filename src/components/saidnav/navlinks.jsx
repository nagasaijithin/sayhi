import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
// / all icons link
import home from "../../svg/home.svg";
import person from "../../svg/person.svg";
import notification from "../../svg/notification.svg";
import message from "../../svg/message.svg";
import logout from "../../svg/logout.svg";
import login from "../../svg/login.svg";
import createaccount from "../../svg/createaccount.svg";

import { connect } from "react-redux";
const Spanani = keyframes`
  0%{
    bottom: 5px;
  }
  50%{
    bottom: 0;
  }
  100%{
    bottom: 5px;
  }
`;
const MainLinksWapper = styled.div`
  height: 80vh;
  @media ${(props) => props.theme.mediaQuires.lapLarg} {
    height: unset;
    flex: 1;
  }
  & > ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    @media ${(props) => props.theme.mediaQuires.lapLarg} {
      flex-direction: row;
    }

    & > li {
      list-style-type: none;
      & > a {
        position: relative;
        & > img {
          height: 3rem;
          &:hover + span {
            display: unset;
            animation: ${Spanani} 0.8s ease-in infinite;
            @media ${(props) => props.theme.mediaQuires.lapLarg} {
              display: none;
            }
            &::before {
              animation: ${Spanani} 0.8s ease-in infinite;
            }
          }
        }
      }
    }
  }
`;

const LinkName = styled.span`
  margin: 0.5rem 2rem;
  padding: 0.5rem 1rem;
  position: absolute;
  background-color: var(--secondColor);
  color: var(--mainColor);
  font-size: 1.4rem;
  border-radius: 7px;
  text-decoration: none;
  display: none;
  &::before {
    content: "";
    width: 10px;
    height: 10px;
    background-color: var(--secondColor);
    position: absolute;
    left: -4px;
    top: 30%;
    transform: rotate(136deg);
  }
`;
const Loginlinks = [
  { icon: home, title: "Home", path: "/" },
  { icon: person, title: "Profile", path: "/profile/098" },
  { icon: notification, title: "Notifications", path: "/notifications" },
  { icon: message, title: "Message", path: "/messages" },
  { icon: logout, title: "Logout", path: "/logout" },
];
const NotloginLinks = [
  { icon: login, title: "Login", path: "/login" },
  {
    icon: createaccount,
    title: "Signup",
    path: "/signup",
  },
];
const NavLinks = (props) => {
  const uid = props.firebase.auth.uid;
  const Links = uid ? Loginlinks : NotloginLinks;

  return (
    <>
      <MainLinksWapper>
        <ul>
          {Links.map(({ icon, title, path }, i) => (
            <li key={i}>
              <Link to={path}>
                <img src={icon} alt={title} />
                <LinkName>{title}</LinkName>
              </Link>
            </li>
          ))}
        </ul>
      </MainLinksWapper>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
  };
};
export default connect(mapStateToProps)(NavLinks);
