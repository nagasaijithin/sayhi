import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    --mainColor: ${(props) => props.theme.color.main};
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
    outline: none;
}
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
  body {
    font-family: 'Manrope', sans-serif;
  }
`;
export default GlobalStyle;
