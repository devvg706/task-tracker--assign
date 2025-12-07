import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],      // all fetched tasks
  loading: false, // loading state
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload; // replace all tasks
    },

    addTask(state, action) {
      state.tasks.unshift(action.payload); // add new task at the top
    },

    removeTask(state, action) {
      const id = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== id);
    },

    // NEW: update a single task in the store
    updateTaskInStore(state, action) {
      const updated = action.payload;
      if (!updated) return;
      const id = updated._id || updated.id;
      if (!id) return;
      const idx = state.tasks.findIndex((t) => String(t._id || t.id) === String(id));
      if (idx !== -1) {
        // merge to preserve unstored fields
        state.tasks[idx] = { ...state.tasks[idx], ...updated };
      } else {
        // optional: push if not found
        state.tasks.unshift(updated);
      }
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setTasks, addTask, removeTask, updateTaskInStore, setLoading } = taskSlice.actions;
export default taskSlice.reducer;
