import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { Formik, Form, Field } from "formik";
import * as EmailValidator from "email-validator";
import * as Yup from "yup";

import Button from "./common/Button";
import Input from "./common/Input";
import { AUTH_TOKEN } from "../constants";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const Login = () => {
  return (
    <Mutation mutation={LOGIN_MUTATION}>
      {(mutation, { loading }) => (
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values, actions) => {
            // You can access the signup mutation in here now
            // You can access values.name, values.email, values.password
            // You can access actions, e.g. actions.setSubmitting(false) once you've finished the mutation
          }}
          render={props => (
            <Form onSubmit={props.handleSubmit}>
              <Field
                type='email'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.email}
                name='email'
              />
              <Field
                type='password'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name='email'
              />
              <button type='submit' disabled={loading}>
                Login
              </button>
            </Form>
          )}
        />
      )}
    </Mutation>
  );
};

export default Login;
