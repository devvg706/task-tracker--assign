import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../api";
import { addTask, setLoading, removeTask, updateTaskInStore,setTasks  } from "../../slices/taskSlice";
import { toast } from "react-hot-toast";
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async ({ taskData, token }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const headers = {};

      
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      
      const response = await axios.post(endpoints.CREATE_TASK, taskData, {
        headers,
        withCredentials: !token, // cookies used if token missing
      });

      const createdTask = response.data?.task || response.data;

      // Update Redux store
      dispatch(addTask(createdTask));

      return createdTask;
    } catch (error) {
      console.error("Create Task Error:", error);
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    } finally {
      dispatch(setLoading(false));
    }
  }
);



// thunk: delete a task by ID
export function deleteTask(taskId) {
  return async (dispatch, getState) => {
    const toastId = toast.loading("Deleting task...");
    dispatch(setLoading(true));

    try {
      const token = getState()?.auth?.token;
      if (!token) {
        throw new Error("User not authenticated");
      }

      console.log("Deleting task:", taskId, "Token exists:", !!token);

      const response = await axios.delete(endpoints.taskById(taskId), {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        
        withCredentials: false,
      });

      console.log("DELETE TASK RESPONSE:", response.data);

      if (!response?.data?.success) {
        throw new Error(response?.data?.message || "Failed to delete task");
      }

      dispatch(removeTask(taskId));

      toast.success("Task deleted successfully");
      return { success: true, data: response.data };
    } catch (error) {
      console.error("DELETE TASK ERROR:", error);
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to delete task";

      toast.error(message);
      return { success: false, error };
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
}
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ taskId, taskData, token }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));

      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.put(
        endpoints.taskById(taskId),
        taskData,
        {
          headers,
          withCredentials: true, 
        }
      );

      const updatedTask = response.data?.task;

     
      dispatch(updateTaskInStore(updatedTask));

      return updatedTask;
    } catch (error) {
      console.error("Update Task Error:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getUserTasks = createAsyncThunk(
  "tasks/getUserTasks",
  async (
    { token = null, page = 1, limit = 10, status, priority, search } = {},
    { dispatch, rejectWithValue }
  ) => {
    try {
      dispatch(setLoading(true));

      const headers = {};
      if (token) headers.Authorization = `Bearer ${token}`;

      // build query string
      const params = {
        page,
        limit,
      };
      if (status) params.status = status;
      if (priority) params.priority = priority;
      if (search) params.search = search;

      const response = await axios.get(endpoints.GET_TASKS, {
        headers,
        withCredentials: !token, 
        params,
      });

     
      const payload = response.data || {};

      
      const tasks = payload.tasks ?? payload.data ?? (Array.isArray(payload) ? payload : []);
      
      const total = payload.total ?? (Array.isArray(tasks) ? tasks.length : 0);
      const respPage = payload.page ?? page;
      const respLimit = payload.limit ?? limit;

      
      dispatch(setTasks(tasks));

      return { tasks, total, page: respPage, limit: respLimit };
    } catch (error) {
      console.error("getUserTasks error:", error);
      return rejectWithValue(error.response?.data || { message: error.message });
    } finally {
      dispatch(setLoading(false));
    }
  }
);