import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { message } from "antd";

const EditTask = () => {
  const { id } = useParams();
  const { updateTask } = useAppContext();
  const [task, setTask] = useState([]);
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

  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await axios.get(`/api/v1/tasks/getTask/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          setTask(res.data.task);
        } else {
          message.error("Cannot fetch task details");
        }
      } catch (error) {
        message.error("Something went wrong");
      }
    };
    getTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // perform validation checks
    const titleRegex = /^.{0,50}$/;
    const descriptionRegex = /^.{0,256}$/;

    if (!titleRegex.test(values.taskTitle)) {
      message.error("Task title must be 50 characters or less");
      return;
    }

    if (!descriptionRegex.test(values.taskDescription)) {
      message.error("Task description must be 256 characters or less");
      return;
    }
    updateTask({ values, taskId: id });
    setValues("");
  };

  useEffect(() => {
    if (task) {
      setValues({
        taskTitle: task.taskTitle || "",
        taskDescription: task.taskDescription || "",
        isActive: task.isActive || false,
      });
    }
  }, [task]);

  return (
    <Wrapper>
      <div>
        <Form className="form" onSubmit={handleSubmit}>
          <h4 className="text-center" >
            Edit Task
          </h4>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Task Title</Form.Label>
            <Form.Control
              type="text"
              name="taskTitle"
              value={values.taskTitle}
              maxLength={50}
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
              maxLength={256}
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
              Update task
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
export default EditTask;

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

  h4{
    color: red;
    font-weight:700;
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
