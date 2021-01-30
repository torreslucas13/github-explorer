import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface IFormProps {
  hasError: boolean;
}
export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  max-width: 450px;
  line-height: 56px;

  margin-top: 80px;
`;

export const Form = styled.form<IFormProps>`
  margin-top: 40px;
  max-width: 700px;

  display: flex;

  input {
    flex: 1;
    height: 72px;
    background: #ffffff;
    border-radius: 5px 0 0 5px;
    border: 0;
    padding: 0 24px;
    color: #3a3a3a;
    border: 2px solid #ffffff;

    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    color: #ffffff;
    height: 70px;
    border: 0;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 80px;
  max-width: 700px;

  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block; // fazer com que o 'a' fique por volta de todo o conteudo;
    text-decoration: none;

    display: flex;
    align-items: center;

    transition: transform 0.2s;

    & + a {
      margin-top: 16px;
    }

    &:hover {
      transform: translateX(10px);
    }

    img {
      border-radius: 50%;
      height: 64px;
      width: 64px;
    }

    div {
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3a3a3a;
      }

      p {
        font-size: 18px;
        margin-top: 4px;
        color: #a8a8b3;
      }
    }
    svg {
      margin-left: auto;
      color: #a8a8b3;
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;
