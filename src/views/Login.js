import React, { useReducer, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

import Heading from '../components/atoms/Heading/Heading';
import Input from '../components/atoms/Input/Input';
import Text from '../components/atoms/Text/Text';
import { auth, createUserDoc } from '../firebase/firebase';

const StyledWrapper = styled.section`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.secondaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const StyledForm = styled.form`
  width: 28rem;
  height: 34rem;
  padding: 4.5rem 0 1rem 0;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const StyledInputsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
`;

const StyledHeading = styled(Heading)`
  margin-bottom: 2rem;
  font-size: 3.7rem;
  text-transform: uppercase;
`;

const StyledInputLabelWrapper = styled.div`
  display: flex;
  flex-flow: column-reverse;
  position: relative;
  margin-bottom: 3rem;

  input + label {
    line-height: 1;
    height: 4rem;
    transition: transform 0.25s, opacity 0.25s ease-in-out;
    transform-origin: 0 0;
    transform: translate(20px, 50%);
    position: absolute;

    @media (min-width: 1000px) {
      transform: translate(20px, 55%);
    }
  }
`;

const StyledLabel = styled.label`
  letter-spacing: 1px;
  color: ${({ theme }) => theme.fontColorText};
  font-size: 0.9rem;
  position: absolute;
  user-select: none;
`;

const StyledInput = styled(Input)`
  padding: 0.8rem 2.6rem;
  ::placeholder {
    color: transparent;
  }

  :not(:placeholder-shown) + label,
  :focus + label {
    transform: translate(10px, -15%);
    cursor: pointer;
  }

  @media (min-width: 1000px) {
    :not(:placeholder-shown) + label,
    :focus + label {
      transform: translate(10px, -10%);
      cursor: pointer;
    }
  }

  :focus + ::placeholder {
    color: inherit;
  }

  :focus {
    outline: 0;
  }
`;
const StyledButton = styled.button`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.regular};
  color: ${({ theme }) => theme.fontColorText};
  background-color: ${({ theme }) => theme.primaryColor};
  border-radius: 30px;
  padding: 0.7rem 4rem;
`;
const StyledText = styled(Text)`
  margin-top: 4rem;
  text-align: center;
`;

const StyledButtonSecondary = styled.button`
  position: relative;
  margin-left: 0.4rem;
  text-decoration: none;
  z-index: 2;
  font-size: 1.2rem;
  font-weight: ${({ theme }) => theme.bold};
  ::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 40%;
    background-color: ${({ theme }) => theme.primaryColor};
    z-index: 1;
    top: 55%;
    left: 10%;
  }
`;

const Login = () => {
  const [newAccount, setNewAccount] = useState(false);
  const [inputsContent, setInputsContent] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      email: '',
      password: '',
      displayName: '',
    },
  );
  const { email, password, displayName } = inputsContent;

  const handleInputChange = e => {
    setInputsContent({
      [e.target.name]: e.target.value,
    });
  };

  const handleNewAccount = e => {
    e.preventDefault();
    setNewAccount(prevNewAccount => !prevNewAccount);
  };
  const handleSignIn = e => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      /* eslint-disable */
      .catch(error => alert(`Your email or password is incorrect, please check your data`));
  };

  const handleSignUp = async e => {
    e.preventDefault();
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    createUserDoc(user, displayName);
  };

  console.log(email, password);
  return (
    <StyledWrapper>
      <StyledHeading>Social Dev</StyledHeading>
      <StyledForm onSubmit={newAccount ? handleSignUp : handleSignIn}>
        <StyledInputsWrapper>
          <StyledInputLabelWrapper>
            <StyledInput
              placeholder="name"
              type="text"
              onChange={handleInputChange}
              name="displayName"
              value={displayName}
            />
            <StyledLabel>Name</StyledLabel>
          </StyledInputLabelWrapper>
          <StyledInputLabelWrapper>
            <StyledInput
              placeholder="email"
              type="email"
              onChange={handleInputChange}
              name="email"
              value={email}
            />
            <StyledLabel>Email</StyledLabel>
          </StyledInputLabelWrapper>
          <StyledInputLabelWrapper>
            <StyledInput
              placeholder="password"
              type="password"
              onChange={handleInputChange}
              name="password"
              value={password}
            />
            <StyledLabel>Password</StyledLabel>
          </StyledInputLabelWrapper>
          <StyledButton type="submit">{newAccount ? 'Sign up' : 'Sign in'}</StyledButton>
        </StyledInputsWrapper>
        <StyledText>
          {newAccount ? 'Have account?' : "Haven't got account?"}
          <StyledButtonSecondary aria-label="sign in/sign up" onClick={handleNewAccount}>
            {newAccount ? 'Sign in' : 'Sign up'}
          </StyledButtonSecondary>
        </StyledText>
      </StyledForm>
    </StyledWrapper>
  );
};

export default Login;
