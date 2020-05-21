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
const Textpost = () => {
  return (
    <Card>
      <PostLink to="/post/123">
        <Postheader />
        <ContentWapper>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum,
            repellendus inventore ad mollitia harum sit eius voluptas officia
            dolore quam?
          </p>
        </ContentWapper>
      </PostLink>
      <Likeandcomment />
    </Card>
  );
};

export default Textpost;
