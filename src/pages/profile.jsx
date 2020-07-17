import React, { useEffect } from "react";
import styled from "styled-components";
import {
  MainButton,
  MainLink,
  CardsWapper,
  CardContiner,
} from "../style/ui/components";
import Textpost from "../components/postcontiner/textpost";
import Postwithimage from "../components/postcontiner/postwithimage";
import Createapost from "../components/postcontiner/createapost";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { followAuser, getfullUserdata } from "../store/actions/init";
import { Helmet } from "react-helmet";
import Loading from "../components/loading";
const ButtonWapper = styled(MainButton)`
  padding: 0.5rem 2rem;
  font-size: 1.7rem;
  border-radius: var(--mainborderRadius);
  cursor: pointer;
`;
const LinkWapper = styled(MainLink)`
  padding: 0.5rem 2rem;
  font-size: 1.7rem;
  border-radius: var(--mainborderRadius);
  cursor: pointer;
`;
const ProfileContentWapper = styled.div`
  width: 100%;
  height: 80vh;
  & > .userinfo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    & > h2 {
      font-size: 3rem;
    }
    & > p {
      width: 50%;
      text-align: center;
      font-size: 1.6rem;
    }
    & > div {
      display: flex;
      justify-content: space-around;
      width: 100%;
      flex-wrap: wrap;
    }
  }
`;
const ImageWapper = styled.div`
  & > img {
    height: 20rem;
    object-fit: fill;
    width: 20rem;
    border-radius: 50%;
  }
`;
const UserPostWapper = styled.div`
  margin: 2rem;
  & > h2 {
    font-size: 2.4rem;
  }
`;
function useGetUserData(uid, mathod) {
  useEffect(() => {
    console.log("4594598");
    uid && mathod(uid);
  }, [uid, mathod]);
}
const Profile = ({
  posts,
  userfirebase,
  user,
  match,
  history,
  followAuser,
  getfullUserdata,
}) => {
  const loginuid = userfirebase.auth.uid;
  const viewuserid = match.params.id;
  useGetUserData(viewuserid, getfullUserdata);
  if (!loginuid) {
    return <Redirect to="/login" />;
  }
  if (user && posts) {
    let username = user.firstname + " " + user.lastname;
    let loginuserFollowOrNot = user.followers.some((data) => data === loginuid);
    let { bio, followers, profile, following } = user;
    return (
      <>
        <ProfileContentWapper>
          <Helmet>
            <title>{`${username}`} - sayHi</title>
          </Helmet>
          <div className="userinfo">
            <ImageWapper>
              {profile === "false" ? (
                <img src={`https://robohash.org/${username}`} alt={username} />
              ) : (
                <img src={profile} alt={username} />
              )}
            </ImageWapper>
            <h2>{username}</h2>
            <p>{bio}</p>
            <div>
              {loginuid === viewuserid ? (
                <>
                  <LinkWapper to={`/editprofile/${viewuserid}`}>
                    Edit you'r Profile
                  </LinkWapper>
                  <ButtonWapper>Followers {followers.length}</ButtonWapper>
                  <ButtonWapper>Following {following.length}</ButtonWapper>
                </>
              ) : (
                <>
                  <ButtonWapper
                    onClick={() => {
                      getfullUserdata(viewuserid);
                      followAuser(
                        match.params.id,
                        loginuid,
                        loginuserFollowOrNot
                      );
                    }}
                  >
                    {loginuserFollowOrNot ? "Unfollow" : "Follow"}
                  </ButtonWapper>
                  <ButtonWapper>Followers {followers.length}</ButtonWapper>
                  <ButtonWapper>Following {following.length}</ButtonWapper>
                  {loginuserFollowOrNot && (
                    <LinkWapper to={`/messages/${viewuserid}`}>
                      Message
                    </LinkWapper>
                  )}
                </>
              )}
            </div>
          </div>
        </ProfileContentWapper>
        <UserPostWapper>
          <h2>{username} Post's</h2>
          <CardsWapper>
            <CardContiner>
              {loginuid === viewuserid && <Createapost />}
              {posts.map((data, i) => {
                if (data.useruid === viewuserid) {
                  return data.image !== "false" ? (
                    <Postwithimage key={i} {...data} />
                  ) : (
                    <Textpost key={i} {...data} />
                  );
                }
                return "";
              })}
            </CardContiner>
          </CardsWapper>
        </UserPostWapper>
      </>
    );
  } else {
    return <Loading />;
  }
};

const mapStateToProps = (state) => {
  return {
    userfirebase: state.firebase,
    posts: state.firestore.ordered.posts,
    user: state.fullprofile,
    uid: state.firebase.auth.uid,
  };
};
export default compose(
  connect(mapStateToProps, {
    followAuser,
    getfullUserdata,
  }),
  firestoreConnect((props) => {
    return [
      { collection: "posts", orderBy: ["createAt", "desc"] },
      { collection: "users", doc: props.uid },
    ];
  })
)(Profile);
