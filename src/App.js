import React from "react";
import Saidnav from "./components/saidnav/saidnav";
import MaincontentWapper from "./components/mainContent/maincontentWapper";
import styled from "styled-components";
const AppWapper = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-auto-rows: auto;
`;
function App() {
  return (
    <AppWapper>
      <Saidnav />
      <MaincontentWapper />
    </AppWapper>
  );
}

export default App;
