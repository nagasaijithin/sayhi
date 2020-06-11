import React from "react";

import Createapost from "../components/postcontiner/createapost";
import Textpost from "../components/postcontiner/textpost";
import Postwithimage from "../components/postcontiner/postwithimage";

import { CardsWapper, CardContiner } from "../style/ui/components";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Home = (props) => {
  const uid = props.firebase.auth.uid;
  if (!uid) {
    return <Redirect to="/login" />;
  }
  return (
    <CardsWapper>
      <CardContiner>
        <Createapost />
        <Textpost />
        <Postwithimage />
        <Postwithimage />
        <Postwithimage />
      </CardContiner>
    </CardsWapper>
  );
};

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
  };
};
export default connect(mapStateToProps)(Home);
