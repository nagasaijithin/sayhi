import React from "react";
import Logo from "../svg/Logo2.svg";
import styled from "styled-components";
import { MainButton } from "../style/ui/components";
import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createNewUser, sendNotifi } from "../store/actions/init";
import { Helmet } from "react-helmet";
const SignupWapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > form {
    background: var(--secondColor);
    width: 50%;
    color: var(--WhiteColor);
    border-radius: var(--mainborderRadius);
    box-shadow: var(--innerShadow);
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    padding: 3rem;
    justify-content: space-around;
    margin: 3rem 0;
    @media ${(props) => props.theme.mediaQuires.lapLarg} {
      margin: 3rem 0 8rem;
    }
    @media ${(props) => props.theme.mediaQuires.lapMid2} {
      width: 90%;
    }

    & > img {
      width: 40%;
      align-self: center;
    }
    & > * {
      margin: 1rem;
    }
    & > div {
      margin: 1rem;

      & > label {
        display: block;
      }
      & > input {
        padding: 1rem;
        font-size: 2rem;
        width: 100%;
        border: none;
        background: var(--secondColor);
        border-bottom: 2px solid var(--mainColor);
        color: var(--WhiteColor);
      }
    }
    & > span {
      font-size: 1.7rem;
      text-align: center;
      & > a {
        color: var(--WhiteColor);
      }
    }
  }
`;
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repassword: "",
    };
  }

  signupHandler = (e) => {
    e.preventDefault();
    const resetform = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      repassword: "",
    };

    const { firstname, lastname, email, password, repassword } = this.state;
    if (password.length < 8) {
      this.props.sendNotifi(
        false,
        "Password Length Is Short At List 8 Character"
      );
    }

    if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      password !== "" &&
      password.length >= 8 &&
      repassword !== "" &&
      password === repassword
    ) {
      this.props.createNewUser(this.state);
      this.setState({
        ...resetform,
      });
    } else if (
      firstname === "" &&
      lastname !== "" &&
      email !== "" &&
      password !== "" &&
      repassword !== "" &&
      password === repassword
    ) {
      this.props.sendNotifi(false, "Firstname filed Is Empty");
    } else if (
      firstname !== "" &&
      lastname === "" &&
      email !== "" &&
      password !== "" &&
      repassword !== "" &&
      password === repassword
    ) {
      this.props.sendNotifi(false, "Lastname filed Is Empty");
    } else if (
      firstname !== "" &&
      lastname !== "" &&
      email === "" &&
      password !== "" &&
      repassword !== "" &&
      password === repassword
    ) {
      this.props.sendNotifi(false, "Email filed Is Empty");
    } else if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      password === "" &&
      repassword !== "" &&
      password === repassword
    ) {
      this.props.sendNotifi(false, "Password filed Is Empty");
    } else if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      password !== "" &&
      repassword === "" &&
      password === repassword
    ) {
      this.props.sendNotifi(false, "Re-Password filed Is Empty");
    } else if (
      firstname !== "" &&
      lastname !== "" &&
      email !== "" &&
      password !== "" &&
      repassword !== "" &&
      password !== repassword
    ) {
      this.props.sendNotifi(false, "Re-Password filed Is Empty");
    } else if (
      firstname === "" &&
      lastname === "" &&
      email !== "" &&
      password === "" &&
      repassword === "" &&
      password === repassword
    ) {
      this.props.sendNotifi(false, "All fileds Is Empty");
    }
  };
  inputHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const uid = this.props.firebase.auth.uid;
    if (uid) {
      return <Redirect to="/login" />;
    }
    const { firstname, lastname, email, password, repassword } = this.state;
    return (
      <SignupWapper>
        <Helmet>
          <title>Signup - sayHi</title>
        </Helmet>
        <form onSubmit={this.signupHandler}>
          <img src={Logo} alt="" />
          <div>
            <label htmlFor="Firstname">Firstname</label>
            <input
              type="text"
              id="Firstname"
              placeholder="Enter you'r Firstname"
              name="firstname"
              onChange={this.inputHandler}
              value={firstname}
            />
          </div>
          <div>
            <label htmlFor="Lastname">Lastname</label>
            <input
              type="text"
              id="Lastname"
              placeholder="Enter you'r Lastname"
              name="lastname"
              onChange={this.inputHandler}
              value={lastname}
            />
          </div>
          <div>
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              name="email"
              placeholder="Enter you'r Email"
              onChange={this.inputHandler}
              value={email}
              required
            />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              name="password"
              placeholder="Enter You'r Password"
              onChange={this.inputHandler}
              value={password}
            />
          </div>
          <div>
            <label htmlFor="rePassword">ReEnter-Password</label>
            <input
              type="password"
              id="rePassword"
              name="repassword"
              placeholder="ReEnter-Password"
              onChange={this.inputHandler}
              value={repassword}
            />
          </div>
          <MainButton bgwhite={true}>Signup</MainButton>
          <span>
            I have an account <Link to="/login">Login</Link>
          </span>
        </form>
      </SignupWapper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
  };
};
export default connect(mapStateToProps, {
  createNewUser,
  sendNotifi,
})(Signup);
