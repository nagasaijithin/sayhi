import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Postheader from "./postheader";
import Likeandcomment from "./likeandcomment";
// import simpleimg from "../../assets/simple.jpg";
import { Card } from "../../style/ui/components";

const ContentWapper = styled.div`
  font-size: 1.4rem;
  margin: 1rem;
`;
const ImgWapper = styled.div`
  margin: 1rem;
  & > img {
    object-fit: fill;
    width: 100%;
  }
`;
const PostLink = styled(Link)`
  text-decoration: none;
  color: var(--mainTextColor);
`;
const Postwithimage = (props) => {
  const {
    commentscount,
    date,
    likescount,
    postcontent,
    userName,
    image,
  } = props;
  return (
    <Card>
      <Postheader date={date} username={userName} />
      <PostLink to="/post/1234">
        <ContentWapper>
          <p>{postcontent}</p>
        </ContentWapper>
        <ImgWapper>
          <img src={image} alt="heroimg" />
        </ImgWapper>
      </PostLink>
      <Likeandcomment likes={likescount} comments={commentscount} />
    </Card>
  );
};

export default Postwithimage;
