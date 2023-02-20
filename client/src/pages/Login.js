import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "../context/appContext";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Login = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const { setupUser } = useAppContext();
  const [values, setValues] = useState(initialState);
  const [register, setRegister] = useState(false);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    setRegister(!register);
    setValues(initialState);
  };

  const validateEmail = (email) => {
    // A regular expression for validating email addresses
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    // A regular expression for validating password strength
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
    return re.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(values.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!validatePassword(values.password)) {
      alert(
        "Please enter a valid password. A valid password is at least 6 chars long, has at least one uppercase and one lowercase character."
      );
      return;
    }

    if (register) {
      setupUser({ values, endPoint: "register" });
    } else {
      setupUser({ values, endPoint: "login" });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [user, navigate]);

  return (
    <Wrapper>
      <div>
        <Form className="form-container" onSubmit={handleSubmit}>
          <h1>{register ? "Register" : "Login"}</h1>
          {register ? (
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Enter Name"
              />
            </Form.Group>
          ) : (
            ""
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              placeholder="Enter Password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {register ? "Register" : "Login"}
          </Button>
          <h6 onClick={handleRegister}>
            {register ? "Already a user Login here" : "New user? Register here"}
          </h6>
        </Form>
      </div>
    </Wrapper>
  );
};
export default Login;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  .form-container {
    width: 350px;
    background-color:black;
    padding: 10px;
    height: 65vh;
    margin: 0 auto;
    border-radius:10px;
  }

  @media (max-width: 768px) {
    .form-container {
      max-width: 100%;
      padding: 0 10px;
    }
  }

  h1 {
    font-size: 2rem;
    text-align: center;
    color: yellow;
    margin-top:1rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }
  }

  h6 {
    font-size: 1rem;
    text-align: center;
    margin-top: 1rem;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    h6 {
      font-size: 0.9rem;
    }
  }
`;
