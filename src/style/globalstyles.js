import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    --mainColor: ${(props) => props.theme.color.main};
    --secondColor: ${(props) => props.theme.color.second};
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  }
`;
export default GlobalStyle;
