import React from "react";
import Saidnav from "./components/saidnav/saidnav";
import MaincontentWapper from "./components/mainContent/maincontentWapper";
import styled from "styled-components";
import { Route } from "react-router-dom";

import Home from "./pages/home";
import Profile from "./pages/profile";
import Notifications from "./pages/notifications";
import Messages from "./pages/messages";
import Logout from "./pages/logout";
import Post from "./pages/post";

const AppWapper = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-auto-rows: auto;
`;
const allRountes = [
  { path: "/", component: Home },
  { path: "/profile/:id", component: Profile },
  { path: "/notifications", component: Notifications },
  { path: "/messages", component: Messages },
  { path: "/messages/:uid", component: Messages },
  { path: "/logout", component: Logout },
  { path: "/post/:id", component: Post },
];
function App() {
  return (
    <AppWapper>
      <Saidnav />
      <MaincontentWapper>
        {allRountes.map((route, i) => (
          <Route exact {...route} key={i} />
        ))}
      </MaincontentWapper>
    </AppWapper>
  );
}

export default App;
