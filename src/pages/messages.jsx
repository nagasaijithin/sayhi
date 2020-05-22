import React from "react";
import styled from "styled-components";
import Postheader from "../components/postcontiner/postheader";
import Inputandbutton from "../components/inputandbutton";
const MessageWapper = styled.div`
  display: flex;
  background: white;
  height: 90%;
  width: 90%;
  margin: 0 auto;
  border-radius: var(--mainborderRadius);
  & > .first-element {
    padding: 1rem;
    height: 90vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 1rem;
    }
    &::-webkit-scrollbar-track {
      background: white;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--secondColor);
      border-radius: var(--mainborderRadius);
    }
    & > div {
      padding: 1rem;
    }
  }
  & > .last-element {
    flex: 1;
  }
`;

const SideMessageWapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1rem;
  & > .message-head {
    padding: 1rem 2rem;
  }
  & > .chat-wapper {
    flex: 1;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 1rem;
    }
    &::-webkit-scrollbar-track {
      background: white;
    }
    &::-webkit-scrollbar-thumb {
      background-color: var(--secondColor);
      border-radius: var(--mainborderRadius);
    }
    & > ul {
      height: 0vh;
      display: flex;
      flex-direction: column;
      & li:nth-child(even) {
        align-self: flex-end;
        border-radius: 30px 30px 0px 30px;
      }
      & > li {
        background: var(--secondColor);
        color: var(--mainColor);
        padding: 1rem;
        width: 30%;
        border-radius: 30px 30px 30px 0px;
        font-size: 1.4rem;
        margin: 1rem;
        list-style-type: none;
      }
    }
  }
`;
const StartingInbox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  & > h1 {
    font-size: 3rem;
  }
  & > p {
    font-size: 1.5rem;
  }
`;
const Messages = (props) => {
  return (
    <MessageWapper>
      <div className="first-element">
        <div>
          <Postheader message={"hi"} path="/messages/654" />
        </div>
        <div>
          <Postheader message={"hello"} path="/messages/654" />
        </div>
        <div>
          <Postheader message={"How are you?"} path="/messages/654" />
        </div>
        <div>
          <Postheader message={"namaste anna "} path="/messages/654" />
        </div>
        <div>
          <Postheader message={"am sangathi"} path="/messages/654" />
        </div>
        <div>
          <Postheader message={"hi"} path="/messages/654" />
        </div>
        <div>
          <Postheader message={"hi"} path="/messages/654" />
        </div>
        <div>
          <Postheader message={"hi"} path="/messages/654" />
        </div>
        <div>
          <Postheader message={"hi"} path="/messages/654" />
        </div>
        <div>
          <Postheader message={"hi"} path="/messages/654" />
        </div>
        <div>
          <Postheader message={"hi"} path="/messages/654" />
        </div>
      </div>
      <div className="last-element">
        {props.match.params.uid ? (
          <SideMessageWapper>
            <div className="message-head">
              <Postheader timeshow={true} />
            </div>
            <div className="chat-wapper">
              <ul>
                <li>hi</li>
                <li>hi!</li>
                <li>How are you</li> <li>hi</li>
                <li>hi!</li>
                <li>How are you</li> <li>hi</li>
                <li>hi!</li>
                <li>How are you</li> <li>hi</li>
                <li>hi!</li>
                <li>How are you</li> <li>hi</li>
                <li>hi!</li>
                <li>How are you</li> <li>hi</li>
                <li>hi!</li>
                <li>How are you</li> <li>hi</li>
                <li>hi!</li>
                <li>How are you</li> <li>hi</li>
                <li>hi!</li>
                <li>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Iure, molestiae velit delectus numquam consequatur quas dolore
                  cumque ratione? Deleniti incidunt id animi repudiandae odio
                  laudantium, voluptas repellendus eum corporis maiores
                  accusamus molestias quae eos. Laborum, dolores velit? Non
                  numquam excepturi porro ducimus delectus, ab temporibus saepe
                  dicta voluptas dolorum. Odit voluptas ut, nulla rem numquam
                  non ducimus ea. Consequatur laudantium minima qui praesentium
                  veritatis quaerat voluptate maiores. Ab aspernatur perferendis
                  temporibus necessitatibus dignissimos et praesentium eaque
                  sint! Officiis doloribus velit harum itaque officia voluptatum
                  a laudantium dolorem omnis similique ut, eos quibusdam
                  repellendus est illo quisquam sapiente fugit debitis maiores.
                </li>
              </ul>
            </div>
            <div>
              <Inputandbutton
                placeholder="Enter you'r message"
                buttonContent="Send"
              />
            </div>
          </SideMessageWapper>
        ) : (
          <StartingInbox>
            <h1>Wellcome To SayHi Messenger</h1>
            <p>
              find new friends and chat with them, we clear the all chat in
              every 24hours
            </p>
          </StartingInbox>
        )}
      </div>
    </MessageWapper>
  );
};

export default Messages;
