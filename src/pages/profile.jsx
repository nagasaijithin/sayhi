import React from "react";
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
const Profile = ({ posts, firebase, user, match }) => {
  const loginuid = firebase.auth.uid;
  if (!loginuid) {
    return <Redirect to="/login" />;
  }
  const viewuserid = match.params.id;
  let username = user && user[0].firstname + " " + user[0].lastname;

  return (
    <>
      <ProfileContentWapper>
        <div className="userinfo">
          <ImageWapper>
            <img src={`https://robohash.org/${username}`} alt={username} />
          </ImageWapper>
          <h2>{username}</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
            molestiae nulla voluptates nobis optio, totam cumque sapiente labore
            repellat provident praesentium.
          </p>
          <div>
            {loginuid === viewuserid ? (
              <LinkWapper to={`/editprofile/${viewuserid}`}>
                Edit you'r Profile
              </LinkWapper>
            ) : (
              <>
                <ButtonWapper>Follow</ButtonWapper>
                <ButtonWapper>Followers 2</ButtonWapper>
                <LinkWapper to={`/messages/${viewuserid}`}>Message</LinkWapper>
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
            {posts &&
              posts.map((data, i) => {
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
};

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
    posts: state.firestore.ordered.posts,
    user: state.firestore.ordered.users,
  };
};
export default compose(
  firestoreConnect((props) => {
    return [
      { collection: "posts", orderBy: ["createAt", "desc"] },
      { collection: "users", doc: props.match.params.id },
    ];
  }),
  connect(mapStateToProps)
)(Profile);
