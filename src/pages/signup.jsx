import React from "react";
import Logo from "../svg/Logo2.svg";
import styled from "styled-components";
import { MainButton } from "../style/ui/components";
import { Link } from "react-router-dom";
const SignupWapper = styled.div`
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
const Signup = () => {
  return (
    <SignupWapper>
      <div>
        <img src={Logo} alt="" />
        <div>
          <label htmlFor="Firstname">Firstname</label>
          <input
            type="text"
            id="Firstname"
            placeholder="Enter you'r Firstname"
          />
        </div>
        <div>
          <label htmlFor="Lastname">Lastname</label>
          <input type="text" id="Lastname" placeholder="Enter you'r Lastname" />
        </div>
        <div>
          <label htmlFor="Email">Email</label>
          <input type="email" id="Email" placeholder="Enter you'r Email" />
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            placeholder="Enter You'r Password"
          />
        </div>
        <div>
          <label htmlFor="rePassword">ReEnter-Password</label>
          <input
            type="password"
            id="rePassword"
            placeholder="ReEnter-Password"
          />
        </div>
        <MainButton bgwhite={true}>Signup</MainButton>
        <span>
          I have an account <Link to="/login">Login</Link>
        </span>
      </div>
    </SignupWapper>
  );
};

export default Signup;
