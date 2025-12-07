// app/dashboard/page.jsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasks, createTask, updateTask, deleteTask } from "../../services/operations/taskAPI";
import TaskCard from "../../components/TaskCard";
import TaskFormModal from "../../components/TaskFormModal";
import ConfirmModal from "../../components/ConfirmModal";
import SearchFilterBar from "../../components/SearchFilterBar";
import {Spinner} from "@heroui/spinner";


export default function DashboardPage() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth)
  console.log("DashboardPage render, token:", token);
  const tasks = useSelector((s) => s.tasks?.tasks ?? []);
  const loading = useSelector((s) => s.tasks?.loading ?? false);

  // ui state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [filters, setFilters] = useState({ search: "", status: "", priority: "" });

  // fetch tasks on mount and when filters change (debounced inside effect)
  useEffect(() => {
    // initial load
    dispatch(getUserTasks({ token }));
  }, [dispatch, token]);

  // Derived filtered tasks (client-side additional filtering/search)
  const filteredTasks = useMemo(() => {
    const q = (filters.search || "").trim().toLowerCase();
    return tasks.filter((t) => {
      if (filters.status && t.status !== filters.status) return false;
      if (filters.priority && t.priority !== filters.priority) return false;
      if (q) {
        const title = (t.title || "").toLowerCase();
        const desc = (t.description || "").toLowerCase();
        return title.includes(q) || desc.includes(q);
      }
      return true;
    });
  }, [tasks, filters]);

  // handlers
  const onCreate = async (data) => {
    try {
      await dispatch(createTask({ taskData: data, token })).unwrap();
      setShowCreateModal(false);
      console.log("taskdata",data)
      // re-fetch or optimistic add is handled by thunk
    } catch (err) {
      console.error("create failed", err);
    }
  };

  const onStartEdit = (task) => setEditTask(task);
  const onCancelEdit = () => setEditTask(null);

  const onUpdate = async (taskId, data) => {
    try {
      await dispatch(updateTask({ taskId, taskData: data, token })).unwrap();
      setEditTask(null);
    } catch (err) {
      console.error("update failed", err);
    }
  };

  const onConfirmDelete = (taskId) => setDeleteTaskId(taskId);
  const onCancelDelete = () => setDeleteTaskId(null);

  const onDelete = async () => {
    if (!deleteTaskId) return;
    try {
      await dispatch(deleteTask(deleteTaskId)).then((res) => {
        
      });
      setDeleteTaskId(null);
    } catch (err) {
      console.error("delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-[#071023] to-[#0b1220] p-6 sm:p-10 text-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold">Your Tasks</h2>
            <p className="text-sm text-slate-400 mt-1">Manage your tasks — create, update, search & filter</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 rounded-md bg-linear-to-r from-[#06b6d4] to-[#6366f1] px-4 py-2 font-semibold text-black shadow hover:opacity-95"
            >
              + New Task
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <SearchFilterBar
          filters={filters}
          setFilters={setFilters}
          onSearchTrigger={() => dispatch(getUserTasks({ token, search: filters.search }))}
        />

        {/* Content */}
        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Spinner />
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-slate-700 rounded-lg">
              <h3 className="text-xl font-medium">No tasks yet</h3>
              <p className="text-slate-400 mt-2">You don't have any tasks. Create your first task now.</p>
              <div className="mt-4">
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center gap-2 rounded-md bg-linear-to-r from-[#06b6d4] to-[#6366f1] px-4 py-2 font-semibold text-black"
                >
                  + Add Task
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id || task.id}
                  task={task}
                  onEdit={() => onStartEdit(task)}
                  onDelete={() => onConfirmDelete(task._id || task.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <TaskFormModal
          mode="create"
          onClose={() => setShowCreateModal(false)}
          onSubmit={onCreate}
          initialData={null}
        />
      )}

      {/* Edit Modal */}
      {editTask && (
        <TaskFormModal
          mode="edit"
          onClose={onCancelEdit}
          onSubmit={(data) => onUpdate(editTask._id || editTask.id, data)}
          initialData={editTask}
        />
      )}

      {/* Confirm delete */}
      {deleteTaskId && (
        <ConfirmModal
          title="Delete task"
          description="Are you sure you want to delete this task? This action cannot be undone."
          onCancel={onCancelDelete}
          onConfirm={onDelete}
        />
      )}
    </div>
  );
}
