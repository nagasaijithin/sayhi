import React from "react";
import styled from "styled-components";
import Postheader from "./postheader";
import Likeandcomment from "./likeandcomment";
import { Link } from "react-router-dom";
import { Card } from "../../style/ui/components";

const ContentWapper = styled.div`
  margin: 1rem;
  font-size: 1.8rem;
`;

const PostLink = styled(Link)`
  text-decoration: none;
  color: var(--mainTextColor);
`;
const Textpost = (props) => {
  const { commentscount, date, likescount, postcontent, userName } = props;
  return (
    <Card>
      <Postheader date={date} username={userName} />
      <PostLink to="/post/123">
        <ContentWapper>
          <p>{postcontent}</p>
        </ContentWapper>
      </PostLink>
      <Likeandcomment likes={likescount} comments={commentscount} />
    </Card>
  );
};

export default Textpost;
