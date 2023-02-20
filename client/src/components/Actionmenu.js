import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";

const Actionmenu = () => {
  const navigate = useNavigate();
  const { isActive, handleStatus, deleteAllTasks } = useAppContext();

  const handleChange = (e) => {
    handleStatus(e.target.value);
  };

  return (
    <Wrapper>
      <div className="action-menu">
        <button className="add-task-btn" onClick={() => navigate("/add-task")}>
          Add Task
        </button>
        <div className="filter-component">
          <label htmlFor="task-filter">Filter tasks:</label>
          <select
            id="task-filter"
            name="isActive"
            value={isActive}
            onChange={handleChange}
          >
            <option value="All">All</option>
            <option value="false">Active</option>
            <option value="true">Completed</option>
          </select>
        </div>
        <button className="bulk-delete-btn" onClick={() => deleteAllTasks()}>
          Delete All
        </button>
      </div>
    </Wrapper>
  );
};
export default Actionmenu;

const Wrapper = styled.div`
  .action-menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: black;
  }

  .add-task-btn {
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    font-weight: 600;
    padding: 6px;
    font-size: 15px;
    cursor: pointer;
    margin-right: 10px;
  }

  .filter-component {
    display: flex;
    align-items: center;
    margin-right: 10px;
  }

  label {
    margin-right: 10px;
    color: white;
    font-weight:600;
    font-size:18px;
  }

  select {
    border: 1px solid #ddd;
    border-radius: 5px;
    padding: 5px;
    font-size: 16px;
  }

  .bulk-delete-btn {
    background-color: #f44336;
    color: #fff;
    font-weight: 600;
    border: none;
    border-radius: 5px;
    padding: 7px;
    font-size: 14px;
    cursor: pointer;
  }
`;
