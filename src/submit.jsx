// submit.js
import { useState } from "react";
import { useAppStore } from "./store";
import { shallow } from "zustand/shallow";
import toast from "react-hot-toast";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useAppStore(selector, shallow);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      toast.error("Add at least one node to the canvas first.");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Analyzing pipeline...");

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nodes: nodes.map((n) => ({ id: n.id })),
          edges: edges.map((e) => ({ source: e.source, target: e.target })),
        }),
      });

      const data = await response.json();
      setResult(data);

      // open the modal the correct DaisyUI way
      document.getElementById("pipeline_result_modal").showModal();

      toast.success("Pipeline analyzed!", { id: loadingToast });
    } catch (err) {
      toast.error("Could not connect to backend. Is it running?", {
        id: loadingToast,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Submit Button ── */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="
          flex items-center gap-2
          bg-gradient-to-r from-indigo-500 to-purple-600
          hover:from-indigo-600 hover:to-purple-700
          disabled:opacity-50 disabled:cursor-not-allowed
          text-white text-sm font-semibold
          px-6 py-2 rounded-lg shadow-md hover:shadow-lg
          transition-all duration-200 cursor-pointer
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
        {loading ? "Running..." : "Run Pipeline"}
      </button>

      {/* modal */}
      <dialog id="pipeline_result_modal" className="modal modal-middle">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-0 overflow-hidden w-full max-w-md">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-4">
            <h3 className="font-bold text-lg text-white tracking-wide">
              Pipeline Analysis
            </h3>
            <p className="text-indigo-200 text-xs mt-0.5">
              Results from your pipeline graph
            </p>
          </div>

          {/* Stats */}
          <div className="p-6 flex flex-col gap-3">
            {/* Nodes */}
            <div
              className="flex items-center justify-between
                            bg-gray-800 rounded-xl px-5 py-4
                            border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg bg-indigo-500/20
                                flex items-center justify-center"
                >
                  <span className="text-indigo-400 text-sm">⬡</span>
                </div>
                <span className="text-gray-400 text-sm font-medium">
                  Total Nodes
                </span>
              </div>
              <span className="text-white font-bold text-2xl">
                {result?.num_nodes}
              </span>
            </div>

            {/* Edges */}
            <div
              className="flex items-center justify-between
                            bg-gray-800 rounded-xl px-5 py-4
                            border border-gray-700"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-lg bg-purple-500/20
                                flex items-center justify-center"
                >
                  <span className="text-purple-400 text-sm">⇢</span>
                </div>
                <span className="text-gray-400 text-sm font-medium">
                  Total Edges
                </span>
              </div>
              <span className="text-white font-bold text-2xl">
                {result?.num_edges}
              </span>
            </div>

            {/* DAG Status */}
            <div
              className={`flex items-center justify-between
                            rounded-xl px-5 py-4 border
                            ${
                              result?.is_dag
                                ? "bg-green-500/10 border-green-500/30"
                                : "bg-red-500/10 border-red-500/30"
                            }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center
                                ${
                                  result?.is_dag
                                    ? "bg-green-500/20"
                                    : "bg-red-500/20"
                                }`}
                >
                  <span
                    className={
                      result?.is_dag
                        ? "text-green-400 text-sm"
                        : "text-red-400 text-sm"
                    }
                  >
                    {result?.is_dag ? "✓" : "✗"}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm font-medium">
                    Is a DAG?
                  </span>
                  <span
                    className={`text-xs ${
                      result?.is_dag ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {result?.is_dag
                      ? "No cycles detected. Safe to run."
                      : "Cycle detected. Infinite loop found."}
                  </span>
                </div>
              </div>
              <span
                className={`font-bold text-xl
                               ${
                                 result?.is_dag
                                   ? "text-green-400"
                                   : "text-red-400"
                               }`}
              >
                {result?.is_dag ? "Yes" : "No"}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <form method="dialog">
              <button
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600
                                 hover:from-indigo-600 hover:to-purple-700
                                 text-white font-semibold py-2.5 rounded-xl
                                 transition-all duration-200 cursor-pointer text-sm"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
