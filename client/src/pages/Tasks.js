import styled from "styled-components";
import Header from "../components/Header";
import Card from "react-bootstrap/Card";
import TasksList from "../components/TasksList";
import Form from "../components/Form";
import Actionmenu from "../components/Actionmenu";

const Tasks = () => {
  return (
    <Wrapper>
      <div>
        <Card className="card">
          <Header />
          <Actionmenu />
          <Card.Body>
            <Form />
            <TasksList />
          </Card.Body>
        </Card>
      </div>
    </Wrapper>
  );
};
export default Tasks;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  .card {
    padding: 15px;
    width: 800px;
    height: 70vh;
    margin: 0 auto;
    background-color: black;
  }

  @media (max-width: 992px) {
    .card {
      width: 90%;
    }
  }

  @media (max-width: 576px) {
    .card {
      padding: 10px;
    }
  }

  .card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 576px) {
    .card-body {
      padding: 0;
    }
  }

  .form {
    width: 100%;
    max-width: 400px;
  }

  @media (max-width: 576px) {
    .form {
      max-width: 100%;
      padding: 0 10px;
    }
  }

  .tasks-list {
    width: 100%;
    max-width: 9000px;
  }

  @media (max-width: 992px) {
    .tasks-list {
      max-width: 90%;
    }
  }

  @media (max-width: 576px) {
    .tasks-list {
      padding: 10px;
    }
  }
`;
