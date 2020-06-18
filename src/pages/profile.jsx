import React from "react";
import styled from "styled-components";
import {
  MainButton,
  MainLink,
  CardsWapper,
  CardContiner,
} from "../style/ui/components";
import simple from "../assets/simple.jpg";
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
const Profile = (props) => {
  const uid = props.firebase.auth.uid;
  if (!uid) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <ProfileContentWapper>
        <div className="userinfo">
          <ImageWapper>
            <img src={simple} alt="UserImage" />
          </ImageWapper>
          <h2>Nagasai Jithin</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
            molestiae nulla voluptates nobis optio, totam cumque sapiente labore
            repellat provident praesentium.
          </p>
          <div>
            <ButtonWapper>Follow</ButtonWapper>
            <LinkWapper to="/messages/092">Message</LinkWapper>
            <LinkWapper to="/editprofile/092">Edit you'r Profile</LinkWapper>
          </div>
        </div>
      </ProfileContentWapper>
      <UserPostWapper>
        <h2>Nagasai Jithin Post's</h2>
        <CardsWapper>
          <CardContiner>
            <Createapost />
            {props.posts &&
              props.posts.map((data, i) => {
                return data.image !== "false" ? (
                  <Postwithimage key={i} {...data} />
                ) : (
                  <Textpost key={i} {...data} />
                );
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
  };
};
export default compose(
  firestoreConnect(() => [
    { collection: "posts", orderBy: ["createAt", "desc"] },
  ]),
  connect(mapStateToProps)
)(Profile);
