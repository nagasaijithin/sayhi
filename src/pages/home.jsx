import React from "react";

import Createapost from "../components/postcontiner/createapost";
import Textpost from "../components/postcontiner/textpost";
import Postwithimage from "../components/postcontiner/postwithimage";

import { CardsWapper, CardContiner } from "../style/ui/components";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const Home = ({ firebase, posts }) => {
  const uid = firebase.auth.uid;
  if (!uid) {
    return <Redirect to="/login" />;
  }
  return (
    <CardsWapper>
      <CardContiner>
        <Createapost />
        {posts.map((data, i) => {
          return data.image ? (
            <Postwithimage key={i} {...data} />
          ) : (
            <Textpost key={i} {...data} />
          );
        })}
      </CardContiner>
    </CardsWapper>
  );
};

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
    posts: state.posts.posts,
    state,
  };
};
export default compose(
  firestoreConnect(() => ["posts"]),
  connect(mapStateToProps)
)(Home);
