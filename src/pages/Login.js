import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';

import { AUTH_TOKEN } from '../constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default class Login extends Component {
  state = {
    login: true, // switches between login and signup
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  };
  render() {
    const { login, email, password, firstName, lastName } = this.state;
    return (
      <div>
        <h4>{login ? 'Login' : 'Sign Up'}</h4>
        <div>
          {!login && (
            <input
              value={firstName}
              onChange={e => this.setState({ firstName: e.target.value })}
              type='text'
              placeholder='First Name'
            />
          )}
          {!login && (
            <input
              value={lastName}
              onChange={e => this.setState({ lastName: e.target.value })}
              type='text'
              placeholder='Last Name'
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type='text'
            placeholder='example@email.com'
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type='text'
            placeholder='Password'
          />
        </div>
        <div>
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, firstName, lastName }}
            onCompleted={data => this._confirm(data)}
          >
            {mutation => (
              <div onClick={mutation}>{login ? 'login' : 'create account'}</div>
            )}
          </Mutation>
          <div onClick={() => this.setState({ login: !login })}>
            {login ? 'Need to create an account?' : 'already have an account?'}
          </div>
        </div>
      </div>
    );
  }

  _confirm = async data => {
    const { token } = this.state.login ? data.login : data.signup;
    this._saveUserData(token);
    console.log(this.state.email);
    navigate('/routes', { state: { email: this.state.email } });
  };

  // local storage is not ideal. change to another method.
  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
}
