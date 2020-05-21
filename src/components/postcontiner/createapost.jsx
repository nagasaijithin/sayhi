import React from "react";
import styled from "styled-components";
import { Card } from "../../style/ui/components";
const CreatePostWapper = styled(Card)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  & > div {
    margin: 1rem 0;
  }
`;
const PersonWapper = styled.div`
  display: flex;
  align-items: center;
  & > div {
    width: 5rem;
    height: 5rem;
    background: var(--mainColor);
    border-radius: 50%;
  }
  & > h2 {
    padding: 1rem;
  }
`;

const FormWapper = styled.div`
  display: flex;
  flex-direction: column;
  & > input {
    flex: 1;
    font-size: 2rem;
    padding: 1rem;
  }

  & > label {
    padding: 0.5rem 2rem;
    margin: 0.6rem;
    text-align: center;

    cursor: pointer;
    & > input[type="file"] {
      display: none;
    }
  }
  & > button {
    margin: 0.6rem;
    padding: 1rem;

    cursor: pointer;
  }

  & > .postbtn {
    font-size: 1.3rem;
    background-color: var(--secondColor);
    color: var(--mainColor);
    border: none;
    border-radius: var(--mainborderRadius);
  }
`;
const Createapost = () => {
  return (
    <CreatePostWapper>
      <PersonWapper>
        <div></div>
        <h2>Nagasai jithin</h2>
      </PersonWapper>
      <FormWapper>
        <input type="text" placeholder="Write somthing ....." />
        <label htmlFor="file" className="postbtn">
          <input id="file" type="file" accept="image/*" />
          +Add A Photo
        </label>
        <button className="postbtn">Post</button>
      </FormWapper>
    </CreatePostWapper>
  );
};

export default Createapost;
