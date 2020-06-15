import React from "react";
import styled from "styled-components";

import heartflame from "../../svg/heartflame.svg";
import commenticon from "../../svg/comment.svg";
const LikeAndCommentWapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.42);
  border-radius: var(--mainborderRadius);
  & > div {
    display: flex;
    align-items: center;
    & > img {
      height: 3rem;
      cursor: pointer;
    }
    & > span {
      padding: 0 1rem;
      font-size: 1.2rem;
    }
  }
`;
const Likeandcomment = ({ likes, comments }) => {
  return (
    <LikeAndCommentWapper>
      <div>
        <img src={heartflame} alt="unlikeheart" />
        <span>{likes} Likes</span>
      </div>
      <div>
        <img src={commenticon} alt="commenticon" />
        <span>{comments} comments</span>
      </div>
    </LikeAndCommentWapper>
  );
};

export default Likeandcomment;
