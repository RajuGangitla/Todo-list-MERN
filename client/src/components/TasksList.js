import { useAppContext } from "../context/appContext";
import { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const TasksList = () => {
  const { tasks, getAllTasks, deleteTask, search, isActive } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    getAllTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, search]);

  return (
    <Wrapper>
      <div>
        {tasks.length ? (
          tasks.map((task) => (
            <div className="listBox">
              <li className="list-item" key={task._id}>
                <input type="checkbox" readOnly checked={task.isActive} />
                <span
                  className={`list ${task.isActive ? "complete" : ""}`}
                  onClick={() => navigate(`/edit-task/${task._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  {task.taskTitle}
                </span>
                <FaEdit
                  className="edit-icon"
                  onClick={() => navigate(`/edit-task/${task._id}`)}
                />
                <MdDelete
                  className="delete-icon"
                  onClick={() => deleteTask(task._id)}
                />
              </li>
            </div>
          ))
        ) : (
          <p className="text-center">No todos in your list! Add some todos</p>
        )}
      </div>
    </Wrapper>
  );
};
export default TasksList;

const Wrapper = styled.div`
  border-radius: 10px;
  width: 250px;
  margin-top: 20px;

  .list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }

  .listBox{
    margin-bottom:10px
  }

  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: yellow;
    border-radius: 12px;
    font-size: 21px;
    font-weight: 550;
    border-bottom: 1px solid #ccc;
  }

  @media (max-width: 576px) {
    .list-item {
      font-size: 16px;
      font-weight: 550;
      padding: 5px;
    }
  }

  .list-item:last-child {
    border-bottom: none;
  }

  .list-item .list {
    margin: 0 10px;
  }

  .list-item .list.complete {
    text-decoration: line-through;
  }

  .edit-icon,
  .delete-icon {
    font-size: 20px;
    cursor: pointer;
  }

  @media (max-width: 576px) {
    .edit-icon,
    .delete-icon {
      font-size: 18px;
    }
  }

  .delete-icon {
    margin-left: 10px;
    color: red;
  }

  p {
    margin-top: 3px;
    font-size: 15px;
    font-weight: 600;
  }
`;
