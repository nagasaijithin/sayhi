import React, { useEffect } from "react";
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
import { addnotificationtime, getfullUserdata } from "../../store/actions/init";
import moment from "moment";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

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
      position: relative;
      & > div {
        height: 10px;
        width: 10px;
        background: rgba(240, 99, 99, 0.96);
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 50%;
      }
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
function useGetUserData(uid, mathod) {
  useEffect(() => {
    uid && mathod(uid);
  }, [uid, mathod]);
}
const NavLinks = ({
  addnotificationtime,
  loginuserInfo,
  notifications,
  user,
  getfullUserdata,
}) => {
  const uid = loginuserInfo.auth.uid;

  useGetUserData(uid, getfullUserdata);
  const Notging = () => {};
  const setNotificationTime = () => {
    addnotificationtime();
  };
  const Loginlinks = [
    { icon: home, title: "Home", path: "/", method: Notging },
    {
      icon: person,
      title: "Profile",
      path: `/profile/${uid}`,
      method: Notging,
    },
    {
      icon: notification,
      title: "Notifications",
      path: "/notifications",
      method: setNotificationTime,
      unreadicon: true,
    },
    { icon: message, title: "Message", path: "/messages", method: Notging },
    { icon: logout, title: "Logout", path: "/logout", method: Notging },
  ];

  const NotloginLinks = [
    { icon: login, title: "Login", path: "/login", method: Notging },
    {
      icon: createaccount,
      title: "Signup",
      path: "/signup",
      method: Notging,
    },
  ];
  const Links = uid ? Loginlinks : NotloginLinks;

  const userLastSee =
    user && moment(user.noticationtime.toDate()).format("hh:mm:ss");
  const newPostAddTime =
    notifications &&
    moment(notifications[0].createAt.toDate()).format("hh:mm:ss");
  const userseeNotifiorNot =
    newPostAddTime &&
    userLastSee &&
    newPostAddTime.toString() > userLastSee.toString();
  console.log(userseeNotifiorNot);
  console.log(newPostAddTime);
  console.log(userLastSee);
  return (
    <>
      <MainLinksWapper>
        <ul>
          {Links.map(({ icon, title, path, method, unreadicon }, i) => (
            <li key={i} onClick={method}>
              <Link to={path}>
                <img src={icon} alt={title} />
                <LinkName>{title}</LinkName>
              </Link>

              {unreadicon && userseeNotifiorNot ? <div></div> : null}
            </li>
          ))}
        </ul>
      </MainLinksWapper>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    loginuserInfo: state.firebase,
    notifications: state.firestore.ordered.notifications,
    user: state.fullprofile,
    userid: state.firebase.auth.uid,
  };
};
export default compose(
  connect(mapStateToProps, {
    addnotificationtime,
    getfullUserdata,
  }),
  firestoreConnect((props) => {
    return [{ collection: "notifications", orderBy: ["createAt", "desc"] }];
  })
)(NavLinks);
