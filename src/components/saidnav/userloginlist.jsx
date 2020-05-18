import React from "react";
import styled from "styled-components";

/// all icons link
import home from "../../svg/home.svg";
import person from "../../svg/person.svg";
import notification from "../../svg/notification.svg";
import message from "../../svg/message.svg";
import logout from "../../svg/logout.svg";
import login from "../../svg/login.svg";
import createaccount from "../../svg/createaccount.svg";

const MainLinksWapper = styled.div`
  height: 80vh;
  & > ul {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;

    & > li {
      list-style-type: none;
      & > img {
        height: 5vh;
        &:hover + span {
          display: unset;
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
  { icon: home, title: "Home" },
  { icon: person, title: "Profile" },
  { icon: notification, title: "Notifications" },
  { icon: message, title: "Message" },
  { icon: logout, title: "Logout" },
];
const NotloginLinks = [
  { icon: login, title: "Login" },
  { icon: createaccount, title: "Create an Account" },
];
const Userloginlist = () => {
  return (
    <>
      <MainLinksWapper>
        <ul>
          {Loginlinks.map(({ icon, title }, i) => (
            <li key={i}>
              <img src={icon} alt={title} />
              <LinkName>{title}</LinkName>
            </li>
          ))}
        </ul>
      </MainLinksWapper>
    </>
  );
};

export default Userloginlist;
