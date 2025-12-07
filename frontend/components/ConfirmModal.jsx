
"use client";
import React from "react";

export default function ConfirmModal({ title = "Confirm", description = "", onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 p-6">
        <h3 className="text-lg font-semibold text-slate-100">{title}</h3>
        <p className="text-slate-400 mt-2">{description}</p>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-md bg-slate-800 border border-slate-700">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-md bg-rose-600 font-semibold">Delete</button>
        </div>
      </div>
    </div>
  );
}
