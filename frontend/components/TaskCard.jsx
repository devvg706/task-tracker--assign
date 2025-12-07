
"use client";
import React from "react";

export default function TaskCard({ task, onEdit = () => {}, onDelete = () => {} }) {
  const { title, description, dueDate, priority, status } = task;
  const due = dueDate ? new Date(dueDate).toLocaleDateString() : "No due date";

  const priorityColor =
    priority === "high" ? "bg-rose-500" : priority === "medium" ? "bg-amber-500" : "bg-emerald-500";

  const statusColor =
    status === "done" ? "text-emerald-400" : status === "in-progress" ? "text-amber-300" : "text-slate-300";

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h4 className="text-lg font-semibold text-slate-100">{title}</h4>
          <span className={`text-xs px-2 py-1 rounded ${priorityColor} text-black font-medium`}>{priority}</span>
        </div>

        <p className="text-slate-300 mt-2 line-clamp-3">{description || "No description"}</p>

        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="text-slate-400">Due: <span className="text-slate-200 ml-1">{due}</span></div>
          <div className={`${statusColor} font-medium`}>{status}</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={onEdit}
          className="px-3 py-2 text-sm rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-2 text-sm rounded-md bg-rose-600 hover:bg-rose-500"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
