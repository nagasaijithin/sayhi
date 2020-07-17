import React, { useEffect } from "react";

import Createapost from "../components/postcontiner/createapost";
import Textpost from "../components/postcontiner/textpost";
import Postwithimage from "../components/postcontiner/postwithimage";
import Loading from "../components/loading";

import { CardsWapper, CardContiner } from "../style/ui/components";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { intiPresence } from "../store/actions/init";
import { Helmet } from "react-helmet";
function useIntifbState(mathod) {
  useEffect(() => {
    mathod();
  }, [mathod]);
}
const Home = ({ firebase, posts, intiPresence }) => {
  useIntifbState(intiPresence);
  const uid = firebase.auth.uid;
  if (!uid) {
    return <Redirect to="/login" />;
  }
  if (posts) {
    return (
      <CardsWapper>
        <Helmet>
          <title>Home - sayHi</title>
        </Helmet>
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
  connect(mapStateToProps, { intiPresence })
)(Home);
