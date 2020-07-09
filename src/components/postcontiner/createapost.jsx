import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card } from "../../style/ui/components";
import { connect } from "react-redux";
import { addPost } from "../../store/actions/posts";
import { getfullUserdata } from "../../store/actions/init";
import { compose } from "redux";
import Loading from "../loading";
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
    & > img {
      height: 100%;
      width: 100%;
      border-radius: 50%;
    }
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
function useGetUserData(uid, mathod) {
  useEffect(() => {
    uid && mathod(uid);
  }, [uid, mathod]);
}
const Createapost = ({ addPost, users, uid, getfullUserdata }) => {
  const [imageVal, setimageVal] = useState(false);
  const [textVal, settextVal] = useState("");
  useGetUserData(uid, getfullUserdata);
  if (users) {
    const userName = users.firstname + " " + users.lastname;
    const profile = users.profile;

    const formHandler = (e) => {
      e.preventDefault();
      e.persist();
      if (e.target.postText.value !== "") {
        addPost(e.target.postText.value, e.target.postImage, userName, profile);
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
          <div>
            {profile === "false" ? (
              <img src={`https://robohash.org/${userName}`} alt={userName} />
            ) : (
              <img src={profile} alt={userName} />
            )}
          </div>
          <h2>{userName}</h2>
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
  } else {
    return <Loading />;
  }
};
const mapStateToProps = (state) => {
  return {
    users: state.fullprofile,
    uid: state.firebase.auth.uid,
  };
};
export default compose(
  connect(mapStateToProps, {
    addPost,
    getfullUserdata,
  })
)(Createapost);
