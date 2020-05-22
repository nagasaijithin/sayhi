import styled from "styled-components";
// import { Link } from "react-router-dom";
export const Card = styled.div`
  background: white;
  padding: 1rem 2rem;
  margin: 2rem 0;
  border-radius: var(--mainborderRadius);
  box-shadow: var(--innerShadow);
`;
export const MainButton = styled.button`
  background-color: var(--secondColor);
  color: var(--mainColor);
  border: none;
`;
export const CardsWapper = styled.div`
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const CardContiner = styled.div`
  width: 30vw;
`;
