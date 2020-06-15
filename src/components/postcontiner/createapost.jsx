import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "../../style/ui/components";
import { connect } from "react-redux";
import { addPost } from "../../store/actions/posts";
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

const FormWapper = styled.form`
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
const Createapost = (props) => {
  const [imageVal, setimageVal] = useState(false);
  const [textVal, settextVal] = useState("");
  const formHandler = (e) => {
    e.preventDefault();
    e.persist();
    if (e.target.postText.value !== "") {
      props.addPost(e.target.postText.value, e.target.postImage.value);
      settextVal("");
      setimageVal(false);
    }
  };
  const photoHandler = (e) => {
    e.target.value !== "" && setimageVal(true);
  };
  const inputHandler = (e) => {
    settextVal(e.target.value);
  };
  return (
    <CreatePostWapper>
      <PersonWapper>
        <div></div>
        <h2>Nagasai jithin</h2>
      </PersonWapper>
      <FormWapper onSubmit={formHandler}>
        <input
          type="text"
          name="postText"
          placeholder="Write somthing ....."
          onChange={inputHandler}
          value={textVal}
        />
        <label htmlFor="file" className="postbtn">
          <input
            id="file"
            type="file"
            name="postImage"
            accept="image/*"
            onChange={photoHandler}
          />
          {imageVal ? "Photo is Add" : "+Add A Photo"}
        </label>
        <button className="postbtn">Post</button>
      </FormWapper>
    </CreatePostWapper>
  );
};

export default connect(null, {
  addPost,
})(Createapost);
