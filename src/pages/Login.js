import React, { Component, useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { Formik, Field } from "formik";
import * as Yup from "yup";

import Button from "../components/common/Button";
import { AUTH_TOKEN } from "../constants";

// const SIGNUP_MUTATION = gql`
//   mutation SignupMutation(
//     $email: String!
//     $password: String!
//     $firstName: String!
//     $lastName: String!
//   ) {
//     signup(
//       email: $email
//       password: $password
//       firstName: $firstName
//       lastName: $lastName
//     ) {
//       token
//     }
//   }
// `;

// const LOGIN_MUTATION = gql`
//   mutation LoginMutation($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//     }
//   }
// `;

// export default class Login extends Component {
//   state = {
//     login: true, // switches between login and signup
//     email: "",
//     password: "",
//     firstName: "",
//     lastName: "",
//     errors: []
//   };
//   render() {
//     const { login, email, password, firstName, lastName, errors } = this.state;
//     return (
//       <Container>
//         <Title>{login ? "Welcome!" : "Sign Up"}</Title>
//         {login ? (
//           <InputWrapper login>
//             <Input
//               value={email}
//               onChange={e => this.setState({ email: e.target.value })}
//               type='text'
//               placeholder='example@email.com'
//             />
//             <Input
//               value={password}
//               onChange={e => this.setState({ password: e.target.value })}
//               type='text'
//               placeholder={"Password"}
//             />
//             {errors.length > 0 ? <Errors>something</Errors> : null}
//           </InputWrapper>
//         ) : (
//           <InputWrapper signup>
//             <Input
//               value={firstName}
//               onChange={e => this.setState({ firstName: e.target.value })}
//               type='text'
//               placeholder='First Name'
//             />

//             <Input
//               value={lastName}
//               onChange={e => this.setState({ lastName: e.target.value })}
//               type='text'
//               placeholder='Last Name'
//             />
//             <Input
//               value={email}
//               onChange={e => this.setState({ email: e.target.value })}
//               type='email'
//               placeholder='example@email.com'
//             />
//             <Input
//               value={password}
//               onChange={e => this.setState({ password: e.target.value })}
//               type='password'
//               placeholder={"Password"}
//             />
//             {errors.length > 0 ? <Errors>something</Errors> : null}
//           </InputWrapper>
//         )}
//         <ButtonWrapper>
//           <Mutation
//             mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
//             variables={{ email, password, firstName, lastName }}
//             onCompleted={data => this._confirm(data)}
//           >
//             {mutation => (
//               <Button onClick={mutation} primary>
//                 {login ? "login" : "create account"}
//               </Button>
//             )}
//           </Mutation>
//           <ToggleButton onClick={() => this.setState({ login: !login })}>
//             {login ? "Need to create an account?" : "already have an account?"}
//           </ToggleButton>
//         </ButtonWrapper>
//       </Container>
//     );
//   }

//   _confirm = async data => {
//     const { token } = this.state.login ? data.login : data.signup;
//     this._saveUserData(token);
//     localStorage.setItem("email", this.state.email);
//     navigate("/routes");
//   };

//   // local storage is not ideal. change to another method.
//   _saveUserData = token => {
//     localStorage.setItem(AUTH_TOKEN, token);
//   };
// }

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalid email dingus")
    .required("gotta have it dingus"),
  password: Yup.string().required("need it for sure")
});

const Login = () => {
  const [serverError, setServerError] = useState({ error: null });
  const _confirm = async data => {
    const { token } = data.data.login;
    _saveUserData(token);
    console.log(data);
    localStorage.setItem("email", data.email);
    navigate("/routes");
  };

  // local storage is not as secure as cookie. change to another method?
  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
  const addError = newError => {
    setServerError({ error: newError });
  };
  return (
    <Container>
      <Mutation mutation={LOGIN_MUTATION}>
        {(login, loading, error, data) => (
          <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={LoginSchema}
            onSubmit={async data => {
              try {
                const response = await login({
                  variables: {
                    email: `${data.email}`,
                    password: `${data.password}`
                  }
                });
                _confirm(response);
              } catch (err) {
                addError(err);
              }
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <FormWrapper onSubmit={handleSubmit}>
                <Container>
                  <Title>Welcome</Title>
                  <InputContainer>
                    <InputWrapper>
                      <Input name='email' placeholder='email' type='email' />
                      <ErrorMsg>
                        {errors.email && touched.email ? (
                          <div>{errors.email.toUpperCase()}</div>
                        ) : null}
                      </ErrorMsg>
                    </InputWrapper>
                    <InputWrapper>
                      <Input
                        name='password'
                        placeholder='password'
                        type='password'
                      />
                      <ErrorMsg>
                        {errors.password && touched.password ? (
                          <div>{errors.password.toUpperCase()}</div>
                        ) : null}
                      </ErrorMsg>
                    </InputWrapper>
                  </InputContainer>
                  {serverError.error &&
                  serverError.error.toString() ==
                    "Error: GraphQL error: No such user found" ? (
                    <ErrorMsg>User Not Found</ErrorMsg>
                  ) : null}
                  {serverError.error &&
                  serverError.error.toString() ==
                    "Error: GraphQL error: Invalid password" ? (
                    <ErrorMsg>Invalid Password</ErrorMsg>
                  ) : null}
                  <ButtonWrapper>
                    <Button type='submit' disabled={loading}>
                      submit
                    </Button>
                  </ButtonWrapper>
                </Container>
              </FormWrapper>
            )}
          </Formik>
        )}
      </Mutation>
    </Container>
  );
};

export default Login;

const Input = styled(Field)`
  width: 75%;
  height: 30px;
  border: 1px solid #999;
  border-radius: 5px;
  padding-left: 5px;
  background-color: #dfe2e8;
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid green;
`;

const Title = styled.h1`
  color: #fff;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40%;
  width: 100%;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const ErrorMsg = styled.p`
  color: #e33b24;
`;

const ButtonWrapper = styled.div`
  width: 65%;
  display: flex;
  flex-direction: column;
  height: 20%;
  justify-content: space-around;
`;

const ToggleButton = styled.div`
  height: 35px;
  width: 100%;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background: #000;
  color: #fff;
`;
const FormWrapper = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
`;
