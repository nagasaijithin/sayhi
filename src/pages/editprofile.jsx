import React from "react";
import styled from "styled-components";
import { MainButton } from "../style/ui/components";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { editeProfile } from "../store/actions/init";
const ButtonOnSave = styled(MainButton)`
  padding: 1rem;
  border-radius: var(--mainborderRadius);
  cursor: pointer;
  font-size: 2rem;
`;
const ContentWapper = styled.form`
  height: 90%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  @media ${(props) => props.theme.mediaQuires.lapLarg} {
    flex-direction: column;
    height: 90vh;
  }

  & > label {
    width: 20rem;
    height: 20rem;
    background: var(--WhiteColor);
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    & > span {
      font-size: 3rem;
      font-weight: 900;
      display: inline-block;
      position: absolute;
      top: 100%;
      left: 100%;
      transform: translate(-100%, -100%);
      padding: 0.5rem 1.5rem;
      border-radius: 50%;
      background: var(--secondColor);
      color: var(--mainColor);
    }
  }
  & > #profile {
    display: none;
  }
`;
const NameBioWapper = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-size: 2rem;
  & > div {
    & > label {
      display: block;
    }
    & > input {
      padding: 1rem;
      font-size: 2rem;
      border: none;
      border-bottom: 3px solid var(--secondColor);
      background: var(--mainColor);
    }
  }
`;
class Editprofile extends React.Component {
  constructor(props) {
    super(props);
    const uid = this.props.firebase.auth.uid;
    if (!uid) {
      return <Redirect to="/login" />;
    }
    this.state = {
      firstname: "",
      lastname: "",
      bio: "",
    };
  }
  formHandler = (e) => {
    e.preventDefault();
    const { firstname, lastname, bio } = this.state;
    if (
      firstname !== "" ||
      lastname !== "" ||
      bio !== "" ||
      e.target.profile.value !== ""
    ) {
      this.props.editeProfile(e.target.profile, this.state);
      let reset = {
        firstname: "",
        lastname: "",
        bio: "",
      };
      this.setState({
        ...reset,
      });
    } else {
      console.log("error");
    }
  };
  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    return (
      <ContentWapper onSubmit={this.formHandler}>
        <label htmlFor="profile">
          <span>+</span>
        </label>
        <input type="file" id="profile" accept="image/*" name="profile" />
        <NameBioWapper>
          <div>
            <label htmlFor="name">FirstName</label>
            <input
              placeholder="Type you'r FirstName"
              type="text"
              name="firstname"
              id="firstname"
              onChange={this.inputHandler}
            />
          </div>
          <div>
            <label htmlFor="name">LastName</label>
            <input
              placeholder="Type you'r LastName"
              type="text"
              name="lastname"
              id="lastname"
              onChange={this.inputHandler}
            />
          </div>
          <div>
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              id="bio"
              placeholder="Type you'r Bio"
              name="bio"
              onChange={this.inputHandler}
            />
          </div>
        </NameBioWapper>
        <ButtonOnSave>Save </ButtonOnSave>
      </ContentWapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
  };
};
export default connect(mapStateToProps, {
  editeProfile,
})(Editprofile);
