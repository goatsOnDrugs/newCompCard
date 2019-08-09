import React, { Component } from "react";
import styled from "styled-components";

import Profile from "../components/Profile/Profile";
import EditProfile from "../components/Profile/EditProfile";
import Button from "../components/common/Button";

export default class ProfilePage extends Component {
  state = {
    isEditing: false
  };
  render() {
    const onClickHandler = () => {
      this.setState({ isEditing: !this.state.isEditing });
    };
    return (
      <Container>
        <Card>
          {this.state.isEditing ? <EditProfile /> : <Profile />}
          {this.state.isEditing ? (
            <div>
              <Button click={onClickHandler} title="CANCEL" />
            </div>
          ) : (
            <Button click={onClickHandler} title="EDIT" />
          )}
        </Card>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Card = styled.div`
  width: 85%;
  height: 80%;
  background: #dfe2e8;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  justify-content: space-between;
  padding: 10px;
  margin-top: 20px;
`;
