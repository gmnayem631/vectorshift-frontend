// textNode.js

import { useEffect, useRef, useState } from "react";
import BaseNode from "./BaseNode";
import { Handle, Position } from "reactflow";

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || "{{input}}");
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [currText]);

  // variable detection
  useEffect(() => {
    // regex to find the variable pattern
    const regex = /\{\{(\w+)\}\}/g;
    const found = [];
    let match;

    // regex.exec() finds one match at a time
    // while loop keeps running until no more matches are found
    while ((match = regex.exec(currText)) !== null) {
      found.push(match[1]);
    }

    // Remove duplicates using Set
    const unique = [...new Set(found)];
    setVariables(unique);
  }, [currText]);

  // handler for this component
  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // fields and handles array to send to BaseNode as props
  // const fields = [
  //   {
  //     type: "textarea",
  //     label: "Text",
  //     name: "text",
  //     value: currText,
  //     onChange: handleTextChange,
  //   },
  // ];
  // const handles = [
  //   {
  //     type: "source",
  //     position: "right",
  //     id: `${id}-output`,
  //   },
  // ];

  // return <BaseNode title="Text" fields={fields} handles={handles} />;
  return (
    <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 min-w-[200px] max-w-[400px]">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-xl px-4 py-2">
        <span className="text-white text-sm font-semibold tracking-wide">
          Text
        </span>
      </div>
      {/* Dynamic variable handles on the left */}
      {variables.map((variable, index) => {
        // Spread handles evenly along the left side
        // We add 1 to index and variables.length to avoid
        // placing handles at the very top or bottom edge
        const topPercent = ((index + 1) / (variables.length + 1)) * 100;
        return (
          <Handle
            key={variable}
            type="target"
            position={Position.Left}
            id={`${id}-${variable}`}
            style={{ top: `${topPercent}%` }}
            className="w-3 h-3 bg-purple-500 border-2 border-white"
          />
        );
      })}{" "}
      {/* Fields */}
      <div className="px-4 py-3 flex flex-col gap-2">
        {/* Variable badges - shows detected variables */}
        {variables.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1">
            {variables.map((v) => (
              <span
                key={v}
                className="text-xs bg-indigo-50 text-indigo-600 
                           border border-indigo-200 rounded-md px-2 py-0.5 
                           font-mono"
              >
                {`{{${v}}}`}
              </span>
            ))}
          </div>
        )}{" "}
        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Text
        </label>
        <textarea
          ref={textareaRef}
          value={currText}
          onChange={handleTextChange}
          className="nodrag text-sm border border-gray-200 rounded-lg px-3 py-1.5
                     focus:outline-none focus:ring-2 focus:ring-indigo-300
                     bg-gray-50 text-gray-800 resize-none overflow-hidden
                     min-w-[160px]"
          rows={1}
        />
      </div>
      {/* Static output handle on the RIGHT */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        className="w-3 h-3 bg-indigo-500 border-2 border-white"
      />
    </div>
  );
};
