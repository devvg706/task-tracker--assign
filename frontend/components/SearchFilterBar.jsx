
"use client";
import React, { useState, useEffect } from "react";

export default function SearchFilterBar({ filters, setFilters, onSearchTrigger }) {
  const [local, setLocal] = useState(filters);


  useEffect(() => setLocal(filters), [filters]);

 
  useEffect(() => {
    const t = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: local.search }));
      if (typeof onSearchTrigger === "function") onSearchTrigger();
    }, 400);
    return () => clearTimeout(t);
  
  }, [local.search]);

  return (
    <div className="w-full bg-slate-900/30 border border-slate-800 rounded-lg p-4 flex flex-col sm:flex-row gap-3 items-center">
      <div className="flex-1">
        <input
          value={local.search}
          onChange={(e) => setLocal((s) => ({ ...s, search: e.target.value }))}
          placeholder="Search by title or description..."
          className="w-full rounded-md px-3 py-2 bg-slate-800 border border-slate-700 placeholder-slate-500 text-slate-100"
        />
      </div>

      <div className="flex items-center gap-3">
        <select
          value={local.status}
          onChange={(e) => {
            setLocal((s) => ({ ...s, status: e.target.value }));
            setFilters((prev) => ({ ...prev, status: e.target.value }));
          }}
          className="rounded-md px-3 py-2 bg-slate-800 border border-slate-700 text-slate-100"
        >
          <option value="">All status</option>
          <option value="todo">To do</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={local.priority}
          onChange={(e) => {
            setLocal((s) => ({ ...s, priority: e.target.value }));
            setFilters((prev) => ({ ...prev, priority: e.target.value }));
          }}
          className="rounded-md px-3 py-2 bg-slate-800 border border-slate-700 text-slate-100"
        >
          <option value="">All priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}
