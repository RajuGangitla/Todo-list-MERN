import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import styled from "styled-components";
import { useState } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const AddTask = () => {
  const { addTask } = useAppContext();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    taskTitle: "",
    taskDescription: "",
    isActive: false,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]:
        e.target.name === "isActive" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(values);
    setValues("");
  };
  return (
    <Wrapper>
      <div>
        <Form className="form" onSubmit={handleSubmit}>
          <h4 className="text-center">Add Task</h4>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              name="taskTitle"
              value={values.taskTitle}
              onChange={handleChange}
              placeholder="Enter title"
            />
          </Form.Group>
          <Form.Label>Task Description</Form.Label>
          <FloatingLabel controlId="floatingTextarea2">
            <Form.Control
              as="textarea"
              name="taskDescription"
              value={values.taskDescription}
              onChange={handleChange}
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <Form.Group className="mt-3" controlId="formBasicCheckbox">
            <Form.Check
              type="checkbox"
              name="isActive"
              value={values.isActive}
              checked={values.isActive}
              onChange={handleChange}
              label="Task completed"
            />
          </Form.Group>
          <div className="buttons">
            <Button variant="success" type="submit">
              Add task
            </Button>
            <Button variant="primary" onClick={() => navigate("/")}>
              Go back
            </Button>
          </div>
        </Form>
      </div>
    </Wrapper>
  );
};
export default AddTask;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .form {
    width: 500px;
    margin: 0 auto;
    padding: 15px;
    border-radius: 15px;
    color: white;
    background-color: black;
  }

  h4 {
    color: red;
    font-weight: 700;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  /* Media queries */
  @media only screen and (max-width: 600px) {
    .form {
      width: 368px;
    }
  }
`;
