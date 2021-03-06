import styled from "styled-components";
import { Link } from "react-router-dom";
export const Card = styled.div`
  background: white;
  padding: 1rem 2rem;
  margin: 2rem 0;
  border-radius: var(--mainborderRadius);
  box-shadow: var(--innerShadow);
`;
export const MainButton = styled.button`
  background-color: ${(props) =>
    props.bgwhite ? "var(--mainColor)" : "var(--secondColor)"};
  color: ${(props) =>
    props.bgwhite ? "var(--secondColor)" : "var(--mainColor)"};
  border: none;
  padding: 1rem;
  border-radius: var(--mainborderRadius);
  cursor: pointer;
  font-size: 2rem;
`;
export const MainGoogleButton = styled.div`
  background-color: ${(props) =>
    props.bgwhite ? "var(--mainColor)" : "var(--secondColor)"};
  color: ${(props) =>
    props.bgwhite ? "var(--secondColor)" : "var(--mainColor)"};
  border: none;
  padding: 1rem;
  border-radius: var(--mainborderRadius);
  cursor: pointer;
  font-size: 2rem;
  text-align: center;
`;

export const MainLink = styled(Link)`
  background-color: var(--secondColor);
  color: var(--mainColor);
  border: none;
  text-decoration: none;
  padding: 1rem;
  border-radius: var(--mainborderRadius);
  font-size: 2rem;
`;
export const CardsWapper = styled.div`
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media ${(props) => props.theme.mediaQuires.mobileLar} {
    padding: 0;
  }
`;
export const CardContiner = styled.div`
  width: 40vw;
  @media ${(props) => props.theme.mediaQuires.lapLarg} {
    width: 60vw;
  }
  @media ${(props) => props.theme.mediaQuires.lapMid} {
    width: 70vw;
  }
  @media ${(props) => props.theme.mediaQuires.mobileLar} {
    width: 90vw;
  }
`;
