import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Postheader from "../components/postcontiner/postheader";
import styled from "styled-components";
import {
  getAllUsers,
  clearthefriends,
  followAuser,
} from "../store/actions/init";
import Loading from "../components/loading";
const FriendlistWapper = styled.div`
  padding: 2rem;
  width: 80%;
  margin: 0 auto;
  & > ul {
    & > li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      & > .followBtn {
        padding: 1rem;
        background: var(--secondColor);
        color: var(--mainColor);
        border-radius: 20px;
        font-size: 1.3rem;
        cursor: pointer;
      }
    }
  }
`;
function useGetTheFriends(uid, mathod, clearthefriends) {
  useEffect(() => {
    mathod();
    return () => {
      clearthefriends();
    };
  }, [uid, mathod, clearthefriends]);
}
const Friendlist = ({
  userFirebase,
  getAllUsers,
  clearthefriends,
  Allusers,
  followAuser,
  loginuser,
}) => {
  useGetTheFriends(userFirebase.auth.uid, getAllUsers, clearthefriends);
  if (!userFirebase.auth.uid) {
    return <Redirect to="/login" />;
  }
  if (Allusers && loginuser) {
    const user = loginuser[0];
    let mainUsers = [...Allusers.users];

    return (
      <FriendlistWapper>
        <ul>
          {mainUsers.map((data) => {
            const fullName = data.firstname + " " + data.lastname;

            const checkFriendArenot = user.following.some(
              (doc) => doc === data.userid
            );
            const checkUseruid = user.userid === data.userid;
            if (!checkFriendArenot && !checkUseruid) {
              return (
                <li key={data.id}>
                  <Postheader
                    userid={data.userid}
                    username={fullName}
                    userprofile={data.profile}
                  />
                  <div
                    className="followBtn"
                    onClick={() => {
                      followAuser(data.userid, userFirebase.auth.uid, false);
                    }}
                  >
                    Follow
                  </div>
                </li>
              );
            } else {
              if (!checkUseruid) {
                return (
                  <li key={data.id}>
                    <Postheader
                      userid={data.userid}
                      username={fullName}
                      userprofile={data.profile}
                    />
                    <div
                      className="followBtn"
                      onClick={() => {
                        followAuser(data.userid, userFirebase.auth.uid, true);
                      }}
                    >
                      unFollow
                    </div>
                  </li>
                );
              } else {
                return null;
              }
            }
          })}
        </ul>
      </FriendlistWapper>
    );
  } else {
    return <Loading />;
  }
};
const mapStateToProps = (state) => {
  return {
    userFirebase: state.firebase,
    Allusers: state.allUsers,
    loginuser: state.firestore.ordered.users,
  };
};
export default connect(mapStateToProps, {
  getAllUsers,
  clearthefriends,
  followAuser,
})(Friendlist);
