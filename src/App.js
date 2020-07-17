import React, { useEffect } from "react";
import Saidnav from "./components/saidnav/saidnav";
import MaincontentWapper from "./components/mainContent/maincontentWapper";
import WayNotifier from "./components/waynotifier";
import Popup from "./components/popup";
import styled from "styled-components";
import { Route } from "react-router-dom";
import history from "./history";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Notifications from "./pages/notifications";
import Messages from "./pages/messages";
import Logout from "./pages/logout";
import Post from "./pages/post";
import editprofile from "./pages/editprofile";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Friendlist from "./pages/friendlist";

import { intiPresence, cleartAc } from "./store/actions/init";
import { connect } from "react-redux";
const AppWapper = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-auto-rows: auto;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;
const allRountes = [
  { path: "/", component: Home },
  { path: "/profile/:id", component: Profile },
  { path: "/notifications", component: Notifications },
  { path: "/messages", component: Messages },
  { path: "/messages/:uid", component: Messages },
  { path: "/editprofile/:id", component: editprofile },
  { path: "/logout", component: Logout },
  { path: "/post/:id", component: Post },
  { path: "/login", component: Login },
  { path: "/Signup", component: Signup },
  { path: "/findfriends", component: Friendlist },
];
function useIntifbState(mathod) {
  useEffect(() => {
    mathod();
  }, [mathod]);
}

history.listen((location, action) => {
  window.scrollTo(0, 0);
});

function App({ intiPresence, tAc, cleartAc }) {
  useIntifbState(intiPresence);
  return (
    <>
      <AppWapper>
        <Saidnav />
        <MaincontentWapper>
          {allRountes.map((route, i) => (
            <Route exact {...route} key={i} />
          ))}
        </MaincontentWapper>
      </AppWapper>
      <WayNotifier />
      {tAc ? <Popup cleartAc={cleartAc} /> : null}
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    tAc: state.init.tAc,
  };
};
export default connect(mapStateToProps, {
  intiPresence,
  cleartAc,
})(App);
