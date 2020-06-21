import React from "react";
import styled from "styled-components";

import heartflame from "../../svg/heartflame.svg";
import heart from "../../svg/heart.svg";
import commenticon from "../../svg/comment.svg";
import { connect } from "react-redux";

import { likeaPost, unlikeaPost } from "../../store/actions/posts";
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
      cursor: pointer;
    }
  }
`;
const Likeandcomment = ({
  likes,
  comments,
  likelist,
  firebase,
  likeaPost,
  unlikeaPost,
  postid,
}) => {
  let likeOrNot = likelist.some((ele) => {
    return ele === firebase.auth.uid && true;
  });

  const likeaPostHandler = (e) => {
    likeOrNot
      ? unlikeaPost(firebase.auth.uid, postid)
      : likeaPost(firebase.auth.uid, postid);
  };
  return (
    <LikeAndCommentWapper>
      <div onClick={likeaPostHandler}>
        {likeOrNot ? (
          <img src={heart} alt="unlikeheart" />
        ) : (
          <img src={heartflame} alt="unlikeheart" />
        )}
        <span>{likes} Likes</span>
      </div>
      <div>
        <img src={commenticon} alt="commenticon" />
        <span>{comments} comments</span>
      </div>
    </LikeAndCommentWapper>
  );
};
const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
  };
};
export default connect(mapStateToProps, {
  likeaPost,
  unlikeaPost,
})(Likeandcomment);
