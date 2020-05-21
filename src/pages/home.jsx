import React from "react";
// import styled from "styled-components";

import Createapost from "../components/postcontiner/createapost";
import Textpost from "../components/postcontiner/textpost";
import Postwithimage from "../components/postcontiner/postwithimage";

import { CardsWapper, CardContiner } from "../style/ui/components";

const Home = () => {
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

export default Home;
