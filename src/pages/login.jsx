import React from "react";
import Logo from "../svg/Logo2.svg";
import styled from "styled-components";
import { MainButton } from "../style/ui/components";
import { Link } from "react-router-dom";
const LoginWapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  & > div {
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
const Login = () => {
  return (
    <LoginWapper>
      <div>
        <img src={Logo} alt="" />
        <div>
          <label htmlFor="Email">Email</label>
          <input type="email" id="Email" placeholder="Enter You'r Email" />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            placeholder="Enter You'r Password"
          />
        </div>
        <MainButton bgwhite={true}>LogIn</MainButton>
        <MainButton bgwhite={true}>LogIn With Google</MainButton>
        <span>
          I don't have an account <Link to="/signup">Create A Account</Link>
        </span>
      </div>
    </LoginWapper>
  );
};

export default Login;
