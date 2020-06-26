import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Postheader from "./postheader";
import Likeandcomment from "./likeandcomment";
// import simpleimg from "../../assets/simple.jpg";
import { Card } from "../../style/ui/components";
import moment from "moment";
const ContentWapper = styled.div`
  font-size: 2rem;
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
    createAt,
    likes,
    postcontent,
    username,
    id,
    image,
    useruid,
    userprofile,
  } = props;
  const date =
    moment(createAt.toDate()).fromNow() === "a day ago"
      ? moment(createAt.toDate()).calendar()
      : moment(createAt.toDate()).fromNow();
  return (
    <Card>
      <Postheader
        date={date}
        username={username}
        userid={useruid}
        userprofile={userprofile}
      />
      <PostLink to={`/post/${id}`}>
        <ContentWapper>
          <p>{postcontent}</p>
        </ContentWapper>
        <ImgWapper>
          <img src={image} alt="heroimg" />
        </ImgWapper>
      </PostLink>
      <Likeandcomment
        likes={likes.length}
        likelist={likes}
        postid={id}
        comments={commentscount}
      />
    </Card>
  );
};

export default Postwithimage;
