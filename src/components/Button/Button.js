import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';

const POST_MUTATION = gql`
  mutation PostMutation($attempts: Int!, $title: String!, $points: Int!) {
    post(attempts: $attempts, title: $title, points: $points) {
      id
    }
  }
`;

export default class Button extends Component {
  attempts = 1;
  title = 'test title';
  points = 100;
  render() {
    const { attempts, title, points } = this;
    return (
      <div>
        <Mutation
          mutation={POST_MUTATION}
          variables={{ attempts, title, points }}
          onCompleted={() => navigate('/routes')}
        >
          {postMutation => <div onClick={postMutation}>Create Routes</div>}
        </Mutation>
      </div>
    );
  }
}
