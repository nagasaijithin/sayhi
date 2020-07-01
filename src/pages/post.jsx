import React, { useEffect } from "react";
import styled from "styled-components";

import { CardsWapper, CardContiner, Card } from "../style/ui/components";
import Postheader from "../components/postcontiner/postheader";
import Postwithimage from "../components/postcontiner/postwithimage";
import Textpost from "../components/postcontiner/textpost";
import Inputandbutton from "../components/inputandbutton";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import { addPostComment, liketheComment } from "../store/actions/posts";
import { getusername } from "../store/actions/init";
import Loading from "../components/loading";
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
const Post = ({
  match,
  firebase,
  posts,
  addPostComment,
  postcomments,
  getusername,
  curusername,
  curuserprofile,
  liketheComment,
}) => {
  const uid = firebase.auth.uid;
  useEffect(() => {
    getusername();
  }, [getusername, uid]);
  if (!uid) {
    return <Redirect to="/login" />;
  }
  if (posts && postcomments) {
    const commentHandler = (value) => {
      const { id } = posts[0];
      addPostComment(value, curusername, id, curuserprofile);
    };
    const likeaComment = (postid, id, cond) => {
      liketheComment(postid, id, cond);
    };
    return (
      <CardsWapper>
        <CardContiner>
          {posts.map((post, i) => {
            return post.image === "false" ? (
              <Textpost key={i} {...post} />
            ) : (
              <Postwithimage key={i} {...post} />
            );
          })}

          <Card>
            <div>
              <Postheader
                userid={uid}
                timeshow={true}
                username={curusername}
                userprofile={curuserprofile}
              />
            </div>
            <Inputandbutton
              placeholder="Write you'r comment"
              buttonContent="Comment"
              method={commentHandler}
            />
            <h1>Comments</h1>
            {postcomments.map((commentdata, i) => {
              const {
                id,
                username,
                comment,
                postid,
                likes,
                userid,
                commenteduserprofile,
              } = commentdata;
              const cond = likes.some((like) => like === uid);
              return (
                <CommentWapper key={i}>
                  <Postheader
                    userid={userid}
                    username={username}
                    userprofile={commenteduserprofile}
                  />
                  <p>{comment}</p>
                  <span onClick={() => likeaComment(postid, id, cond)}>
                    {cond ? "unlike" : "Like"} {likes.length}
                  </span>
                </CommentWapper>
              );
            })}
          </Card>
        </CardContiner>
      </CardsWapper>
    );
  } else {
    return <Loading />;
  }
};

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
    posts: state.firestore.ordered.posts,
    postcomments: state.firestore.ordered.comments,
    curusername: state.init.name,
    curuserprofile: state.init.profile,
  };
};
export default compose(
  firestoreConnect((props) => {
    return [
      {
        collection: "posts",
        doc: props.match.params.id,
      },
      {
        collection: "posts",
        orderBy: ["createAt", "desc"],
        doc: props.match.params.id,
        subcollections: [{ collection: "comments" }],
        storeAs: "comments",
      },
    ];
  }),
  connect(mapStateToProps, {
    addPostComment,
    liketheComment,
    getusername,
  })
)(Post);
