import styled, { css } from 'styled-components';
import { shade } from 'polished';

export const Header = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #a8a8b3;
    transition: color 0.2s;

    &:hover {
      color: #666;
    }
  }

  svg {
    margin-right: 4px;
  }
`;

export const RepositoryInfo = styled.section`
  margin-top: 80px;

  header {
    display: flex;
    align-items: center;

    img {
      border-radius: 50%;
      height: 120px;
      width: 120px;
    }

    div {
      margin-left: 24px;

      strong {
        font-size: 36px;
        color: #3d3d4d;
      }

      p {
        font-size: 18px;
        color: #737380;
        margin-top: 4px;
      }
    }
  }

  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;

    li {
      & + li {
        margin-left: 80px;
      }
      strong {
        display: block;
        font-size: 36px;
        color: #3d3d4d;
      }

      span {
        display: block;
        color: #6c6c80;
        display: flex;
        align-items: center;

        svg {
          margin-right: 10px;
        }
      }
    }
  }
`;

export const Issues = styled.div`
  margin-top: 80px;

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
