import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { MdArrowForward } from "react-icons/md";

const RouteListItem = props => {
  return (
    <Container to='/route' state={{ id: props.id }}>
      <Symbol>
        {props.title[0]}
        {props.title[props.title.length - 1]}
      </Symbol>
      <Points>POINTS: {props.points}</Points>
      <MdArrowForward size='2em' color='#fff' />
    </Container>
  );
};

export default RouteListItem;

const Container = styled(Link)`
  width: 95%;
  height: 50px;
  border: 1px solid #000;
  border-radius: 15px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-decoration: none;
  background-color: #2842eb;
`;

const Points = styled.p`
  color: #fff;
  font-size: 20px;
`;

const Symbol = styled.p`
  color: #fff;
  font-size: 22px;
`;
