
"use client";

import React, { useEffect, useState } from "react";

export default function TaskFormModal({ mode = "create", initialData = null, onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "low",
    status: "todo",
  });

  
  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title ?? "",
        description: initialData.description ?? "",
        
        dueDate: initialData.dueDate ? new Date(initialData.dueDate).toISOString().slice(0, 10) : "",
        priority: initialData.priority ?? "low",
        status: initialData.status ?? "todo",
      });
    } else {
      setForm({
        title: "",
        description: "",
        dueDate: "",
        priority: "low",
        status: "todo",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = (form.title || "").toString().trim();
    if (!trimmedTitle) {
      // simple UX guard
      alert("Title is required");
      return;
    }

    const payload = {
      ...form,
      title: trimmedTitle,
      dueDate: form.dueDate ? new Date(form.dueDate).toISOString() : null,
    };

 
    console.log("TaskFormModal submitting payload:", payload);

  
    await onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{mode === "create" ? "Create Task" : "Update Task"}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">Close</button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="text-sm text-slate-300 mb-1 block">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full rounded-md px-3 py-2 bg-slate-800 border border-slate-700 text-slate-100"
              placeholder="Task title"
            />
          </div>

          <div>
            <label className="text-sm text-slate-300 mb-1 block">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-md px-3 py-2 bg-slate-800 border border-slate-700 text-slate-100"
              placeholder="Task description"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-slate-300 mb-1 block">Due Date</label>
              <input
                name="dueDate"
                type="date"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full rounded-md px-3 py-2 bg-slate-800 border border-slate-700 text-slate-100"
              />
            </div>

            <div>
              <label className="text-sm text-slate-300 mb-1 block">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full rounded-md px-3 py-2 bg-slate-800 border border-slate-700 text-slate-100"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-slate-300 mb-1 block">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-md px-3 py-2 bg-slate-800 border border-slate-700 text-slate-100"
              >
                <option value="todo">To do</option>
                <option value="in-progress">In progress</option>
                <option value="done">Done</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md bg-slate-800 border border-slate-700">Cancel</button>
            <button type="submit" className="px-4 py-2 rounded-md bg-linear-to-r from-[#06b6d4] to-[#6366f1] font-semibold text-black">
              {mode === "create" ? "Create" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
