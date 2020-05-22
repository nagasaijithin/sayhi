import React from "react";
import styled from "styled-components";
import { MainButton, CardsWapper, CardContiner } from "../style/ui/components";
import simple from "../assets/simple.jpg";
import Textpost from "../components/postcontiner/textpost";
import Postwithimage from "../components/postcontiner/postwithimage";
import Createapost from "../components/postcontiner/createapost";
const ButtonWapper = styled(MainButton)`
  padding: 0.5rem 2rem;
  font-size: 2rem;
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
      width: 30%;
      text-align: center;
      font-size: 1.4rem;
    }
    & > div {
      display: flex;
      justify-content: space-around;
      width: 100%;
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
const Profile = () => {
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
            <ButtonWapper>Message</ButtonWapper>
            <ButtonWapper>Edite you'r info</ButtonWapper>
          </div>
        </div>
      </ProfileContentWapper>
      <UserPostWapper>
        <h2>Nagasai Jithin Post's</h2>
        <CardsWapper>
          <CardContiner>
            <Createapost />
            <Postwithimage />
            <Textpost />
          </CardContiner>
        </CardsWapper>
      </UserPostWapper>
    </>
  );
};

export default Profile;
