// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData),
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`${type} flex items-center gap-2 px-3 py-2 rounded-lg
                  bg-gray-800 hover:bg-gray-700 border border-gray-600 
                  hover:border-indigo-500 cursor-grab transition-all duration-150
                  text-gray-200 text-sm font-medium`}
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = "grab")}
      draggable
    >
      {/* colored dots */}
      <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
      {label}
    </div>
  );
};
