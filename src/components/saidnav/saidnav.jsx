import React from "react";
import styled from "styled-components";
import Logo from "../../svg/Logo.svg";

import NavLinks from "./navlinks";

const SaidnavWapper = styled.div`
  & > div {
    height: 100vh;
    text-align: center;
    position: sticky;
    top: 0;
  }
`;

const ImageWapper = styled.div`
  & > img {
    height: 10vh;
    margin: 1rem;
  }
`;
const Saidnav = () => {
  return (
    <SaidnavWapper>
      <div>
        <ImageWapper>
          <img src={Logo} alt="Logo" />
        </ImageWapper>
        <NavLinks />
      </div>
    </SaidnavWapper>
  );
};

export default Saidnav;