import React from "react";
import styled from "styled-components";
import Postheader from "./postheader";
import Likeandcomment from "./likeandcomment";
import { Link } from "react-router-dom";
import { Card } from "../../style/ui/components";
import moment from "moment";
const ContentWapper = styled.div`
  margin: 1rem;
  font-size: 1.8rem;
`;

const PostLink = styled(Link)`
  text-decoration: none;
  color: var(--mainTextColor);
`;
const Textpost = (props) => {
  const {
    commentscount,
    createAt,
    likes,
    postcontent,
    username,
    id,
    useruid,
  } = props;

  const date =
    moment(createAt.toDate()).fromNow() === "a day ago"
      ? moment(createAt.toDate()).calendar()
      : moment(createAt.toDate()).fromNow();
  return (
    <Card>
      <Postheader date={date} username={username} userid={useruid} />
      <PostLink to={`/post/${id}`}>
        <ContentWapper>
          <p>{postcontent}</p>
        </ContentWapper>
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

export default Textpost;
