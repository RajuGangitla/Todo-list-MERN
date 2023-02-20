import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import {
  DISPLAY_SPINNER,
  CLEAR_SPINNER,
  SETUP_USER,
  GET_ALL_TASKS,
  SET_SEARCH,
  HANDLE_STATUS,
  LOGOUT_USER,
} from "./actions";
import axios from "axios";
import { message } from "antd";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  isLoading: false,
  token: token,
  user: user ? JSON.parse(user) : null,
  tasks: [],
  search: "",
  isActive: "All",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displaySpinner = () => {
    dispatch({
      type: DISPLAY_SPINNER,
    });
  };

  const clearSpinner = () => {
    dispatch({
      type: CLEAR_SPINNER,
    });
  };

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const setupUser = async ({ values, endPoint }) => {
    try {
      displaySpinner();
      const res = await axios.post(`/api/v1/auth/${endPoint}`, values);
      clearSpinner();
      const { user, token } = res.data;
      if (endPoint === "login") {
        dispatch({
          type: SETUP_USER,
          payload: { user, token },
        });
      }
      if (res.data.success) {
        if (endPoint === "login") {
          addUserToLocalStorage({ user, token });
        }
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      clearSpinner();
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const getAllTasks = async () => {
    try {
      const { search, isActive } = state;
      let url = "/api/v1/tasks/alltasks";
      if (isActive === "All") {
        url = "/api/v1/tasks/alltasks";
      } else {
        url = `/api/v1/tasks/alltasks?isActive=${isActive}`;
      }
      if (search && isActive !== "All") {
        url = url + `&search=${search}`;
      }
      if (search && isActive === "All") {
        url = url + `?search=${search}`;
      }
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const { tasks } = res.data;
      if (res.data.success) {
        dispatch({
          type: GET_ALL_TASKS,
          payload: { tasks },
        });
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addTask = async (values) => {
    try {
      displaySpinner();
      const res = await axios.post("/api/v1/tasks/addTask", values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      clearSpinner();
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      clearSpinner();
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const updateTask = async ({ values, taskId }) => {
    try {
      displaySpinner();
      const res = await axios.patch(
        `/api/v1/tasks/editTask/${taskId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      clearSpinner();
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error("Unable to update the task");
      }
    } catch (error) {
      clearSpinner();
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      displaySpinner();
      const res = await axios.delete(`/api/v1/tasks/deleteTask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      clearSpinner();
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error("Unable to update the task");
      }
    } catch (error) {
      clearSpinner();
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const setSearch = (value) => {
    dispatch({
      type: SET_SEARCH,
      payload: { value },
    });
  };

  const handleStatus = (value) => {
    dispatch({
      type: HANDLE_STATUS,
      payload: { value },
    });
  };

  const deleteAllTasks = async () => {
    try {
      displaySpinner();
      const res = await axios.delete("/api/v1/tasks/deleteAllTasks", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      clearSpinner();
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error("Unable to update the task");
      }
    } catch (error) {
      clearSpinner();
      console.log();
      message.error("Something went wrong");
    }
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displaySpinner,
        clearSpinner,
        setupUser,
        getAllTasks,
        addTask,
        updateTask,
        deleteTask,
        setSearch,
        handleStatus,
        deleteAllTasks,
        logoutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { useAppContext, AppProvider, initialState };
