import React from "react";
import styled from "styled-components";

import { CardsWapper, CardContiner, Card } from "../style/ui/components";
import Postheader from "../components/postcontiner/postheader";
// import Postwithimage from "../components/postcontiner/postwithimage";
import Textpost from "../components/postcontiner/textpost";
import Inputandbutton from "../components/inputandbutton";
const CommentWapper = styled.div`
  margin: 2rem;
  & > p {
    margin: 1rem;
    font-size: 1.3rem;
  }
  & > span {
    margin: 1rem;
    padding: 0.5rem 1rem;
    border-radius: var(--mainborderRadius);
    background-color: var(--secondColor);
    color: var(--mainColor);
    cursor: pointer;
  }
`;
const Post = (props) => {
  // useGetPostId()
  return (
    <CardsWapper>
      <CardContiner>
        {/* <Postwithimage /> */}
        <Textpost />
        <Card>
          <div>
            <Postheader timeshow={true} />
          </div>
          <Inputandbutton
            placeholder="Write you'r comment"
            buttonContent="Comment"
          />
          <h1>Comments</h1>
          <CommentWapper>
            <Postheader />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium quo modi voluptatibus,
            </p>
            <span>Like 20</span>
          </CommentWapper>
          <CommentWapper>
            <Postheader />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium quo modi voluptatibus,
            </p>
            <span>Like 20</span>
          </CommentWapper>
          <CommentWapper>
            <Postheader />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium quo modi voluptatibus,
            </p>
            <span>Like 20</span>
          </CommentWapper>
          <CommentWapper>
            <Postheader />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium quo modi voluptatibus,
            </p>
            <span>Like 20</span>
          </CommentWapper>
        </Card>
      </CardContiner>
    </CardsWapper>
  );
};

export default Post;
