import React from "react";
import { Handle, Position } from "reactflow";

// an object to write the positions
const PositionMap = {
  left: Position.Left,
  right: Position.Right,
  top: Position.Top,
  bottom: Position.Bottom,
};

const BaseNode = ({ title, fields = [], handles = [] }) => {
  return (
    <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 min-w-[200px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-xl px-4 py-2">
        <span className="text-white text-sm font-semibold tracking-wide">
          {title}
        </span>
      </div>

      {/* Fields */}
      <div className="px-4 py-3 flex flex-col gap-2">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            {/* Label */}
            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {field.label}
            </label>

            {/* Text input */}
            {field.type === "text" && (
              <input
                type="text"
                value={field.value}
                onChange={field.onChange}
                className="nodrag text-sm border border-gray-200 rounded-lg px-3 py-1.5 
                           focus:outline-none focus:ring-2 focus:ring-indigo-300 
                           bg-gray-50 text-gray-800"
              />
            )}

            {/* Textarea */}
            {field.type === "textarea" && (
              <textarea
                value={field.value}
                onChange={field.onChange}
                className="nodrag text-sm border border-gray-200 rounded-lg px-3 py-1.5 
                           focus:outline-none focus:ring-2 focus:ring-indigo-300 
                           bg-gray-50 text-gray-800 resize-none"
                rows={3}
              />
            )}

            {/* Select / Dropdown */}
            {field.type === "select" && (
              <select
                value={field.value}
                onChange={field.onChange}
                className="nodrag text-sm border border-gray-200 rounded-lg px-3 py-1.5 
                           focus:outline-none focus:ring-2 focus:ring-indigo-300 
                           bg-gray-50 text-gray-800"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {/* Static text - for nodes like LLM that just show info */}
            {field.type === "static" && (
              <p className="text-sm text-gray-500 italic">{field.value}</p>
            )}

            {/* File Upload input */}
            {field.type === "fileupload" && (
              <input
                type="file"
                onChange={field.onChange}
                className="nodrag text-sm text-gray-500 file:mr-3 file:py-1 file:px-3
               file:rounded-lg file:border-0 file:text-sm file:font-medium
               file:bg-indigo-50 file:text-indigo-700
               hover:file:bg-indigo-100 cursor-pointer"
              />
            )}
          </div>
        ))}
      </div>

      {/* Handles */}
      {handles.map((handle) => (
        <Handle
          key={handle.id}
          type={handle.type}
          position={PositionMap[handle.position]}
          id={handle.id}
          style={handle.style || {}}
          className="w-3 h-3 bg-indigo-500 border-2 border-white"
        />
      ))}
    </div>
  );
};

export default BaseNode;
