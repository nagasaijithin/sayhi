import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Postheader from "./postheader";
import Likeandcomment from "./likeandcomment";
import simpleimg from "../../assets/simple.jpg";
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
const Postwithimage = () => {
  return (
    <Card>
      <PostLink to="/post/1234">
        <Postheader />
        <ContentWapper>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi
            rem laboriosam voluptas cum accusantium perspiciatis saepe, odit
            harum obcaecati. Fugiat esse facilis, soluta eligendi omnis
            perspiciatis ratione distinctio cupiditate facere?
          </p>
        </ContentWapper>
        <ImgWapper>
          <img src={simpleimg} alt="heroimg" />
        </ImgWapper>
      </PostLink>
      <Likeandcomment />
    </Card>
  );
};

export default Postwithimage;
