import React from "react";
import styled from "styled-components";
import Logo from "../../svg/Logo.svg";

import NavLinks from "./navlinks";

const SaidnavWapper = styled.div`
  @media ${(props) => props.theme.mediaQuires.lapLarg} {
    order: 2;
    bottom: 0;
    position: sticky;
    z-index: 20;
  }
  & > div {
    height: 100vh;
    text-align: center;
    position: sticky;
    top: 0;

    @media ${(props) => props.theme.mediaQuires.lapLarg} {
      height: 10vh;
      background-color: var(--WhiteColor);
      display: flex;
      box-shadow: 1px 1px 5px black;
      position: unset;
    }
  }
`;

const ImageWapper = styled.div`
  @media ${(props) => props.theme.mediaQuires.lapLarg} {
    display: none;
  }
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
