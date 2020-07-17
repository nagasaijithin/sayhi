import React from "react";
import Logo from "../svg/Logo2.svg";
import styled from "styled-components";
import { MainButton } from "../style/ui/components";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { userLogin, sendNotifi } from "../store/actions/init";
import { Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";

const LoginWapper = styled.div`
  height: 100vh;
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
      margin: 0 0 4rem;
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
      & > label {
        display: block;
      }
      & > input {
        padding: 1rem;
        font-size: 2rem;
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
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  loginSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email !== "" && password !== "") {
      this.props.userLogin(this.state);
    } else if (email === "" && password !== "") {
      this.props.sendNotifi(false, "Email Filed Is Empty");
    } else if (password === "" && email !== "") {
      this.props.sendNotifi(false, "Password Filed Is Empty");
    } else if (email === "" && password === "") {
      this.props.sendNotifi(false, "Login Fileds Are Ampty");
    }
  };
  inputHandler = (e) => {
    e.persist();

    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  render() {
    if (this.props.firebase.auth.uid) {
      return <Redirect to="/" />;
    }
    return (
      <LoginWapper>
        <Helmet>
          <title>Login - sayHi</title>
        </Helmet>
        <form onSubmit={this.loginSubmit}>
          <img src={Logo} alt="" />
          <div>
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              name="email"
              placeholder="Enter You'r Email"
              onChange={this.inputHandler}
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
            />
          </div>
          <MainButton bgwhite={true}>LogIn</MainButton>
          <span>
            I don't have an account <Link to="/signup">Create A Account</Link>
          </span>
        </form>
      </LoginWapper>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    firebase: state.firebase,
  };
};
export default connect(mapStateToProps, {
  userLogin,
  sendNotifi,
})(Login);
