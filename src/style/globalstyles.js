import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    --mainColor: ${(props) => props.theme.color.main};
    --WhiteColor: white;
    --secondColor: ${(props) => props.theme.color.second};
    --innerShadow: ${(props) => props.theme.shadow.innerShadow};
    --mainborderRadius: ${(props) => props.theme.borderRadius};
    --mainTextColor: black;
}
html{
    font-size: 65.2%;
    box-sizing: border-box;
    padding:0;
    margin: 0;
    @media ${(props) => props.theme.mediaQuires.lapMid} {
      font-size: 59.2%;
    }
    @media ${(props) => props.theme.mediaQuires.mobileSmal} { 
      font-size: 54.2%;

    }
    
  }
  *{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    outline: none;
  }
  body {
    font-family: 'Manrope', sans-serif;
  }
`;
export default GlobalStyle;
