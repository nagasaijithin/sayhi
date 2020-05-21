import React from "react";
import styled from "styled-components";

import { CardsWapper, CardContiner, Card } from "../style/ui/components";
import Postheader from "../components/postcontiner/postheader";
// import Postwithimage from "../components/postcontiner/postwithimage";
import Textpost from "../components/postcontiner/textpost";

const FormWapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 1rem;

  & > input {
    font-size: 1.4rem;
    padding: 0.5rem 1rem;
    flex: 1;
  }
  & > button {
    padding: 0.5rem 1rem;
    border: 0;
    background: var(--secondColor);
    color: var(--mainColor);
    margin: 0rem 1rem;
    border-radius: var(--mainborderRadius);
  }
`;
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
          <FormWapper>
            <input type="text" placeholder="Write you'r comment.." />
            <button>Comment</button>
          </FormWapper>
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
