import React from "react";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const Header = () => {
  const { user, logoutUser } = useAppContext();
  return (
    <Wrapper>
      <div className="header">
        <h3>Hi {user?.name}! Your Todos list</h3>
        <button
          onClick={() => {
            logoutUser();
          }}
        >
          Logout
        </button>
      </div>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  .header {
    background-color: #333333;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    margin-bottom: 10px;
  }

  h3 {
    font-size: 1.5rem;
    margin: 0;
  }

  button {
    background-color: white;
    color: #555555;
    border: none;
    border-radius: 4px;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 1rem;
    margin-left: 12px;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: sandybrown;
    color: black;
  }
`;
