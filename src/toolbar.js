// toolbar.js

import { DraggableNode } from "./draggableNode";
import { useAppStore } from "./store";
import { shallow } from "zustand/shallow";
import toast from "react-hot-toast";

const selector = (state) => ({
  clearCanvas: state.clearCanvas,
});

export const PipelineToolbar = () => {
  const { clearCanvas } = useAppStore(selector, shallow);
  const handleClear = () => {
    // confirm before wiping everything
    if (window.confirm("Clear the canvas? This cannot be undone.")) {
      clearCanvas();
      toast.success("Canvas cleared.");
    }
  };
  return (
    <div className="flex flex-col h-full p-4 gap-4">
      {/* Logo/Title */}
      <div className="pb-3 border-b border-gray-700">
        <h1 className="text-white font-bold text-lg tracking-wide">
          PipelineAI
        </h1>
        <p className="text-gray-400 text-xs mt-1">Drag nodes to canvas</p>
      </div>

      {/* Node Groups */}
      <div className="flex flex-col gap-4 overflow-y-auto">
        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
            Given Nodes
          </p>
          <div className="flex flex-col gap-2">
            <DraggableNode type="customInput" label="Input" />
            <DraggableNode type="customOutput" label="Output" />
            <DraggableNode type="text" label="Text" />
            <DraggableNode type="llm" label="LLM" />
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-2">
            New Nodes
          </p>
          <div className="flex flex-col gap-2">
            <DraggableNode type="apiCall" label="API Call" />
            <DraggableNode type="condition" label="Condition" />
            <DraggableNode type="dataTransform" label="Transform" />
            <DraggableNode type="fileUpload" label="File Upload" />
            <DraggableNode type="note" label="Note" />
          </div>
        </div>
      </div>
      {/* Clear Canvas Button — sits at the bottom of sidebar */}
      <div className="pt-3 border-t border-gray-700">
        <button
          onClick={handleClear}
          className="w-full flex items-center justify-center gap-2
                     bg-red-500/10 hover:bg-red-500/20
                     border border-red-500/30 hover:border-red-500/50
                     text-red-400 hover:text-red-300
                     text-sm font-medium py-2 rounded-lg
                     transition-all duration-150 cursor-pointer"
        >
          🗑 Clear Canvas
        </button>
      </div>
    </div>
  );
};
