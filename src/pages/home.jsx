import React from "react";

import Createapost from "../components/postcontiner/createapost";
import Textpost from "../components/postcontiner/textpost";
import Postwithimage from "../components/postcontiner/postwithimage";
import Loading from "../components/loading";

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
  if (posts) {
    return (
      <CardsWapper>
        <CardContiner>
          <Createapost />
          {posts.map((data, i) => {
            return data.image !== "false" ? (
              <Postwithimage key={i} {...data} />
            ) : (
              <Textpost key={i} {...data} />
            );
          })}
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
  };
};
export default compose(
  firestoreConnect(() => [
    { collection: "posts", orderBy: ["createAt", "desc"] },
  ]),
  connect(mapStateToProps)
)(Home);
